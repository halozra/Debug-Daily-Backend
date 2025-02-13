import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:3000', 'http://192.168.225.175:3000',`${process.env.FRONTEND_URL}`];


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Mengizinkan origin yang ada di allowedOrigins
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
);


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

app.get("/", (req, res) => {
  res.send("Backend is running on Vercel!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
