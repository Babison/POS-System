CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password TEXT NOT NULL,
    role_id INTEGER REFERENCES roles(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    barcode VARCHAR(100) UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    cost_price DECIMAL(10,2),
    selling_price DECIMAL(10,2),
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    unit VARCHAR(50),
    stock INTEGER DEFAULT 0,
    reorder_level INTEGER DEFAULT 0,
    weight_enabled BOOLEAN DEFAULT FALSE,
    image TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    loyalty_points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    gst_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id),
    invoice_number VARCHAR(100),
    total_amount DECIMAL(10,2),
    status VARCHAR(50),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE purchase_items (
    id SERIAL PRIMARY KEY,
    purchase_id INTEGER REFERENCES purchases(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    price DECIMAL(10,2)
);
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(100),
    customer_id INTEGER REFERENCES customers(id),
    cashier_id INTEGER REFERENCES users(id),
    subtotal DECIMAL(10,2),
    tax DECIMAL(10,2),
    discount DECIMAL(10,2),
    total DECIMAL(10,2),
    payment_method VARCHAR(50),
    payment_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE sale_items (
    id SERIAL PRIMARY KEY,
    sale_id INTEGER REFERENCES sales(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    price DECIMAL(10,2),
    tax DECIMAL(10,2),
    total DECIMAL(10,2)
);
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    sale_id INTEGER REFERENCES sales(id),
    amount DECIMAL(10,2),
    payment_method VARCHAR(50),
    transaction_reference VARCHAR(255),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE inventory_logs (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    old_stock INTEGER,
    new_stock INTEGER,
    change_quantity INTEGER,
    action VARCHAR(50),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(255),
    table_name VARCHAR(100),
    record_id INTEGER,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO roles (name, description)
VALUES
('Admin','Full Access'),
('Manager','Inventory and Reports'),
('Cashier','Billing Only');
INSERT INTO categories (name)
VALUES
('Electronics'),
('Groceries'),
('Beverages');
INSERT INTO users (
name,
email,
password,
role_id
)
VALUES (
'Admin',
'admin@example.com',
'admin123',
1
);
SELECT * FROM roles;
SELECT * FROM users;
SELECT * FROM categories;
