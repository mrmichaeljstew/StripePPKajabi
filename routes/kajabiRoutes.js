const express = require('express');
const kajabiController = require('../controllers/kajabiController');

const router = express.Router();

router.post('/webhook', kajabiController.handleWebhook);

module.exports = router;
