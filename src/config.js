import 'dotenv/config'

export default {
    SECRET: process.env.SECRET,
    HOST: process.env.HOST,
    USER: process.env.USER_DB,
    PASSWORD: process.env.PASSWORD_DB,
    DATABASE: process.env.DATABASE
}