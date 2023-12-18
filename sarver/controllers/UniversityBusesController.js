const pool = require("../models/DB");

const unisData = async (req, res) => {
    try {
        const unisData = await pool.query("SELECT university_id, university_name, university_image, university_email, university_phone FROM university_data ORDER BY university_id ASC");
        res.json(unisData.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const uniData = async (req, res) => {
    try {
        const { university_id } = req.params;
        const uniData = await pool.query("SELECT * FROM university_data WHERE university_id = $1", [university_id]);
        res.json(uniData.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updataUniData = async (req, res) => {
    try {
        const { university_id } = req.params;
        const { university_name, university_description, university_email, university_location, number_of_majors, university_phone, university_image, university_image1 } = req.body;
        await pool.query("UPDATE university_data SET university_name = $1, university_description = $2, university_email = $3, university_location = $4, number_of_majors = $5, university_phone = $6, university_image = $7, university_image1 = $8 WHERE university_id = $9",
            [university_name, university_description, university_email, university_location, number_of_majors, university_phone, university_image, university_image1, university_id]);
        res.send("Updated Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const uniStreetData = async (req, res) => {
    try {
        const { university_id } = req.params;
        const uniData = await pool.query("SELECT * FROM street_data WHERE university_id = $1 ORDER BY street_id ASC", [university_id]);
        res.json(uniData.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addStreetData = async (req, res) => {
    try {
        const { university_id, starting_place, departure_time } = req.body;
        await pool.query("INSERT INTO street_data (university_id, starting_place, departure_time ) VALUES ($1, $2, $3) RETURNING *",
        [university_id, starting_place, departure_time]);
        res.send("Added Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addUniData = async (req, res) => {
    try {
        const { university_name, university_description, university_email, university_location, number_of_majors, university_phone, university_image, university_image1 } = req.body;
        await pool.query("INSERT INTO university_data ( university_name, university_description, university_email, university_location, number_of_majors, university_phone, university_image, university_image1 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [university_name, university_description, university_email, university_location, number_of_majors, university_phone, university_image, university_image1]);
        res.send("Added Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const editStreetData = async (req, res) => {
    try {
        const { street_id } = req.params;
        const { university_id, starting_place, departure_time } = req.body;
        await pool.query("UPDATE street_data Set starting_place = $1, departure_time = $2 WHERE street_id = $3 AND university_id = $4",
        [starting_place, departure_time, street_id, university_id]);
        res.send("Added Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    unisData,
    uniData,
    updataUniData,
    uniStreetData,
    addStreetData,
    addUniData,
    editStreetData
};