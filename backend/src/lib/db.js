import mongose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongose.connect(process.env.MONGO_URI);
    console.log(`Database connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error Connecting to Database `, error);
    process.exit(1);//exit with faliure
  }
};
