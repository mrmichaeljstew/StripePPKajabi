const axios = require('axios');

const KAJABI_API_URL = 'https://your_kajabi_site.kajabi.com/api/';

exports.getProductById = async (productId) => {
    try {
        const response = await axios.get(`${KAJABI_API_URL}/v1/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.KAJABI_API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching Kajabi product: ${error.message}`);
    }
};

exports.updateProductStripeMapping = async (kajabiProductId, stripeProductId) => {
    try {
        const response = await axios.put(`${KAJABI_API_URL}/v1/products/${kajabiProductId}`, {
            product: {
                stripe_product_id: stripeProductId
            }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.KAJABI_API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error updating Kajabi product: ${error.message}`);
    }
};

// You can add other methods like getAllProducts or updateProduct if needed.
