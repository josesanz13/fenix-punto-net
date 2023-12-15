import jwt from "jsonwebtoken";
import config from "../config";
import { connection } from "../db.js";

export const verifyToken = async (req, res, next) => {

    const token = req.headers["x-access-token"]

    if (!token) {
        return res.status(401).json({ msg: "No existe token / No autorizado" })
    }

    try {
        const decode = jwt.verify(token, config.SECRET);
        req.userID = decode.id;

        const [rows] = await connection.query("SELECT id FROM users WHERE id = ? ", [req.userID]);

        if (rows.length == 0) {
            return res.status(404).json({ msg: "JWT / Usuario no existe" })
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error, Comuniquese con el administrador"
        });
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const [rows] = await connection.query("SELECT role FROM users WHERE id = ? ", [req.userID]);
        const data = rows[0];
        if (data.role != 'ADM') {
            return res.status(403).json({
                msg: "Usuario sin permisos para realizar la acción"
            })
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error, Comuniquese con el administrador"
        });
    }
}