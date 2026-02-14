import Menu from "../models/menumodel.js";

export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ id: 1 });
    res.status(200).json({
      success: true,
      message: "Menus fetched successfully",
      data: menus
    });
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const createMenu = async (req, res) => {
  try {
    const { name, image, category, price, description } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        success: false,
        message: "Name and image are required"
      });
    }

    const lastMenu = await Menu.findOne().sort({ id: -1 });
    const newId = lastMenu ? lastMenu.id + 1 : 1;

    const newMenu = await Menu.create({
      id: newId,
      name,
      image,
      category: category || "",
      price: price || 0,
      description: description || ""
    });

    res.status(201).json({
      success: true,
      message: "Menu created successfully",
      data: newMenu
    });
  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, category, price, description } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (image) updateData.image = image;
    if (category !== undefined) updateData.category = category;
    if (price !== undefined) updateData.price = price;
    if (description !== undefined) updateData.description = description;

    const menu = await Menu.findOneAndUpdate(
      { id: parseInt(id) },
      updateData,
      { new: true, runValidators: true }
    );

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      data: menu
    });
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findOneAndDelete({ id: parseInt(id) });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
      data: menu
    });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
