import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/connectDB.js";
import cors from "cors"
import authRouter from "./routes/authroute.js";
import deparmentRouter from "./routes/departmentRoutes.js";

dotenv.config();

const app = express();

//middleware
app.use(
  cors({
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    origin: "http://localhost:5173", // Specify the allowed origin
  })
);
app.use(express.json())

app.get("/", (req, res) => {
  res.send("baby");
});

//routes
app.use("/api/auth",authRouter);
app.use("/api/department",deparmentRouter);
const port = process.env.PORT;
app.listen(port, (req, res) => {
  connectDB();
  console.log(`Listening on ${port}`);
});
