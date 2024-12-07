import express from "express";
import { assignedTask, deleteTask, getTask, getTasks , postTask, updateTask} from "../controllers/task.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.post("/", postTask);
router.get("/:id", getTask);
router.get("/assigned/:id", assignedTask);
router.get("/", getTasks);

export default router;