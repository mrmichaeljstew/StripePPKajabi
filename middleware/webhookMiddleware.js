const crypto = require('crypto');

exports.verifyKajabiWebhook = (req, res, next) => {
    const signature = req.headers['x-kajabi-signature'];
    const timestamp = req.headers['x-kajabi-timestamp'];
    const body = JSON.stringify(req.body);

    const expectedSignature = crypto
        .createHmac('sha256', process.env.KAJABI_WEBHOOK_SECRET)
        .update(timestamp + body)
        .digest('hex');

    if (signature === expectedSignature) {
        next();
    } else {
        res.status(401).json({ error: 'Invalid signature' });
    }
};
