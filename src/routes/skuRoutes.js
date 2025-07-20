/**
 * SKU Routes
 * Defines all SKU-related API endpoints
 */

const express = require('express');
const router = express.Router();
const skuController = require('../controllers/skuController');
const { 
  validateSKUInput, 
  validateIdParam, 
  validatePagination 
} = require('../middleware/validation');

// FR-013: Add SKUs to products
router.post('/product/:productId', validateIdParam, validateSKUInput, skuController.createSKU);

// FR-014: Update existing SKUs
router.put('/:id', validateIdParam, validateSKUInput, skuController.updateSKU);

// FR-015: Delete SKUs
router.delete('/:id', validateIdParam, skuController.deleteSKU);

// FR-016: List SKUs by product
router.get('/product/:productId', validateIdParam, validatePagination, skuController.getSKUsByProduct);

// Get SKU by ID
router.get('/:id', validateIdParam, skuController.getSKUById);

module.exports = router; 