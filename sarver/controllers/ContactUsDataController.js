const pool = require("../models/DB");

const putContactData = async (req, res) => {
    try {
        const { our_phone, our_email, our_location } = req.body;
        await pool.query("UPDATE contact_data SET our_phone = $1, our_email = $2, our_location = $3",
        [our_phone, our_email, our_location]);
        res.send("Updated Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getContactData= async (req, res) => {
    try {
        const getContactData = await pool.query("SELECT * FROM contact_data");
        res.json(getContactData.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    putContactData,
    getContactData
};