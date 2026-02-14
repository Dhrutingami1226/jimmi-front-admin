import express from "express";
import { Login } from "../Controller/login.mjs";
import { logoutUser } from "../Controller/logout.mjs";

const router = express.Router();

// POST /api/login
router.post("/", Login);

// POST /api/logout
router.post("/logout", logoutUser);

export default router;
