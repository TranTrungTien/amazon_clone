import mongoose from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileImg: string;
  role: string;
  intro: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    profileImg: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
    intro: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
