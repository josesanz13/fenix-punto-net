import email_validator from "email-validator";
import { encryptPassword } from "../libs";
import { connection } from "../db.js";


export const get_users = async (req, res, next) => {
    const userID = req.userID;
    try {
        const [rows] = await connection.query("SELECT id,email,name,last_name,role,mobile,phone,date_birth,genre,created_at,updated_at FROM users WHERE id NOT IN(?) ORDER BY id desc", [userID]);

        res.status(200).json(rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error. Comuniquese con el administrador"
        });
        next();
    }
}

export const get_user_by_id = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const [rows] = await connection.query("SELECT id,email,name,last_name,role,mobile,phone,date_birth,genre FROM users where id = ?", [userId]);

        if (rows.length == 0) {
            return res.status(400).json({
                msg: "El usuario no existe."
            })
        }

        res.status(200).json(rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error. Comuniquese con el administrador"
        });
        next();
    }
}

export const store_user = async (req, res, next) => {
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

        // Response
        res.status(201).json({
            id: rows.insertId,
            email: email,
            name: name,
            last_name: last_name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error, el usuario no ha sido creado correctamente. Comuniquese con el administrador"
        });
        next();
    }
}

export const update_user = async (req, res, next) => {
    const { password, name, last_name, role, mobile, phone, date_birth, genre } = req.body;
    const { userId } = req.params;

    try {
        // User found validation
        const user_found = await connection.query("SELECT id,password FROM users WHERE id = ? ", [userId]);
        if (user_found[0].length == 0) {
            return res.status(400).json(["El usuario no existe"])
        }
        const data_user = user_found[0][0];

        // Encrypt password
        let password_user = data_user.password;
        if (typeof password !== "undefined" && password.trim() != "") {
            console.log("pasando");
            password_user = await encryptPassword(password);
        }

        // // Update user
        const [rows] = await connection.query("UPDATE users SET password = ?, name = ?, last_name = ?, role = ?, mobile = ?, phone = ?, date_birth = ?, genre = ? WHERE id = ?", [password_user, name, last_name, role, mobile, phone, date_birth, genre, userId]);
        if (rows.length == 0) {
            return res.status(500).json(["Error, el usuario no ha sido actualizado correctamente. Comuniquese con el administrador"])
        }

        // Get update user
        const user_update = await connection.query("SELECT id,name,last_name,mobile FROM users WHERE id = ? ", [userId]);

        // Response
        res.status(201).json({
            msg: "Usuario actualizado exitosamente",
            data: user_update[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(["Error, el usuario no ha sido actualizado correctamente. Comuniquese con el administrador"]);
        next();
    }
}

export const delete_user = async (req, res, next) => {
    const { userId } = req.params;

    try {
        // User found validation
        const user_found = await connection.query("SELECT id,password FROM users WHERE id = ? ", [userId]);
        if (user_found[0].length == 0) {
            return res.status(400).json({
                msg: "El usuario no existe"
            })
        }

        // Delete user
        const [rows] = await connection.query("DELETE FROM users WHERE id = ?", [userId]);
        if (rows.length == 0) {
            return res.status(500).json({
                msg: "Error, el usuario no ha sido eliminado correctamente. Comuniquese con el administrador."
            })
        }

        // Response
        res.status(200).json({
            msg: "Usuario eliminado exitosamente"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error, el usuario no ha sido eliminado correctamente. Comuniquese con el administrador"
        });
        next();
    }
}