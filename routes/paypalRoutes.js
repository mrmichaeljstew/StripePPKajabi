const express = require('express');
const paypalController = require('../controllers/paypalController');

const router = express.Router();

router.post('/migrate', paypalController.migratePayPalToStripe);
router.post('/cancel-subscription', paypalController.cancelPayPalSubscription);

module.exports = router;
