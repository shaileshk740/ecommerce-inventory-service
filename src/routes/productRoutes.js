/**
 * Product Routes
 * Defines all product-related API endpoints
 */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { 
  validateProductInput, 
  validateIdParam, 
  validatePagination 
} = require('../middleware/validation');

// FR-006: Create new products
router.post('/', validateProductInput, productController.createProduct);

// FR-012: Paginate product listings (must come before specific routes)
router.get('/', validatePagination, productController.getAllProducts);

// FR-010: Search products by name (must come before /:id route)
router.get('/search', validatePagination, productController.searchProductsByName);

// FR-011: Filter products by category (must come before /:id route)
router.get('/category/:categoryId', validatePagination, productController.getProductsByCategory);

// FR-007: View product details
router.get('/:id', validateIdParam, productController.getProductById);

// FR-008: Update existing products
router.put('/:id', validateIdParam, validateProductInput, productController.updateProduct);

// FR-009: Delete products
router.delete('/:id', validateIdParam, productController.deleteProduct);

module.exports = router; 