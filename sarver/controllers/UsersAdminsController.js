require("dotenv").config();
const pool = require("../models/DB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const secretKey = process.env.SECRET;
const SENDING_EMAIL = process.env.SENDING_EMAIL;
const SENDING_EMAIL_PASS = process.env.SENDING_EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SENDING_EMAIL,
        pass: SENDING_EMAIL_PASS
    }
});

function tokenGenerator({ user_id, user_type, user_name, user_phone, user_email, user_password, user_image }) {
    const payload = { user_id, user_type, user_name, user_phone, user_email, user_password, user_image };
    const accessToken = jwt.sign(payload, secretKey, { expiresIn: "4w" });
    return accessToken;
}

const AddNewUSer = async (req, res) => {
    try {
        const { user_name, user_phone, user_email, user_password } = req.body;
        const IsEmailAlreadyExists = await pool.query("SELECT * FROM users_and_admins where user_email = $1 AND user_flags = $2 AND user_type = $3",
            [user_email, 0, 'user']);
        if (IsEmailAlreadyExists?.rows?.length !== 0) {
            return res.json("Email is already exist");
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(user_password, salt);
        pool.query("INSERT INTO users_and_admins (user_type, user_name, user_phone, user_email, user_password, user_image, user_flags) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            ["user", user_name, user_phone, user_email, hashedPassword, "Anything", 0],
            (error, results) => {
                if (error) {
                    return res.json(error);
                }
                const { user_id, user_type, user_name, user_phone, user_email, user_password, user_image } = results.rows[0];
                const token = tokenGenerator({
                    user_id,
                    user_type,
                    user_name,
                    user_phone,
                    user_email,
                    user_password,
                    user_image,
                });
                res.json({ Token: token });
            }
        );
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
};

const AddNewUSerWithgoogle = async (req, res) => {
    try {
        const user_name = req.body.name, user_email = req.body.email;
        const IsEmailAlreadyExists = await pool.query("SELECT * FROM users_and_admins where user_email = $1 AND user_flags = $2",
            [user_email, 0]);
        if (IsEmailAlreadyExists.rows.length !== 0) {
            const { user_id, user_type, user_name, user_phone, user_email, user_password, user_image } = IsEmailAlreadyExists.rows[0];
            const token = tokenGenerator({
                user_id,
                user_type,
                user_name,
                user_phone,
                user_email,
                user_password,
                user_image,
            });
            res.json({ Token: token });
        } else {
            pool.query("INSERT INTO users_and_admins (user_type, user_name, user_phone, user_email, user_password, user_image, user_flags) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                ["user", user_name, "No phone! log in with Google", user_email, "No bassword! log in with Google", 'anything', 0],
                (error, results) => {
                    if (error) {
                        return res.status(400).json(error);
                    }
                    const { user_id, user_type, user_name, user_phone, user_email, user_password, user_image } = results.rows[0];
                    const token = tokenGenerator({
                        user_id,
                        user_type,
                        user_name,
                        user_phone,
                        user_email,
                        user_password,
                        user_image,
                    });
                    res.json({ Token: token });
                }
            );
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const checkUser = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const all_user = await pool.query('SELECT * FROM users_and_admins WHERE user_flags = 0 AND user_type = $1', ['user']);
        let userFound = false;
        for (const user of all_user.rows) {
            const match_user_password = await bcrypt.compare(user_password, user.user_password);
            if (user.user_email === user_email && match_user_password) {
                const {
                    user_id,
                    user_type,
                    user_name,
                    user_phone,
                    user_email,
                    user_image,
                } = user;
                const token = tokenGenerator({
                    user_id,
                    user_type,
                    user_name,
                    user_phone,
                    user_email,
                    user_image,
                });
                res.json({ Token: token });
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            res.json('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const checkAdmin = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const all_user = await pool.query('SELECT * FROM users_and_admins WHERE user_flags = 0 AND user_type = $1', ['admin']);
        let userFound = false;
        for (const user of all_user.rows) {
            const match_user_password = await bcrypt.compare(user_password, user.user_password);
            if (user.user_email === user_email && match_user_password) {
                const {
                    user_id,
                    user_type,
                    user_name,
                    user_phone,
                    user_email,
                    user_image,
                } = user;
                const token = tokenGenerator({
                    user_id,
                    user_type,
                    user_name,
                    user_phone,
                    user_email,
                    user_image,
                });
                res.json({ Token: token });
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            res.json('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const allUsers = async (req, res) => {
    try {
        const all_user = await pool.query('SELECT * FROM users_and_admins WHERE user_flags = 0  ORDER BY user_id ASC');
        if (all_user.rows.length !== 0) {
            res.json(all_user.rows)
        } else {
            res.status(404).json({ error: 'No user has registered yet' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const userById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM users_and_admins WHERE user_id = $1 AND user_flags = 0', [id]);
        if (user.rows.length !== 0) {
            res.json(user.rows)
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_name, user_phone, user_email, user_password } = req.body;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(user_password, salt);
        const user = await pool.query('SELECT * FROM users_and_admins WHERE user_id = $1 AND user_flags = 0', [id]);
        if (user.rows.length !== 0) {
            const updateUserData = await pool.query("UPDATE users_and_admins SET user_name = $1, user_phone = $2, user_email = $3, user_password = $4 WHERE user_id = $5",
                [user_name, user_phone, user_email, hashedPassword, id]);
            res.send("Updated Successfully");
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM users_and_admins WHERE user_id = $1 AND user_flags = 0', [id]);
        let user_type;
        if (user.rows.length !== 0) {
            user_type = user.rows[0].user_type;
            let newUserRole;
            if (user_type === "user") {
                newUserRole = "admin";
            } else {
                newUserRole = "user";
            }
            const updateUserRole = await pool.query("UPDATE users_and_admins SET user_type = $1 WHERE user_id = $2 RETURNING *",
                [newUserRole, id]);
            res.send("Updated Successfully");
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateUserFlag = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users_and_admins WHERE user_id = $1 AND user_flags = 0", [id]);
        let user_flags;
        if (user.rows.length !== 0) {
            user_flags = user.rows[0].user_flags;
            let newUserFlag;
            if (user_flags === 0) {
                newUserFlag = 1;
            } else {
                newUserFlag = 0;
            }
            const updateUserFlag = await pool.query("UPDATE users_and_admins SET user_flags = $1 WHERE user_id = $2 RETURNING *",
                [newUserFlag, id]);
            res.send("Updated Successfully");
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const sendPINCode = async (req, res) => {
    try {
        const { user_email } = req.body;
        const user = await pool.query('SELECT * FROM users_and_admins WHERE user_email = $1 AND user_flags = 0', [user_email]);
        if (user.rows.length !== 0) {
            const verificationCode = Math.floor(100000 + Math.random() * 900000);
            const updateUserForgotPassword = await pool.query("UPDATE users_and_admins SET user_forgot_password = $1 WHERE user_email = $2 RETURNING *",
                [verificationCode, user_email]);
            const mailOptions = {
                from: SENDING_EMAIL,
                to: user_email,
                subject: 'Email Verification Code',
                text: `Your verification code is: ${verificationCode}`,
            };
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    return res.json("Unable to send verification code");
                } else {
                    return res.status(200).json("The code sent successfully");
                }
            });
        } else {
            res.json( 'User not found' );
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
}

const checkUserPINCodeAndUpdatePassword = async (req, res) => {
    try {
        const { user_email, user_forgot_password } = req.body;
        const checkUserPIN = await pool.query("SELECT * FROM users_and_admins WHERE user_email = $1 AND user_forgot_password = $2",
            [user_email, user_forgot_password]);
        if (checkUserPIN.rows.length !== 0) {
            return res.json("pin code successful")
        } else {
            return res.json("incorrect pin code");
        }
    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
}

const saveNewPassword = async (req, res) => {
    try {
        const { user_password, user_email } = req.body;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(user_password, salt);
        const updatePassword = await pool.query("UPDATE users_and_admins SET user_password = $1 WHERE user_email = $2",
            [hashedPassword, user_email]);
        res.json("Password reset successfully");
    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
}

module.exports = {
    AddNewUSer,
    AddNewUSerWithgoogle,
    checkUser,
    checkAdmin,
    allUsers,
    userById,
    updateUserData,
    updateUserRole,
    updateUserFlag,
    sendPINCode,
    checkUserPINCodeAndUpdatePassword,
    saveNewPassword
}
