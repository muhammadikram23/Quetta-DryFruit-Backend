const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const chatRouter = require('./routes/chat');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Register Chat Router
app.use('/api/chat', chatRouter);

// 1. GET all products
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET Low Stock Alerts
app.get('/api/products/alerts/low-stock', async (req, res) => {
  try {
    const threshold = req.query.threshold || 10;
    const [rows] = await db.query('SELECT * FROM products WHERE stock_kg <= ?', [threshold]);
    res.json({ alert_count: rows.length, low_stock_items: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. POST Add New Product
app.post('/api/admin/products', async (req, res) => {
  try {
    const { 
      title, 
      category, 
      price_per_kg, 
      cost_price_per_kg, 
      stock_kg, 
      image_url 
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO products 
       (title, category, price_per_kg, cost_price_per_kg, stock_kg, image_url) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        category || 'Nuts',
        Number(price_per_kg) || 0,
        Number(cost_price_per_kg) || 0,
        Number(stock_kg) || 0,
        image_url || 'https://via.placeholder.com/300'
      ]
    );

    res.status(201).json({ 
      success: true, 
      message: 'Product saved successfully', 
      id: result.insertId 
    });
  } catch (err) {
    console.error('Database insertion error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 5. PUT Update Product Details / Stock
app.put('/api/admin/products/:id', async (req, res) => {
  const { id } = req.params;
  const { title, category, price_per_kg, cost_price_per_kg, stock_kg } = req.body;

  try {
    await db.query(
      `UPDATE products 
       SET title = ?, category = ?, price_per_kg = ?, cost_price_per_kg = ?, stock_kg = ? 
       WHERE id = ?`,
      [title, category, price_per_kg, cost_price_per_kg, stock_kg, id]
    );

    res.json({ success: true, message: 'Product updated successfully' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: err.message });
  }
});

// 6. DELETE Product
app.delete('/api/admin/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ success: true, message: `Product #${id} deleted successfully` });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: err.message });
  }
});

// 7. POST Create Order
app.post('/api/orders', async (req, res) => {
  const { customer_name, customer_phone, delivery_address, total_amount, items } = req.body;
  try {
    const [orderResult] = await db.query(
      'INSERT INTO orders (customer_name, customer_phone, delivery_address, total_amount) VALUES (?, ?, ?, ?)',
      [customer_name, customer_phone, delivery_address, total_amount]
    );
    const orderId = orderResult.insertId;

    for (let item of items) {
      const [prod] = await db.query('SELECT cost_price_per_kg FROM products WHERE id = ?', [item.product_id]);
      const costPrice = prod[0]?.cost_price_per_kg || 0;

      await db.query(
        'INSERT INTO order_items (order_id, product_id, weight_kg, cost_price_per_kg, subtotal) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.product_id, item.weight_kg, costPrice, item.subtotal]
      );

      await db.query(
        'UPDATE products SET stock_kg = stock_kg - ? WHERE id = ?',
        [item.weight_kg, item.product_id]
      );
    }

    res.status(201).json({ message: 'Order placed successfully', order_id: orderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. GET All Orders
app.get('/api/admin/orders', async (req, res) => {
  try {
    const query = `
      SELECT 
        o.id,
        o.customer_name,
        o.customer_phone,
        o.delivery_address,
        o.total_amount,
        o.status,
        o.created_at,
        COALESCE(
          GROUP_CONCAT(
            CONCAT(p.title, ' (', oi.weight_kg, ' kg)') 
            SEPARATOR ', '
          ), 
          'No items'
        ) AS items_summary
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      GROUP BY 
        o.id, 
        o.customer_name, 
        o.customer_phone, 
        o.delivery_address, 
        o.total_amount, 
        o.status, 
        o.created_at
      ORDER BY o.created_at DESC
    `;

    const [orders] = await db.query(query);
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 9. Admin Login Route
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true, token: 'admin-secret-token-123', message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid admin credentials' });
  }
});

// 10. Feedback Endpoint
app.post('/api/feedback', async (req, res) => {
  console.log('Incoming Feedback Body:', req.body);

  const { name, email, rating, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ success: false, error: 'Name and message are required.' });
  }

  try {
    const sql = 'INSERT INTO feedback (name, email, rating, message) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [name, email || null, parseInt(rating) || 5, message]);

    console.log('Feedback inserted successfully with ID:', result.insertId);

    return res.status(200).json({
      success: true,
      message: 'Feedback saved successfully!'
    });
  } catch (err) {
    console.error('MySQL Error during feedback insert:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET all feedback
app.get('/api/admin/feedback', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM feedback ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE feedback entry
app.delete('/api/admin/feedback/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM feedback WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Feedback removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT Update Order Status
app.put('/api/admin/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid order status value.' });
  }

  try {
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, message: `Order #${id} updated to ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. GET Profit Analytics
app.get('/api/admin/analytics/profit-details', async (req, res) => {
  try {
    const summaryQuery = `
      SELECT 
        COALESCE(SUM(CASE WHEN DATE(o.created_at) = CURDATE() THEN oi.subtotal ELSE 0 END), 0) AS daily_revenue,
        COALESCE(SUM(CASE WHEN DATE(o.created_at) = CURDATE() THEN (oi.subtotal - (oi.weight_kg * COALESCE(oi.cost_price_per_kg, p.cost_price_per_kg, 0))) ELSE 0 END), 0) AS daily_profit,
        
        COALESCE(SUM(CASE WHEN YEARWEEK(o.created_at, 1) = YEARWEEK(CURDATE(), 1) THEN oi.subtotal ELSE 0 END), 0) AS weekly_revenue,
        COALESCE(SUM(CASE WHEN YEARWEEK(o.created_at, 1) = YEARWEEK(CURDATE(), 1) THEN (oi.subtotal - (oi.weight_kg * COALESCE(oi.cost_price_per_kg, p.cost_price_per_kg, 0))) ELSE 0 END), 0) AS weekly_profit,
        
        COALESCE(SUM(CASE WHEN YEAR(o.created_at) = YEAR(CURDATE()) AND MONTH(o.created_at) = MONTH(CURDATE()) THEN oi.subtotal ELSE 0 END), 0) AS monthly_revenue,
        COALESCE(SUM(CASE WHEN YEAR(o.created_at) = YEAR(CURDATE()) AND MONTH(o.created_at) = MONTH(CURDATE()) THEN (oi.subtotal - (oi.weight_kg * COALESCE(oi.cost_price_per_kg, p.cost_price_per_kg, 0))) ELSE 0 END), 0) AS monthly_profit,
        
        COALESCE(SUM(oi.subtotal - (oi.weight_kg * COALESCE(oi.cost_price_per_kg, p.cost_price_per_kg, 0))), 0) AS total_lifetime_profit
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      JOIN products p ON oi.product_id = p.id
      WHERE o.status = 'Delivered'
    `;

    const productQuery = `
      SELECT 
        p.id AS product_id,
        p.title AS product_name,
        p.category,
        COALESCE(SUM(oi.weight_kg), 0) AS total_kg_sold,
        COALESCE(SUM(oi.subtotal), 0) AS total_revenue,
        COALESCE(SUM(oi.subtotal - (oi.weight_kg * COALESCE(oi.cost_price_per_kg, p.cost_price_per_kg, 0))), 0) AS product_net_profit,
        
        COALESCE(SUM(CASE WHEN DATE(o.created_at) = CURDATE() THEN (oi.subtotal - (oi.weight_kg * COALESCE(oi.cost_price_per_kg, p.cost_price_per_kg, 0))) ELSE 0 END), 0) AS daily_profit,
        COALESCE(SUM(CASE WHEN YEARWEEK(o.created_at, 1) = YEARWEEK(CURDATE(), 1) THEN (oi.subtotal - (oi.weight_kg * COALESCE(oi.cost_price_per_kg, p.cost_price_per_kg, 0))) ELSE 0 END), 0) AS weekly_profit,
        COALESCE(SUM(CASE WHEN YEAR(o.created_at) = YEAR(CURDATE()) AND MONTH(o.created_at) = MONTH(CURDATE()) THEN (oi.subtotal - (oi.weight_kg * COALESCE(oi.cost_price_per_kg, p.cost_price_per_kg, 0))) ELSE 0 END), 0) AS monthly_profit
      FROM products p
      INNER JOIN order_items oi ON p.id = oi.product_id
      INNER JOIN orders o ON oi.order_id = o.id
      WHERE o.status = 'Delivered'
      GROUP BY p.id, p.title, p.category
      ORDER BY product_net_profit DESC
    `;

    const [[summary]] = await db.query(summaryQuery);
    const [products] = await db.query(productQuery);

    res.json({ summary: summary || {}, products: products || [] });
  } catch (err) {
    console.error('Profit Analytics Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});