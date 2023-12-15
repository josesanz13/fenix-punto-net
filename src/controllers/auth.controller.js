import jwt from "jsonwebtoken";
import config from "../config";
import email_validator from "email-validator";
import { connection } from "../db.js";
import { encryptPassword, comparePassword } from "../libs";

export const register = async (req, res, next) => {
    const { email, password, name, last_name, role, mobile, phone, date_birth, genre } = req.body;

    try {
        // Email validation
        const is_valid_email = email_validator.validate(email);
        if (!is_valid_email) {
            return res.status(400).json(["El email ingresado no es valido"])
        }

        // User found validation
        const user_found = await connection.query("SELECT id FROM users WHERE email = ? ", [email]);
        if (user_found[0].length > 0) {
            return res.status(400).json(["El email ingresado ya existe"])
        }

        // Encrypt password
        const encrypt_password = await encryptPassword(password);

        // Insert record
        const [rows] = await connection.query("INSERT INTO users (email, password, name, last_name, role, mobile, phone, date_birth, genre) VALUES(?,?,?,?,?,?,?,?,?)", [email, encrypt_password, name, last_name, role, mobile, phone, date_birth, genre]);
        if (rows.length == 0) {
            return res.status(500).json(["Error, el usuario no ha sido creado correctamente. Comuniquese con el administrador"])
        }

        // Get user
        const user = await connection.query("SELECT id,email,name,last_name,role FROM users WHERE id = ?", [rows.insertId]);

        // Create token
        const token = jwt.sign({ id: rows.insertId }, config.SECRET, {
            expiresIn: 86400 // 24 hours
        })

        // Response
        res.cookie("token", token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({
            user: user[0][0],
            msg: "Usuario creado exitosamente."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(["Error, el usuario no ha sido creado correctamente. Comuniquese con el administrador"]);
        next();
    }

}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Get user
        const [rows] = await connection.query("SELECT id,password,email,name,last_name,role,mobile,phone,CAST(date_birth as date) as date_birth,genre,created_at,updated_at FROM users WHERE email = ? ", [email]);
        if (rows.length == 0) {
            return res.status(400).json(["El usuario ingresado no existe"])
        }

        // // Match passwords
        const data = rows[0];
        const match_password = await comparePassword(password, data.password);

        if (!match_password) {
            return res.status(401).json(["Usuario y/o Contraseña incorrectos."])
        }

        // // Create token
        const token = jwt.sign({ id: data.id }, config.SECRET, {
            expiresIn: 86400 // 24 hours
        })

        // Response
        // res.cookie("token", token, { sameSite: 'none', secure: true, httpOnly: false })

        res.status(200).json({
            user: {
                id: data.id,
                email: data.email,
                name: data.name,
                last_name: data.last_name,
                role: data.role,
                mobile: data.mobile,
                phone: data.phone,
                date_birth: data.date_birth,
                genre: data.genre,
                created_at: data.created_at,
                updated_at: data.updated_at
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(["Error, el usuario no ha sido creado correctamente. Comuniquese con el administrador"]);
        next();
    }
}

export const verifyToken = async (req, res, next) => {
    const userId = req.userID;
    try {
        const [rows] = await connection.query("SELECT id,email,name,last_name,role,mobile,phone,CAST(date_birth as date) as date_birth,genre,created_at,updated_at FROM users where id = ?", [userId]);
        res.status(200).json(rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error. Comuniquese con el administrador"
        });
        next();
    }
}

export const loguot = (req, res, next) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })

    return res.status(200);
}