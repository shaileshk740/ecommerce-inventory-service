# E-commerce Inventory Management Service

A comprehensive Node.js REST API for managing e-commerce inventory with categories, products, and SKUs. Built with Express.js and in-memory database for rapid development and testing.

## 🚀 Features

### Core Functionality
- **Category Management**: Full CRUD operations for product categories
- **Product Management**: Create, read, update, delete products with category association
- **SKU Management**: Manage product variants with detailed specifications
- **Search & Filtering**: Search products by name, filter by category
- **Pagination**: Efficient data browsing with metadata
- **Data Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Consistent error responses with proper HTTP status codes

### Technical Features
- **In-Memory Database**: Fast development and testing
- **RESTful API Design**: Standard HTTP methods and status codes
- **Security**: Helmet.js, CORS, rate limiting
- **Input Validation**: Middleware-based validation and sanitization
- **Pagination Support**: Configurable page size and navigation
- **Relationship Management**: Enforce foreign key constraints

## 📋 Requirements

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <cloned-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Verify installation**
   ```bash
   curl http://localhost:3000/health
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication
Currently, the API doesn't require authentication. In production, implement JWT or API key authentication.

### Response Format
All API responses follow this structure:
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful",
  "pagination": {...} // for list endpoints
}
```

## 🔧 API Endpoints

### Categories

#### Create Category (FR-001)
```http
POST /api/v1/categories
Content-Type: application/json

{
  "name": "Electronics"
}
```

#### Get Category by ID (FR-002)
```http
GET /api/v1/categories/:id
```

#### Update Category (FR-003)
```http
PUT /api/v1/categories/:id
Content-Type: application/json

{
  "name": "Updated Electronics"
}
```

#### Delete Category (FR-004)
```http
DELETE /api/v1/categories/:id
```

#### List All Categories (FR-005)
```http
GET /api/v1/categories
```

### Products

#### Create Product (FR-006)
```http
POST /api/v1/products
Content-Type: application/json

{
  "name": "iPhone 15",
  "categoryId": 1
}
```

#### Get Product by ID (FR-007)
```http
GET /api/v1/products/:id
```

#### Update Product (FR-008)
```http
PUT /api/v1/products/:id
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "categoryId": 1
}
```

#### Delete Product (FR-009)
```http
DELETE /api/v1/products/:id
```

#### Search Products by Name (FR-010)
```http
GET /api/v1/products/search?name=iPhone&page=1&pageSize=10
```

#### Filter Products by Category (FR-011)
```http
GET /api/v1/products/category/:categoryId?page=1&pageSize=10
```

#### List All Products with Pagination (FR-012)
```http
GET /api/v1/products?page=1&pageSize=10
```

### SKUs

#### Create SKU (FR-013)
```http
POST /api/v1/skus/product/:productId
Content-Type: application/json

{
  "variantDetails": {
    "color": "Black",
    "storage": "128GB",
    "price": 999.99
  }
}
```

#### Update SKU (FR-014)
```http
PUT /api/v1/skus/:id
Content-Type: application/json

{
  "variantDetails": {
    "color": "White",
    "storage": "256GB",
    "price": 1099.99
  }
}
```

#### Delete SKU (FR-015)
```http
DELETE /api/v1/skus/:id
```

#### List SKUs by Product (FR-016)
```http
GET /api/v1/skus/product/:productId?page=1&pageSize=10
```

#### Get SKU by ID
```http
GET /api/v1/skus/:id
```

## 🔍 Pagination

All list endpoints support pagination with these query parameters:
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 10, max: 100)

Response includes pagination metadata:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalCount": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## 🛡️ Error Handling

The API provides consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `409`: Conflict (business logic errors)
- `500`: Internal Server Error

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📁 Project Structure

```
src/
├── app.js                 # Main application entry point
├── database/
│   └── inMemoryDB.js     # In-memory database implementation
├── controllers/
│   ├── categoryController.js
│   ├── productController.js
│   └── skuController.js
├── middleware/
│   ├── errorHandler.js   # Global error handling
│   └── validation.js     # Input validation middleware
└── routes/
    ├── categoryRoutes.js
    ├── productRoutes.js
    └── skuRoutes.js
```

## 🔧 Configuration

Environment variables:
- `PORT`: Server port (default: 3000)
- `ALLOWED_ORIGINS`: CORS allowed origins (comma-separated)

## 🚀 Deployment

1. **Production build**
   ```bash
   npm install --production
   ```

2. **Set environment variables**
   ```bash
   export PORT=3000
   export ALLOWED_ORIGINS=https://yourdomain.com
   ```

3. **Start the server**
   ```bash
   npm start
   ```

## 📝 Business Rules

### Data Relationships
- Products must belong to existing categories
- SKUs must belong to existing products
- Categories cannot be deleted if they have associated products
- Products cannot be deleted if they have associated SKUs

### Validation Rules
- Category names cannot be empty
- Product names cannot be empty
- Product categoryId must reference an existing category
- SKU variantDetails must be a non-empty object
- Pagination parameters must be positive integers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api/v1`
- Review the health check endpoint at `/health` 