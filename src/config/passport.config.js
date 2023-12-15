import passport from "passport";
import jwt from 'passport-jwt';
import { PRIVATE_KEY } from "../utils.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const intializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async(jwt_payload, done) =>{
    try {
        console.log('Decoded JWT Payload:', jwt_payload);

        return done(null, jwt_payload.user, null); // req.user
    } catch (error) {
        return done(error)
    }
    }))};
    
    const cookieExtractor = req => {
        let token = null;
        if(req && req.cookies) {
            token = req.cookies['CookieToken'];
            console.log('req.cookies:', req.cookies);
        }
        console.log('token:', token);
        console.log('headers:', req.headers);
        return token;
    }


export default intializePassport;


