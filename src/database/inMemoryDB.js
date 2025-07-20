/**
 * In-Memory Database for E-commerce Inventory Management Service
 * Implements data storage for Categories, Products, and SKUs with proper relationships
 */

class InMemoryDB {
  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.skus = new Map();
    this.categoryCounter = 1;
    this.productCounter = 1;
    this.skuCounter = 1;
  }

  // Category Operations
  createCategory(name) {
    if (!name || name.trim() === '') {
      throw new Error('Category name cannot be empty');
    }

    const id = this.categoryCounter++;
    const category = {
      id,
      name: name.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.categories.set(id, category);
    return category;
  }

  getCategoryById(id) {
    const category = this.categories.get(parseInt(id));
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  updateCategory(id, name) {
    if (!name || name.trim() === '') {
      throw new Error('Category name cannot be empty');
    }

    const category = this.getCategoryById(id);
    category.name = name.trim();
    category.updatedAt = new Date().toISOString();
    
    this.categories.set(parseInt(id), category);
    return category;
  }

  deleteCategory(id) {
    const categoryId = parseInt(id);
    const category = this.getCategoryById(categoryId);
    
    // Check if category has associated products
    const hasProducts = Array.from(this.products.values()).some(product => product.categoryId === categoryId);
    if (hasProducts) {
      throw new Error('Cannot delete category with associated products');
    }

    this.categories.delete(categoryId);
    return { message: 'Category deleted successfully' };
  }

  getAllCategories() {
    return Array.from(this.categories.values());
  }

  // Product Operations
  createProduct(name, categoryId) {
    if (!name || name.trim() === '') {
      throw new Error('Product name cannot be empty');
    }

    // Validate category exists
    this.getCategoryById(categoryId);

    const id = this.productCounter++;
    const product = {
      id,
      name: name.trim(),
      categoryId: parseInt(categoryId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.products.set(id, product);
    return product;
  }

  getProductById(id) {
    const product = this.products.get(parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  updateProduct(id, name, categoryId) {
    if (!name || name.trim() === '') {
      throw new Error('Product name cannot be empty');
    }

    // Validate category exists
    this.getCategoryById(categoryId);

    const product = this.getProductById(id);
    product.name = name.trim();
    product.categoryId = parseInt(categoryId);
    product.updatedAt = new Date().toISOString();
    
    this.products.set(parseInt(id), product);
    return product;
  }

  deleteProduct(id) {
    const productId = parseInt(id);
    const product = this.getProductById(productId);
    
    // Check if product has associated SKUs
    const hasSkus = Array.from(this.skus.values()).some(sku => sku.productId === productId);
    if (hasSkus) {
      throw new Error('Cannot delete product with associated SKUs');
    }

    this.products.delete(productId);
    return { message: 'Product deleted successfully' };
  }

  searchProductsByName(name, page = 1, pageSize = 10) {
    const searchTerm = name.toLowerCase();
    const matchingProducts = Array.from(this.products.values())
      .filter(product => product.name.toLowerCase().includes(searchTerm))
      .map(product => ({
        ...product,
        category: this.categories.get(product.categoryId)
      }));

    return this.paginateResults(matchingProducts, page, pageSize);
  }

  getProductsByCategory(categoryId, page = 1, pageSize = 10) {
    // Validate category exists
    this.getCategoryById(categoryId);

    const categoryProducts = Array.from(this.products.values())
      .filter(product => product.categoryId === parseInt(categoryId))
      .map(product => ({
        ...product,
        category: this.categories.get(product.categoryId)
      }));

    return this.paginateResults(categoryProducts, page, pageSize);
  }

  getAllProducts(page = 1, pageSize = 10) {
    const allProducts = Array.from(this.products.values())
      .map(product => ({
        ...product,
        category: this.categories.get(product.categoryId)
      }));

    return this.paginateResults(allProducts, page, pageSize);
  }

  // SKU Operations
  createSKU(productId, variantDetails) {
    if (!variantDetails || typeof variantDetails !== 'object') {
      throw new Error('Variant details are required');
    }

    // Validate product exists
    this.getProductById(productId);

    const id = this.skuCounter++;
    const sku = {
      id,
      productId: parseInt(productId),
      variantDetails,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.skus.set(id, sku);
    return sku;
  }

  getSKUById(id) {
    const sku = this.skus.get(parseInt(id));
    if (!sku) {
      throw new Error('SKU not found');
    }
    return sku;
  }

  updateSKU(id, variantDetails) {
    if (!variantDetails || typeof variantDetails !== 'object') {
      throw new Error('Variant details are required');
    }

    const sku = this.getSKUById(id);
    sku.variantDetails = variantDetails;
    sku.updatedAt = new Date().toISOString();
    
    this.skus.set(parseInt(id), sku);
    return sku;
  }

  deleteSKU(id) {
    const skuId = parseInt(id);
    this.getSKUById(skuId);
    
    this.skus.delete(skuId);
    return { message: 'SKU deleted successfully' };
  }

  getSKUsByProduct(productId, page = 1, pageSize = 10) {
    // Validate product exists
    this.getProductById(productId);

    const productSkus = Array.from(this.skus.values())
      .filter(sku => sku.productId === parseInt(productId))
      .map(sku => ({
        ...sku,
        product: this.products.get(sku.productId)
      }));

    return this.paginateResults(productSkus, page, pageSize);
  }

  // Utility Methods
  paginateResults(data, page = 1, pageSize = 10) {
    const pageNum = Math.max(1, parseInt(page));
    const size = Math.max(1, Math.min(100, parseInt(pageSize)));
    const startIndex = (pageNum - 1) * size;
    const endIndex = startIndex + size;
    const totalCount = data.length;
    const totalPages = Math.ceil(totalCount / size);

    return {
      data: data.slice(startIndex, endIndex),
      pagination: {
        currentPage: pageNum,
        pageSize: size,
        totalCount,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPreviousPage: pageNum > 1
      }
    };
  }

  // Reset database for testing
  reset() {
    this.categories.clear();
    this.products.clear();
    this.skus.clear();
    this.categoryCounter = 1;
    this.productCounter = 1;
    this.skuCounter = 1;
  }
}

module.exports = new InMemoryDB(); 