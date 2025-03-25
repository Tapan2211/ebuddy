require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


//Import Routes
const userRoutes = require('./routes/user.route');
const otpRoutes = require('./routes/otp.route');
const categoriesRoutes = require('./routes/categories.route');
const subCategoriesRoutes = require('./routes/subCategories.route');
const productRoutes = require('./routes/product.route');

const app = express();
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Use express.json() instead of bodyParser.json()
app.use('/uploads', express.static('uploads'));

app.use('/api/v1', userRoutes);
app.use('/api/v1', otpRoutes);
app.use('/api/v1', categoriesRoutes);
app.use('/api/v1', subCategoriesRoutes);
app.use('/api/v1', productRoutes);

const PORT = process.env.PORT || 8082;
console.log(`Server starting on port: ${PORT}`);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
