const express = require('express');
const { pool, connectPG } = require('./config/pgClient');
const connectMongo = require('./config/mongoClient');
const Review = require('./models/Review');

const app = express();

app.use(express.json());

connectPG();
connectMongo();

app.post('/api/products', async (req, res) => {
    const { name, price } = req.body;

    try {
        const queryText =
            'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id';

        const result = await pool.query(queryText, [name, price]);

        res.status(201).json({
            id: result.rows[0].id,
            name,
            price
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/reviews', async (req, res) => {
    try {
        const newReview = new Review(req.body);

        const savedReview = await newReview.save();

        res.status(201).json(savedReview);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/products/:id/details', async (req, res) => {
    const productId = req.params.id;

    try {
        const productResult =
            await pool.query(
                'SELECT * FROM products WHERE id = $1',
                [productId]
            );

        if (productResult.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const product = productResult.rows[0];

        const reviews =
            await Review.find({ product_id: productId });

        const fullData = {
            ...product,
            reviews: reviews
        };

        res.json(fullData);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Hybrid Server running on port ${PORT}`);
});