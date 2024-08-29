import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  fullName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  createdOn: { type: Date, default: new Date().getTime() }
});

const User = mongoose.model("User", UserSchema);

export default User;
