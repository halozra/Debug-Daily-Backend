import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import UUID

// Definisikan schema untuk User
const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Membuat model User dari schema yang telah didefinisikan
const Users = mongoose.model("Users", userSchema);

export default Users;
