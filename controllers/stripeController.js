const stripeService = require('../services/stripeService');

exports.getProducts = async (req, res) => {
    try {
        const products = await stripeService.retrieveProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createSubscription = async (req, res) => {
    const { customerId, priceId } = req.body;
    try {
        const subscription = await stripeService.createSubscription(customerId, priceId);
        res.status(200).json(subscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
