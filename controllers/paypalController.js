const paypalService = require('../services/paypalService');

exports.migratePayPalToStripe = async (req, res) => {
    const { paypalCustomerId } = req.body;
    try {
        const result = await paypalService.migrateCustomer(paypalCustomerId);
        res.status(200).json({ message: 'Migration successful', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cancelPayPalSubscription = async (req, res) => {
    const { subscriptionId } = req.body;
    try {
        const result = await paypalService.cancelPayPalSubscription(subscriptionId);
        res.status(200).json({ message: 'Subscription canceled', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
