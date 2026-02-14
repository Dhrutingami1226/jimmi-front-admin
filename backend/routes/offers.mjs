import express from "express";
import { getAllOffers, createOffer, updateOffer, deleteOffer } from "../Controller/offers.mjs";

const router = express.Router();

router.get("/", getAllOffers);
router.post("/", createOffer);
router.put("/:id", updateOffer);
router.delete("/:id", deleteOffer);

export default router;
