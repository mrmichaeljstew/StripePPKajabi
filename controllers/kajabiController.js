const kajabiService = require('../services/kajabiService');
const stripeService = require('../services/stripeService');

exports.handleWebhook = async (req, res) => {
    try {
        const event = req.body;

        if (event.type === 'subscription_created') {
            const { kajabiProductId, customerId } = event.data;
            
            // Find or create corresponding Stripe product
            let stripeProduct = await stripeService.findProductByKajabiId(kajabiProductId);
            
            if (!stripeProduct) {
                const kajabiProduct = await kajabiService.getProductById(kajabiProductId);
                stripeProduct = await stripeService.createProduct(kajabiProduct);
                await kajabiService.updateProductStripeMapping(kajabiProductId, stripeProduct.id);
            }

            // Create or update Stripe subscription
            await stripeService.createOrUpdateSubscription(customerId, stripeProduct.default_price);

            res.status(200).json({ message: 'Webhook processed successfully' });
        } else {
            res.status(400).json({ message: 'Unhandled event type' });
        }
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: error.message });
    }
};
