import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import UUID

// Definisikan schema untuk Post
const postSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  id: { type: String, default: uuidv4 }, // Menggunakan UUID sebagai default
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Membuat model Post dari schema yang telah didefinisikan
const Posts = mongoose.model("Posts", postSchema);

export default Posts;
