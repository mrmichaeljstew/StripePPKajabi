const axios = require('axios');

// Helper function to get PayPal customer data
exports.getCustomerData = async (paypalCustomerId) => {
    const response = await axios.get(`https://api.paypal.com/v1/customers/${paypalCustomerId}`, {
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET,
        },
    });
    return response.data;
};

// Helper function to cancel PayPal subscription
exports.cancelSubscription = async (subscriptionId) => {
    const response = await axios.post(
        `https://api.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`, 
        {},
        {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET,
            }
        }
    );
    return response.data;
};

// Helper function to get PayPal subscription
exports.getSubscription = async (subscriptionId) => {
    const response = await axios.get(
        `https://api.paypal.com/v1/billing/subscriptions/${subscriptionId}`,
        {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET,
            }
        }
    );
    return response.data;
};

// Helper function to get customer subscriptions
exports.getCustomerSubscriptions = async (paypalCustomerId) => {
    const response = await axios.get(
        `https://api.paypal.com/v1/billing/subscriptions?customer_id=${paypalCustomerId}`,
        {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET,
            }
        }
    );
    return response.data.subscriptions;
};

// Helper function to get plan details
exports.getPlanDetails = async (planId) => {
    const response = await axios.get(
        `https://api.paypal.com/v1/billing/plans/${planId}`,
        {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET,
            }
        }
    );
    return response.data;
};

// Helper function to get all PayPal customers
exports.getAllCustomers = async () => {
    const response = await axios.get(
        'https://api.paypal.com/v1/customer/customers',
        {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET,
            }
        }
    );
    return response.data.customers;
};
