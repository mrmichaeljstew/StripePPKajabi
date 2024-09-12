const axios = require('axios');
const kajabiConfig = require('../config/kajabiConfig');

/**
 * Fetch a Kajabi product by its ID
 * @param {string} productId - The Kajabi product ID
 * @returns {Promise<Object>} The Kajabi product data
 */
exports.getKajabiProduct = async (productId) => {
    try {
        const response = await axios.get(`${kajabiConfig.apiBaseUrl}/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${kajabiConfig.apiKey}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Kajabi product:', error);
        throw error;
    }
};

/**
 * Update a Kajabi product with a Stripe product ID
 * @param {string} kajabiProductId - The Kajabi product ID
 * @param {string} stripeProductId - The Stripe product ID
 * @returns {Promise<Object>} The updated Kajabi product data
 */
exports.updateKajabiProductStripeId = async (kajabiProductId, stripeProductId) => {
    try {
        const response = await axios.put(`${kajabiConfig.apiBaseUrl}/products/${kajabiProductId}`, {
            product: {
                stripe_product_id: stripeProductId
            }
        }, {
            headers: {
                'Authorization': `Bearer ${kajabiConfig.apiKey}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating Kajabi product:', error);
        throw error;
    }
};

/**
 * Fetch all Kajabi products
 * @returns {Promise<Array>} An array of Kajabi products
 */
exports.getAllKajabiProducts = async () => {
    try {
        const response = await axios.get(`${kajabiConfig.apiBaseUrl}/products`, {
            headers: {
                'Authorization': `Bearer ${kajabiConfig.apiKey}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all Kajabi products:', error);
        throw error;
    }
};

/**
 * Find a Kajabi product by its Stripe product ID
 * @param {string} stripeProductId - The Stripe product ID
 * @returns {Promise<Object|null>} The Kajabi product if found, null otherwise
 */
exports.findKajabiProductByStripeId = async (stripeProductId) => {
    try {
        const allProducts = await this.getAllKajabiProducts();
        return allProducts.find(product => product.stripe_product_id === stripeProductId) || null;
    } catch (error) {
        console.error('Error finding Kajabi product by Stripe ID:', error);
        throw error;
    }
};

/**
 * Create a new Kajabi offer linked to a Stripe price
 * @param {string} kajabiProductId - The Kajabi product ID
 * @param {string} stripePriceId - The Stripe price ID
 * @param {Object} offerDetails - Details for the new offer
 * @returns {Promise<Object>} The created Kajabi offer
 */
exports.createKajabiOffer = async (kajabiProductId, stripePriceId, offerDetails) => {
    try {
        const response = await axios.post(`${kajabiConfig.apiBaseUrl}/products/${kajabiProductId}/offers`, {
            offer: {
                ...offerDetails,
                stripe_price_id: stripePriceId
            }
        }, {
            headers: {
                'Authorization': `Bearer ${kajabiConfig.apiKey}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating Kajabi offer:', error);
        throw error;
    }
};
