import express from "express";
import { register, getAllAdmins, deleteAdmin, updateAdmin } from "../Controller/register.mjs";

const router = express.Router();

router.get("/all", getAllAdmins);
router.post("/", register);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;