import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI!, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    })
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => console.log(err.message));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db...");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });
};

export default connectDB;
