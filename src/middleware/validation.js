/**
 * Validation Middleware
 * Provides input validation and sanitization for API endpoints
 */

const validatePagination = (req, res, next) => {
  const { page, pageSize } = req.query;
  
  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return res.status(400).json({
      success: false,
      error: 'Page must be a positive integer',
      timestamp: new Date().toISOString()
    });
  }

  if (pageSize && (isNaN(pageSize) || parseInt(pageSize) < 1 || parseInt(pageSize) > 100)) {
    return res.status(400).json({
      success: false,
      error: 'Page size must be between 1 and 100',
      timestamp: new Date().toISOString()
    });
  }

  next();
};

const validateCategoryInput = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Category name is required and cannot be empty',
      timestamp: new Date().toISOString()
    });
  }

  // Sanitize input
  req.body.name = name.trim();
  next();
};

const validateProductInput = (req, res, next) => {
  const { name, categoryId } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Product name is required and cannot be empty',
      timestamp: new Date().toISOString()
    });
  }

  if (!categoryId || isNaN(categoryId) || parseInt(categoryId) < 1) {
    return res.status(400).json({
      success: false,
      error: 'Valid category ID is required',
      timestamp: new Date().toISOString()
    });
  }

  // Sanitize input
  req.body.name = name.trim();
  req.body.categoryId = parseInt(categoryId);
  next();
};

const validateSKUInput = (req, res, next) => {
  const { variantDetails } = req.body;

  if (!variantDetails || typeof variantDetails !== 'object' || Object.keys(variantDetails).length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Variant details are required and must be a non-empty object',
      timestamp: new Date().toISOString()
    });
  }

  // Validate variant details structure
  for (const [key, value] of Object.entries(variantDetails)) {
    if (typeof key !== 'string' || key.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Variant detail keys must be non-empty strings',
        timestamp: new Date().toISOString()
      });
    }

    if (value === null || value === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Variant detail values cannot be null or undefined',
        timestamp: new Date().toISOString()
      });
    }
  }

  next();
};

const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id) || parseInt(id) < 1) {
    return res.status(400).json({
      success: false,
      error: 'Valid ID parameter is required',
      timestamp: new Date().toISOString()
    });
  }

  req.params.id = parseInt(id);
  next();
};

module.exports = {
  validatePagination,
  validateCategoryInput,
  validateProductInput,
  validateSKUInput,
  validateIdParam
}; 