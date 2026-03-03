import mongoose from "mongoose";

const ConnectedDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/balajimart`);
    console.log("Database Connected ");
  } catch (error) {
    console.log("DB Error:", error.message);
  }
};

export default ConnectedDB;
