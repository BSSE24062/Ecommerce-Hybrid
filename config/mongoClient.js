const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err);
    }
};

module.exports = connectMongo;