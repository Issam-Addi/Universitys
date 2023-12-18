const pool = require("../models/DB");

const putAboutUs = async (req, res) => {
    try {
        const { about_description, about_title, about_image_no_one, about_image_no_two, about_image_no_three } = req.body;
        await pool.query("UPDATE about_us SET about_description = $1, about_title = $2, about_image_no_one = $3, about_image_no_two = $4, about_image_no_three = $5",
        [about_description, about_title, about_image_no_one, about_image_no_two, about_image_no_three]);
        res.send("Updated Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAboutUs = async (req, res) => {
    try {
        const getAboutUs = await pool.query("SELECT * FROM about_us");
        res.json(getAboutUs.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    putAboutUs,
    getAboutUs
};