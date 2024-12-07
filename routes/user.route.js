import express from "express";
import { deleteUser, getUser, getUsers,updateUser , postUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.post("/", postUser);

export default router;
