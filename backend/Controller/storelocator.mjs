import StoreLocator from "../models/storelocatormodel.js";

// Get all stores
export const getAllStores = async (req, res) => {
  try {
    const stores = await StoreLocator.find().sort({ id: 1 });
    res.status(200).json({
      success: true,
      message: "Stores fetched successfully",
      data: stores
    });
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Get single store
export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await StoreLocator.findOne({ id: parseInt(id) });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Store fetched successfully",
      data: store
    });
  } catch (error) {
    console.error("Error fetching store:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Create new store
export const createStore = async (req, res) => {
  try {
    const { name, address, phone, mapLink, image } = req.body;

    // Validate required fields
    if (!name || !address || !phone || !mapLink || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Get last store ID
    const lastStore = await StoreLocator.findOne().sort({ id: -1 });
    const newId = lastStore ? lastStore.id + 1 : 1;

    // Create new store
    const newStore = await StoreLocator.create({
      id: newId,
      name,
      address,
      phone,
      mapLink,
      image
    });

    res.status(201).json({
      success: true,
      message: "Store created successfully",
      data: newStore
    });
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Update store
export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone, mapLink, image } = req.body;

    const store = await StoreLocator.findOneAndUpdate(
      { id: parseInt(id) },
      { name, address, phone, mapLink, image },
      { new: true, runValidators: true }
    );

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Store updated successfully",
      data: store
    });
  } catch (error) {
    console.error("Error updating store:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Delete store
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await StoreLocator.findOneAndDelete({ id: parseInt(id) });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Store deleted successfully",
      data: store
    });
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Search stores by name
export const searchStoreByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    const stores = await StoreLocator.find({
      name: { $regex: name, $options: "i" }
    }).sort({ id: 1 });

    res.status(200).json({
      success: true,
      message: "Stores found successfully",
      data: stores
    });
  } catch (error) {
    console.error("Error searching stores:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
