import express from "express";
import {
  postConversation,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, postConversation);
// router.get("/single/:id", verifyToken, getSingleConversation);
// router.put("/:id", verifyToken, updateConversation);

export default router;
