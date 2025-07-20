/**
 * Error Handling Middleware
 * Provides consistent error responses and proper HTTP status codes
 */

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Handle validation errors
  if (err.message.includes('cannot be empty') || 
      err.message.includes('are required') ||
      err.message.includes('not found')) {
    return res.status(400).json({
      success: false,
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Handle business logic errors
  if (err.message.includes('Cannot delete') || 
      err.message.includes('associated')) {
    return res.status(409).json({
      success: false,
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Handle pagination errors
  if (err.message.includes('pagination')) {
    return res.status(400).json({
      success: false,
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler; 