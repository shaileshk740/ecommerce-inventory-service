/**
 * Product Controller
 * Handles all product-related operations (FR-006 to FR-012)
 */

const db = require('../database/inMemoryDB');

// FR-006: Create new products
const createProduct = (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const product = db.createProduct(name, categoryId);
    
    // Get category details for response
    const category = db.getCategoryById(categoryId);
    const productWithCategory = { ...product, category };
    
    res.status(201).json({
      success: true,
      data: productWithCategory,
      message: 'Product created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// FR-007: View product details
const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = db.getProductById(id);
    
    // Get category details for response
    const category = db.getCategoryById(product.categoryId);
    const productWithCategory = { ...product, category };
    
    res.status(200).json({
      success: true,
      data: productWithCategory
    });
  } catch (error) {
    next(error);
  }
};

// FR-008: Update existing products
const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    const product = db.updateProduct(id, name, categoryId);
    
    // Get category details for response
    const category = db.getCategoryById(categoryId);
    const productWithCategory = { ...product, category };
    
    res.status(200).json({
      success: true,
      data: productWithCategory,
      message: 'Product updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// FR-009: Delete products
const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const result = db.deleteProduct(id);
    
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

// FR-010: Search products by name
const searchProductsByName = (req, res) => {
  try {
    const { name } = req.query;
    const { page, pageSize } = req.query;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Search term is required',
        timestamp: new Date().toISOString()
      });
    }
    
    const result = db.searchProductsByName(name.trim(), page, pageSize);
    
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
      searchTerm: name.trim()
    });
  } catch (error) {
    next(error);
  }
};

// FR-011: Filter products by category
const getProductsByCategory = (req, res) => {
  try {
    const { categoryId } = req.params;
    const { page, pageSize } = req.query;
    
    // Validate categoryId parameter
    if (!categoryId || isNaN(categoryId) || parseInt(categoryId) < 1) {
      return res.status(400).json({
        success: false,
        error: 'Valid category ID is required',
        timestamp: new Date().toISOString()
      });
    }
    
    const result = db.getProductsByCategory(categoryId, page, pageSize);
    
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
      categoryId: parseInt(categoryId)
    });
  } catch (error) {
    next(error);
  }
};

// FR-012: Paginate product listings
const getAllProducts = (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = db.getAllProducts(page, pageSize);
    
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductsByName,
  getProductsByCategory,
  getAllProducts
}; 