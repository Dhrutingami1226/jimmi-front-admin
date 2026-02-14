import express from "express";
import { getAllCarousel, createCarousel, updateCarousel, deleteCarousel } from "../Controller/carousel.mjs";

const router = express.Router();

router.get("/", getAllCarousel);
router.post("/", createCarousel);
router.put("/:id", updateCarousel);
router.delete("/:id", deleteCarousel);

export default router;
