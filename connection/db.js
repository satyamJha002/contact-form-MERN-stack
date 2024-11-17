const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await mongoose.connection.db.admin().command({ ping: true });

    console.log(`Mongodb is connected ${result.ok}`);
  } catch (error) {
    console.log("Mongodb Connection error", error);
  }
};

module.exports = connectDb;
