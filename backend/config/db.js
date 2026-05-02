import mongoose from "mongoose";

const connectDB = async () => {

  try {

    mongoose.set(
      "strictQuery",
      false
    );

    const conn =
      await mongoose.connect(
        process.env.MONGO_URI,
        {
          serverSelectionTimeoutMS: 10000,
        }
      );

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

  } catch (error) {

    console.log(
      "MongoDB Connection Error:"
    );

    console.log(error);

    process.exit(1);

  }

};

export default connectDB;