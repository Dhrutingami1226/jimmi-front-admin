import Carousel from "../models/carouselmodel.js";

export const getAllCarousel = async (req, res) => {
  try {
    const carousels = await Carousel.find().sort({ id: 1 });
    res.status(200).json({
      success: true,
      message: "Carousels fetched successfully",
      data: carousels
    });
  } catch (error) {
    console.error("Error fetching carousels:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const createCarousel = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }

    const lastCarousel = await Carousel.findOne().sort({ id: -1 });
    const newId = lastCarousel ? lastCarousel.id + 1 : 1;

    const newCarousel = await Carousel.create({
      id: newId,
      image,
      title: "",
      description: ""
    });

    res.status(201).json({
      success: true,
      message: "Carousel created successfully",
      data: newCarousel
    });
  } catch (error) {
    console.error("Error creating carousel:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const updateCarousel = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    const updateData = {};
    if (image) updateData.image = image;

    const carousel = await Carousel.findOneAndUpdate(
      { id: parseInt(id) },
      updateData,
      { new: true, runValidators: true }
    );

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: "Carousel not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Carousel updated successfully",
      data: carousel
    });
  } catch (error) {
    console.error("Error updating carousel:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const deleteCarousel = async (req, res) => {
  try {
    const { id } = req.params;

    const carousel = await Carousel.findOneAndDelete({ id: parseInt(id) });

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: "Carousel not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Carousel deleted successfully",
      data: carousel
    });
  } catch (error) {
    console.error("Error deleting carousel:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
