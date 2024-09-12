const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripeConfig = require('../config/stripeConfig');

/**
 * Find a Stripe product by its Kajabi product ID
 * @param {string} kajabiProductId - The Kajabi product ID
 * @returns {Promise<Object|null>} The Stripe product if found, null otherwise
 */
exports.findProductByKajabiId = async (kajabiProductId) => {
    const products = await stripe.products.list({
        limit: 100,
        expand: ['data.default_price']
    });
    return products.data.find(product => product.metadata.kajabiProductId === kajabiProductId) || null;
};

/**
 * Find a Stripe product by its PayPal plan ID
 * @param {string} paypalPlanId - The PayPal plan ID
 * @returns {Promise<Object|null>} The Stripe product if found, null otherwise
 */
exports.findProductByPaypalPlan = async (paypalPlanId) => {
    const products = await stripe.products.list({
        limit: 100,
        expand: ['data.default_price']
    });
    return products.data.find(product => product.metadata.paypalPlanId === paypalPlanId) || null;
};

/**
 * Create a new Stripe product and price from a PayPal plan
 * @param {Object} paypalPlan - The PayPal plan object
 * @returns {Promise<Object>} The created Stripe product and price
 */
exports.createProductFromPaypalPlan = async (paypalPlan) => {
    const product = await stripe.products.create({
        name: paypalPlan.name,
        description: paypalPlan.description,
        metadata: {
            paypalPlanId: paypalPlan.id
        }
    });

    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(paypalPlan.billing_cycles[0].pricing_scheme.fixed_price.value * 100), // Convert to cents
        currency: paypalPlan.billing_cycles[0].pricing_scheme.fixed_price.currency_code.toLowerCase(),
        recurring: {
            interval: paypalPlan.billing_cycles[0].frequency.interval_unit.toLowerCase(),
            interval_count: paypalPlan.billing_cycles[0].frequency.interval_count
        }
    });

    return { product, price };
};

/**
 * Create or update a Stripe subscription
 * @param {string} customerId - The Stripe customer ID
 * @param {string} priceId - The Stripe price ID
 * @returns {Promise<Object>} The created or updated Stripe subscription
 */
exports.createOrUpdateSubscription = async (customerId, priceId) => {
    const existingSubscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
    });

    if (existingSubscriptions.data.length > 0) {
        // Update existing subscription
        return await stripe.subscriptions.update(existingSubscriptions.data[0].id, {
            items: [{ price: priceId }],
        });
    } else {
        // Create new subscription
        return await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
        });
    }
};

/**
 * Create a new Stripe customer
 * @param {Object} customerData - Customer data including email, name, and metadata
 * @returns {Promise<Object>} The created Stripe customer
 */
exports.createCustomer = async (customerData) => {
    return await stripe.customers.create(customerData);
};

/**
 * Retrieve all Stripe products
 * @returns {Promise<Array>} An array of Stripe products
 */
exports.retrieveProducts = async () => {
    const products = await stripe.products.list({
        limit: 100,
        expand: ['data.default_price']
    });
    return products.data;
};

/**
 * Verify Stripe webhook signature
 * @param {string} payload - The raw request body
 * @param {string} signature - The Stripe signature from the request headers
 * @returns {Object} The verified Stripe event
 */
exports.verifyWebhookSignature = (payload, signature) => {
    return stripe.webhooks.constructEvent(
        payload,
        signature,
        stripeConfig.webhookSecret
    );
};
