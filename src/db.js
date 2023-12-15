import {createPool} from "mysql2/promise";
import config from "./config";

export const connection = createPool({
    host: `${config.HOST}`,
    user: `${config.USER}`,
    password: `${config.PASSWORD}`,
    database: `${config.DATABASE}`
})

