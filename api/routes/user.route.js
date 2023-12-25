import express from "express";
import { name, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", name);
router.post("/update/:id", verifyToken, updateUser);

export default router;
