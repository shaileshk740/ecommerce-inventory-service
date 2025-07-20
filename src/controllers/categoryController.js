/**
 * Category Controller
 * Handles all category-related operations (FR-001 to FR-005)
 */

const db = require('../database/inMemoryDB');

// FR-001: Create new product categories
const createCategory = (req, res) => {
  try {
    const { name } = req.body;
    const category = db.createCategory(name);
    
    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// FR-002: View category details
const getCategoryById = (req, res) => {
  try {
    const { id } = req.params;
    const category = db.getCategoryById(id);
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// FR-003: Update existing categories
const updateCategory = (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = db.updateCategory(id, name);
    
    res.status(200).json({
      success: true,
      data: category,
      message: 'Category updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// FR-004: Delete categories
const deleteCategory = (req, res) => {
  try {
    const { id } = req.params;
    const result = db.deleteCategory(id);
    
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

// FR-005: List all categories
const getAllCategories = (req, res) => {
  try {
    const categories = db.getAllCategories();
    
    res.status(200).json({
      success: true,
      data: categories,
      count: categories.length
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories
}; 