import mongoose from "mongoose";
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    deadline: {
        type: Date,
        required: true,
    },
    status:{
        type: String,
      default: "To Do",
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

export default mongoose.model("Task", TaskSchema);
