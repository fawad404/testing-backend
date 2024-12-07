import mongoose from "mongoose";
const { Schema } = mongoose;

const SubmitedTaskSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    desc: {
        type: String,
        required: true,
      },
    files: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SubmitedTask", SubmitedTaskSchema);
