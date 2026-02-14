import express from "express";
import {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  searchStoreByName
} from "../Controller/storelocator.mjs";

const router = express.Router();

router.get("/search", searchStoreByName);
router.get("/", getAllStores);
router.get("/:id", getStoreById);
router.post("/", createStore);
router.put("/:id", updateStore);
router.delete("/:id", deleteStore);

export default router;
