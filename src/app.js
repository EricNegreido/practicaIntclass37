import express from 'express'
import __dirname, { addLogger } from './utils.js';
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import ticketRouter from './routes/ticket.router.js';
import mailerRouter from './routes/mailer.router.js';
import mockRouter from './routes/mock.router.js';
import logtestRouter from './routes/logtest.router.js';
import intializePassport from './config/passport.config.js';
import passport from 'passport';
import errorHanlder from './middleware/errors/index.js';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import { fatalLogger } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser())

intializePassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');



app.use(addLogger);
app.use(errorHanlder);

app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/mail', mailerRouter);
app.use('/api/ticket', ticketRouter);
app.use('/api/mockingproducts', mockRouter);
app.use('/api/loggerTest', logtestRouter);

app.use(fatalLogger);

const httpServer  = app.listen(8080, () => console.log('server running'));

const io = new Server(httpServer);


//MOVER APP CHAT
let messages = [];
io.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    socket.on('authenticate', () =>{

        socket.emit("messageLogs", messages);
    })
    
    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages);
    });

    socket.broadcast.emit('userConnected', {user: 'Nuevo usuario conectado'});

});



