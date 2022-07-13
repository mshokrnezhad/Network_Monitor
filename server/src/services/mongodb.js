const mongoose = require("mongoose");
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
    console.log("MongoDB connection is ready!");
});
mongoose.connection.on("error", (error) => {
    console.log(`MongoDB connection is failed: ${error}`);
});

async function connectToMongodb() {
    await mongoose.connect(MONGO_URL);
};

async function disconnectFromMongodb() {
    await mongoose.disconnect();
};

module.exports = { connectToMongodb, disconnectFromMongodb };