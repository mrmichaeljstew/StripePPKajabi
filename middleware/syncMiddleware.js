const stripeService = require('../services/stripeService');
const kajabiService = require('../services/kajabiService');

exports.syncKajabiWithStripe = async (req, res, next) => {
    try {
        const { kajabiProductId } = req.body;

        const stripeProducts = await stripeService.retrieveProducts();
        const kajabiProduct = await kajabiService.getProductById(kajabiProductId);
        
        const matchedProduct = stripeProducts.find(product => product.metadata.kajabiProductId === kajabiProductId);
        
        if (matchedProduct) {
            req.stripeProduct = matchedProduct;
            next();
        } else {
            res.status(400).json({ error: 'No matching Stripe product found for the provided Kajabi product.' });
        
            // Create a new Stripe product
            const stripeProduct = await stripeService.createProduct(kajabiProduct);
            // Update Kajabi product with Stripe product ID
            await kajabiService.updateProductStripeMapping(kajabiProductId, stripeProduct.id);
            req.stripeProduct = stripeProduct;
            next();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
