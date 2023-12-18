const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const AboutUs = require("./routes/AboutUs");
const ContactUsData = require("./routes/ContactUsData");
const ContactUsMessage = require("./routes/ContactUsMessage");
const UsersAdmins = require("./routes/UsersAdmins");
const UniversityBuses = require("./routes/UniversityBuses");

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(AboutUs);
app.use(ContactUsData);
app.use(ContactUsMessage);
app.use(UsersAdmins);
app.use(UniversityBuses);

app.get("/", (req, res) => {
    res.send({ message: "Welcome to my API" });
});

app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
});