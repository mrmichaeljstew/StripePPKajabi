const stripeConfig = {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    apiVersion: '2023-10-16', // Update this to the latest Stripe API version
};

if (!stripeConfig.secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set in the environment variables');
}

if (!stripeConfig.webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set in the environment variables');
}

module.exports = stripeConfig;
