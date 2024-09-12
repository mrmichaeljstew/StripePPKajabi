const stripeService = require('./stripeService');
const paypalUtils = require('../utils/paypalUtils');

exports.migrateCustomer = async (paypalCustomerId) => {
    const customerData = await paypalUtils.getCustomerData(paypalCustomerId);
    const paypalSubscriptions = await paypalUtils.getCustomerSubscriptions(paypalCustomerId);

    const stripeCustomer = await stripeService.createCustomer({
        email: customerData.email,
        name: customerData.name,
        metadata: { paypalCustomerId: paypalCustomerId }
    });

    const migratedSubscriptions = [];

    for (const paypalSubscription of paypalSubscriptions) {
        const stripeProduct = await stripeService.findOrCreateProductFromPaypalPlan(paypalSubscription.plan_id);
        const stripeSubscription = await stripeService.createSubscription(stripeCustomer.id, stripeProduct.default_price.id);
        migratedSubscriptions.push(stripeSubscription);
        await this.cancelPayPalSubscription(paypalSubscription.id);
    }

    return { stripeCustomer, stripeSubscriptions: migratedSubscriptions };
};

exports.cancelPayPalSubscription = async (paypalSubscriptionId) => {
    const result = await paypalUtils.cancelSubscription(paypalSubscriptionId);
    return result;
};
