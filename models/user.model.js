import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    skills : {
      type: Array,
      required: true,
    },
    payoneer: {
      type: String,
      required: true,
    },
    wise: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    idCardFront: {
      type: String,
      required: false,
    },
    idCardBack: {
      type: String,
      required: false,
    },
    bankImg: {
      type: String,
      required: false,
      
    },
    liveSelfie:{
      type: String,
      required: false,

    },
    bankImg: {
      type: String,
      required: false,
    },
    bankIban: {
      type: String,
      default: "",
    },
    easypaisaAccount: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
