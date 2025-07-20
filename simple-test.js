/**
 * Simple API Test Script
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/v1';

async function simpleTest() {
  console.log('🧪 Simple API Test...\n');

  try {
    // Test 1: Health Check
    const health = await axios.get('http://localhost:3000/health');
    console.log('✅ Health check:', health.data.message);

    // Test 2: Create Category
    const category = await axios.post(`${BASE_URL}/categories`, { name: 'Electronics' });
    const categoryId = category.data.data.id;
    console.log('✅ Category created:', category.data.data.name);

    // Test 3: Create Product
    const product = await axios.post(`${BASE_URL}/products`, { 
      name: 'iPhone 15', 
      categoryId: categoryId 
    });
    const productId = product.data.data.id;
    console.log('✅ Product created:', product.data.data.name);

    // Test 4: Search Products
    const search = await axios.get(`${BASE_URL}/products/search?name=iPhone`);
    console.log('✅ Search works:', search.data.data.length, 'products found');

    // Test 5: Filter by Category
    const filter = await axios.get(`${BASE_URL}/products/category/${categoryId}`);
    console.log('✅ Filter works:', filter.data.data.length, 'products found');

    // Test 6: Create SKU
    const sku = await axios.post(`${BASE_URL}/skus/product/${productId}`, {
      variantDetails: { color: 'Black', storage: '128GB', price: 999.99 }
    });
    console.log('✅ SKU created:', sku.data.data.id);

    // Test 7: List All Products
    const list = await axios.get(`${BASE_URL}/products`);
    console.log('✅ List works:', list.data.pagination.totalCount, 'total products');

    console.log('\n🎉 All basic tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

simpleTest(); 