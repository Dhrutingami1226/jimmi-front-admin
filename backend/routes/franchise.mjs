import express from "express";
import {franchise, getAllFranchises, getFranchiseById, updateFranchise, deleteFranchise} from "../Controller/franchise.mjs"

const router = express.Router();

// POST - Create franchise
router.post("/", franchise);

// GET - Retrieve all franchises
router.get("/", getAllFranchises);

// GET - Retrieve single franchise by ID
router.get("/:id", getFranchiseById);

// PUT - Update franchise
router.put("/:id", updateFranchise);

// DELETE - Delete franchise
router.delete("/:id", deleteFranchise);

export default router;
