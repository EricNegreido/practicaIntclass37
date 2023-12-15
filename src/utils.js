import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from "jsonwebtoken";

import {fakerES as faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateProduct = () =>{
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int({min: 0, max: 20})
    }
}

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (password, userPassword) => bcrypt.compareSync(password, userPassword);
export default __dirname;
export { generateProduct};

import winston from "winston";
import * as dotenv from 'dotenv'
import passport from "passport";

dotenv.config();

const ENVIRONMENT = process.env.ENVIRONMENT;

let logger;

const customLevelOptions={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    },
    colors: {
        fatal: 'magenta',
        error: 'red',
        warning:'yellow',
        info: 'green',
        http: 'cyan',
        debug: 'blue'
    }
}

if(ENVIRONMENT === 'PRODUCTION'){
    console.log("MODO: PRODUCTION")

    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports:[
            new winston.transports.Console({
                level:'info',
                format:winston.format.combine(
                    winston.format.colorize({
                        all:true,
                        colors: customLevelOptions.colors
                    }),
                    winston.format.simple()
                )
            }),
    
            new winston.transports.File({
                filename:'./src/logs/errors.log',
                level: 'error'
            })
        ]
    });
}else if (ENVIRONMENT === 'DEVELOPMENT'){
    console.log("MODO: DEVELOPMENT")
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports:[
            new winston.transports.Console({
                level:'debug',
                format:winston.format.combine(
                    winston.format.colorize({
                        all:true,
                        colors: customLevelOptions.colors
                    }),
                    winston.format.simple()
                )
            }),
    
           
        ]
    });
}else{
    console.log("ENVIRONMENT:", ENVIRONMENT);
}

export const addLogger =(req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next()
}

export const fatalLogger =  (req, res, next) =>{

    req.logger.fatal(`Route not found: ${req.method} ${req.url}`);

    res.status(404).json({
        status: 'Fatal',
        message: 'Route not found'
    });
}

// JWT
const PRIVATE_KEY = "CoderKey";

const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'});
    return token;
}
const passportCall = (strategy) =>{
    return async(req, res, next) => {
        passport.authenticate(strategy, function(err, user, info){
        console.log('userUtils: ', user)

            if(err) return next(err);
            if(!user) {
                return res.status(401).send({status: 'error', error: info.messages ? info.messages : info.toString()})
            }
            req.user = user;
            next();

        })(req, res, next)
    }
}

export{ generateToken, PRIVATE_KEY, passportCall}