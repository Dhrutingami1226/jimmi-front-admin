import express from "express";
import { getAllMenus, createMenu, updateMenu, deleteMenu } from "../Controller/menu.mjs";

const router = express.Router();

router.get("/", getAllMenus);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router;
