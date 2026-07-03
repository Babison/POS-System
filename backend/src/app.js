const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'POS Backend Running',
    version: '1.0.0'
  });
});

const auth = require(
  './middleware/auth.middleware'
);

app.get(
  '/api/protected',
  auth,
  (req, res) => {
    res.json({
      message:
        'You are authenticated',
      user: req.user
    });
  }
);

app.get(
  '/api/profile',
  auth,
  (req, res) => {
    res.json(req.user);
  }
);

const categoryRoutes =
  require('./routes/category.routes');

app.use(
  '/api/categories',
  categoryRoutes
);

const productRoutes =
  require('./routes/product.routes');

app.use(
  '/api/products',
  productRoutes
);
const inventoryRoutes =
  require('./routes/inventory.routes');

app.use(
  '/api/inventory',
  inventoryRoutes
);
const dashboardRoutes =
  require('./routes/dashboard.routes');

app.use(
  '/api/dashboard',
  dashboardRoutes
);
const customerRoutes =
  require('./routes/customer.routes');

app.use(
  '/api/customers',
  customerRoutes
);
const salesRoutes =
  require('./routes/sales.routes');

app.use(
  '/api/sales',
  salesRoutes
);




module.exports = app;