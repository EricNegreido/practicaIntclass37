import dotenv from 'dotenv';

dotenv.config();

export default {
    mongoUrl : process.env.MONGO_URL,
    sessionSecrete : process.env.SESSIONS_SECRETE,
    gitSecrete : process.env.GIT_SECRETE,
    userAdmin : process.env.USER_ADMIN,
    passwordAdmin : process.env.PASSW_ADMIN,
    persistence: process.env.PERSISTENCE

}