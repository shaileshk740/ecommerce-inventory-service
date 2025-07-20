/**
 * Category Routes
 * Defines all category-related API endpoints
 */

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { validateCategoryInput, validateIdParam } = require('../middleware/validation');

// FR-001: Create new product categories
router.post('/', validateCategoryInput, categoryController.createCategory);

// FR-002: View category details
router.get('/:id', validateIdParam, categoryController.getCategoryById);

// FR-003: Update existing categories
router.put('/:id', validateIdParam, validateCategoryInput, categoryController.updateCategory);

// FR-004: Delete categories
router.delete('/:id', validateIdParam, categoryController.deleteCategory);

// FR-005: List all categories
router.get('/', categoryController.getAllCategories);

module.exports = router; 