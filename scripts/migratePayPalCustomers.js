const paypalService = require('../services/paypalService');
const paypalUtils = require('../utils/paypalUtils');

async function migrateAllCustomers() {
    try {
        const paypalCustomers = await paypalUtils.getAllCustomers();
        for (const customer of paypalCustomers) {
            await paypalService.migrateCustomer(customer.id);
            console.log(`Migrated customer: ${customer.id}`);
        }
        console.log('All customers migrated successfully');
    } catch (error) {
        console.error('Error during migration:', error);
    }
}

migrateAllCustomers();
