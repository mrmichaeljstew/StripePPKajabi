// Kajabi API configuration
const kajabiConfig = {
    apiKey: process.env.KAJABI_API_KEY,
    webhookSecret: process.env.KAJABI_WEBHOOK_SECRET,
    apiBaseUrl: 'https://your_kajabi_site.kajabi.com/api/v1',
    webhookEvents: {
        SUBSCRIPTION_CREATED: 'subscription_created',
        SUBSCRIPTION_UPDATED: 'subscription_updated',
        SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
    },
    productMapping: {
        // Map Kajabi product IDs to Stripe product IDs
        // Example: 'kajabi_product_id': 'stripe_product_id'
    },
};

// Validate required environment variables
if (!kajabiConfig.apiKey) {
    throw new Error('KAJABI_API_KEY is not set in the environment variables');
}

if (!kajabiConfig.webhookSecret) {
    throw new Error('KAJABI_WEBHOOK_SECRET is not set in the environment variables');
}

module.exports = kajabiConfig;
