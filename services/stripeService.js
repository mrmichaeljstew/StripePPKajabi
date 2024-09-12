const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.retrieveProducts = async () => {
    const products = await stripe.products.list();
    return products.data;
};

exports.createSubscription = async (customerId, priceId) => {
    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        expand: ['latest_invoice.payment_intent'],
    });
    return subscription;
};

exports.createCustomer = async (customerDetails) => {
    const customer = await stripe.customers.create(customerDetails);
    return customer;
};

exports.findProductByKajabiId = async (kajabiProductId) => {
    const products = await stripe.products.list({
        limit: 100,
        expand: ['data.default_price']
    });
    return products.data.find(product => product.metadata.kajabiProductId === kajabiProductId);
};

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

exports.createProduct = async (kajabiProduct) => {
    const product = await stripe.products.create({
        name: kajabiProduct.name,
        description: kajabiProduct.description,
        metadata: { kajabiProductId: kajabiProduct.id }
    });
    return product;
};

exports.findOrCreateProductFromPaypalPlan = async (paypalPlanId) => {
    let product = await this.findProductByPaypalPlan(paypalPlanId);
    if (!product) {
        const paypalPlan = await paypalUtils.getPlanDetails(paypalPlanId);
        product = await this.createProductFromPaypalPlan(paypalPlan);
    }
    return product;
};
