const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const contactRoute = require("./route/contactRoute");
const connectDb = require("./connection/db");

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

connectDb();

app.use(
  cors({
    origin: "https://contact-form-mern-stack-6uov.vercel.app/",
  })
);
app.use(bodyParser.json());

app.use("/api", contactRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port number at ${PORT}`);
});
