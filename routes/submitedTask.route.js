import express from "express";
import { getUpdatedTask, postUpdatedTask, putUpdatedTask } from "../controllers/submitedTask.controller.js";

const router = express.Router();

router.post("/", postUpdatedTask);
router.get("/:id", getUpdatedTask);
router.put('/:id', putUpdatedTask);

export default router;
