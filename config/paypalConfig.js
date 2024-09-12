const paypalConfig = {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_SECRET,
    environment: process.env.PAYPAL_ENVIRONMENT || 'sandbox', // 'sandbox' or 'live'
    apiBaseUrl: process.env.PAYPAL_ENVIRONMENT === 'live' 
        ? 'https://api-m.paypal.com' 
        : 'https://api-m.sandbox.paypal.com',
};

if (!paypalConfig.clientId) {
    throw new Error('PAYPAL_CLIENT_ID is not set in the environment variables');
}

if (!paypalConfig.clientSecret) {
    throw new Error('PAYPAL_SECRET is not set in the environment variables');
}

module.exports = paypalConfig;
