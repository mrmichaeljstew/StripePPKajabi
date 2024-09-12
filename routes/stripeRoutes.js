const express = require('express');
const stripeController = require('../controllers/stripeController');
const syncMiddleware = require('../middleware/syncMiddleware');

const router = express.Router();

router.get('/products', stripeController.getProducts);
router.post('/create-subscription', syncMiddleware.syncKajabiWithStripe, stripeController.createSubscription);

module.exports = router;
