const pool = require("../models/DB");

const postContactMessages = async (req, res) => {
    try {
        const { user_name, user_phone, user_email, user_message } = req.body;
        const values = [user_name, user_phone, user_email, user_message];
        const all_records = await pool.query("INSERT INTO contact_us_message ( user_name, user_phone, user_email, user_message ) VALUES( $1, $2, $3 , $4 ) RETURNING *", values);
        res.json(all_records.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getContactMessages = async (req, res) => {
    try {
        const contact_us_message = await pool.query("SELECT * FROM contact_us_message");
        res.json(contact_us_message.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getContactMessagesById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact_us_message = await pool.query("SELECT * FROM contact_us_message WHERE contact_id = $1", [id]);
        res.json(contact_us_message.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    postContactMessages,
    getContactMessages,
    getContactMessagesById
};