const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Worker MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
