/**
 * SKU Controller
 * Handles all SKU-related operations (FR-013 to FR-016)
 */

const db = require('../database/inMemoryDB');

// FR-013: Add SKUs to products
const createSKU = (req, res) => {
  try {
    const { productId } = req.params;
    const { variantDetails } = req.body;
    
    const sku = db.createSKU(productId, variantDetails);
    
    // Get product details for response
    const product = db.getProductById(productId);
    const skuWithProduct = { ...sku, product };
    
    res.status(201).json({
      success: true,
      data: skuWithProduct,
      message: 'SKU created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// FR-014: Update existing SKUs
const updateSKU = (req, res) => {
  try {
    const { id } = req.params;
    const { variantDetails } = req.body;
    
    const sku = db.updateSKU(id, variantDetails);
    
    // Get product details for response
    const product = db.getProductById(sku.productId);
    const skuWithProduct = { ...sku, product };
    
    res.status(200).json({
      success: true,
      data: skuWithProduct,
      message: 'SKU updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// FR-015: Delete SKUs
const deleteSKU = (req, res) => {
  try {
    const { id } = req.params;
    const result = db.deleteSKU(id);
    
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

// FR-016: List SKUs by product
const getSKUsByProduct = (req, res) => {
  try {
    const { productId } = req.params;
    const { page, pageSize } = req.query;
    
    const result = db.getSKUsByProduct(productId, page, pageSize);
    
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
      productId: parseInt(productId)
    });
  } catch (error) {
    next(error);
  }
};

// Get SKU by ID
const getSKUById = (req, res) => {
  try {
    const { id } = req.params;
    const sku = db.getSKUById(id);
    
    // Get product details for response
    const product = db.getProductById(sku.productId);
    const skuWithProduct = { ...sku, product };
    
    res.status(200).json({
      success: true,
      data: skuWithProduct
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSKU,
  updateSKU,
  deleteSKU,
  getSKUsByProduct,
  getSKUById
}; 