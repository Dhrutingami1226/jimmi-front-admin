import Offer from "../models/offermodel.js";

export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ id: 1 });
    res.status(200).json({
      success: true,
      message: "Offers fetched successfully",
      data: offers
    });
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const createOffer = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    const lastOffer = await Offer.findOne().sort({ id: -1 });
    const newId = lastOffer ? lastOffer.id + 1 : 1;

    const newOffer = await Offer.create({
      id: newId,
      title,
      description: "",
      discount: 0
    });

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      data: newOffer
    });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updateData = {};
    if (title) updateData.title = title;

    const offer = await Offer.findOneAndUpdate(
      { id: parseInt(id) },
      updateData,
      { new: true, runValidators: true }
    );

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      data: offer
    });
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findOneAndDelete({ id: parseInt(id) });

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Offer deleted successfully",
      data: offer
    });
  } catch (error) {
    console.error("Error deleting offer:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
