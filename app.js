const express = require('express');
const dotenv = require('dotenv');
const stripeRoutes = require('./routes/stripeRoutes');
const paypalRoutes = require('./routes/paypalRoutes');
const kajabiRoutes = require('./routes/kajabiRoutes');

dotenv.config();

const app = express();

// Stripe webhook should be raw
app.use('/stripe/webhook', express.raw({type: 'application/json'}));

// For all other routes, parse JSON
app.use(express.json());

app.use('/stripe', stripeRoutes);
app.use('/paypal', paypalRoutes);
app.use('/kajabi', kajabiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
