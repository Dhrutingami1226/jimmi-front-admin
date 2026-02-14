import express from "express";
import { logoutUser } from "../Controller/logout.mjs";

const router = express.Router();

// POST /api/logout
router.post("/", logoutUser);

export default router;
