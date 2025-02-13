import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// conncent to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Monggose connectd");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
