# 🛒 Quetta Dry Fruits — Backend API

A production-ready **RESTful backend API** for the Quetta Dry Fruits e-commerce platform, built with **Node.js, Express.js, and MySQL**. The application provides APIs for product management, inventory, orders, transactions, and administrative operations.

The backend is deployed on **Vercel Serverless Infrastructure** and uses a hosted **Railway MySQL database** for persistent data storage.

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Key Features](#-key-features)
* [Technology Stack](#-technology-stack)
* [System Architecture](#-system-architecture)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [API Endpoints](#-api-endpoints)
* [Deployment](#-deployment)
* [Live API](#-live-api)
* [CORS Configuration](#-cors-configuration)
* [Security Considerations](#-security-considerations)
* [Future Improvements](#-future-improvements)
* [License](#-license)

---

## 📖 Overview

**Quetta Dry Fruits Backend** is the server-side component of an e-commerce application designed for managing and selling dry-fruit products.

The backend follows a RESTful API architecture and separates application logic from the frontend. It communicates with a MySQL database to provide persistent storage for products, inventory, orders, and transaction-related information.

The API is designed to integrate with modern frontend applications such as **React** or **Next.js**.

---

## ✨ Key Features

### 🛍️ Product Management

* Retrieve all available products
* Retrieve individual products by ID
* Create new products
* Update existing product information
* Delete products
* Manage product inventory and stock information

### 📦 Order Management

* Create customer orders
* Retrieve order information
* Track customer purchases
* Maintain order-related database records

### 👨‍💼 Administrative Operations

* Dedicated endpoints for administrative product and inventory operations
* Backend-ready structure for authentication and authorization
* Separation between public and administrative API operations

### 🗄️ Database Integration

* MySQL relational database
* `mysql2` driver
* Connection pooling
* Railway-hosted database
* Environment-based database configuration

### 🌐 API & CORS

* RESTful API architecture
* JSON request and response handling
* CORS configuration for frontend integration
* HTTP status codes for API responses

### ☁️ Serverless Deployment

* Deployed using Vercel
* Express.js application configured for serverless execution
* Environment variables managed through Vercel
* Railway used for hosted MySQL persistence

---

## 🛠️ Technology Stack

| Technology       | Purpose                            |
| ---------------- | ---------------------------------- |
| **Node.js**      | JavaScript runtime                 |
| **Express.js**   | REST API framework                 |
| **MySQL**        | Relational database                |
| **mysql2**       | MySQL database driver              |
| **Vercel**       | Backend/serverless deployment      |
| **Railway**      | Hosted MySQL database              |
| **CORS**         | Cross-origin request handling      |
| **dotenv**       | Environment variable management    |
| **Git & GitHub** | Version control and source hosting |

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────────┐
                    │      Frontend App         │
                    │    React / Next.js        │
                    └────────────┬─────────────┘
                                 │
                                 │ HTTPS / REST API
                                 ▼
                    ┌──────────────────────────┐
                    │      Vercel Hosting       │
                    │                          │
                    │   Express.js Backend     │
                    │   Serverless Functions   │
                    └────────────┬─────────────┘
                                 │
                                 │ MySQL Connection
                                 ▼
                    ┌──────────────────────────┐
                    │    Railway MySQL DB      │
                    │                          │
                    │ Products • Orders • Data │
                    └──────────────────────────┘
```

### Request Flow

```text
Client Request
      ↓
Express.js Route
      ↓
Controller / Business Logic
      ↓
MySQL Query
      ↓
Railway MySQL Database
      ↓
JSON Response
      ↓
Frontend
```

---

## 📁 Project Structure

A typical project structure is organized as follows:

```text
Quetta-DryFruit-Backend/
│
├── server.js
├── package.json
├── package-lock.json
├── vercel.json
├── .env
├── .env.example
├── .gitignore
│
├── routes/
│   ├── products.js
│   └── orders.js
│
├── controllers/
│   ├── productController.js
│   └── orderController.js
│
├── config/
│   └── database.js
│
└── README.md
```

> The exact structure may vary depending on the current implementation of the repository.

---

# 🚀 Getting Started

Follow the steps below to run the backend locally.

## Prerequisites

Make sure the following software is installed:

* **Node.js 18+**
* **npm 9+**
* **Git**
* MySQL database

You can use either:

* Local MySQL
* XAMPP
* MySQL Workbench
* Railway MySQL

---

## 1. Clone the Repository

```bash
git clone https://github.com/muhammadikram23/Quetta-DryFruit-Backend.git
```

Navigate into the project:

```bash
cd Quetta-DryFruit-Backend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MYSQLHOST=your_database_host
MYSQLPORT=your_database_port
MYSQLUSER=your_database_user
MYSQLPASSWORD=your_database_password
MYSQLDATABASE=your_database_name
```

> **Important:** Never commit your `.env` file or database credentials to GitHub.

Add `.env` to `.gitignore`:

```gitignore
.env
node_modules/
```

---

## 4. Start the Development Server

If the project provides a development script:

```bash
npm run dev
```

Or:

```bash
npm start
```

The local API will be available at:

```text
http://localhost:5000
```

---

# 🔐 Environment Variables

The backend uses environment variables to keep configuration and credentials outside the source code.

| Variable        | Description           | Example     |
| --------------- | --------------------- | ----------- |
| `PORT`          | Application port      | `5000`      |
| `MYSQLHOST`     | MySQL server hostname | `localhost` |
| `MYSQLPORT`     | MySQL server port     | `3306`      |
| `MYSQLUSER`     | MySQL username        | `root`      |
| `MYSQLPASSWORD` | MySQL password        | `********`  |
| `MYSQLDATABASE` | Database name         | `railway`   |

### Example

```env
PORT=5000

MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=your_password
MYSQLDATABASE=quetta_dry_fruits
```

For production, these values should be configured through the **Vercel Project Settings → Environment Variables** section rather than committed to the repository.

---

# 📡 API Endpoints

The following endpoints represent the backend API structure.

## 🛍️ Products API

| Method   | Endpoint            | Description                 |
| -------- | ------------------- | --------------------------- |
| `GET`    | `/api/products`     | Retrieve all products       |
| `GET`    | `/api/products/:id` | Retrieve a specific product |
| `POST`   | `/api/products`     | Create a new product        |
| `PUT`    | `/api/products/:id` | Update an existing product  |
| `DELETE` | `/api/products/:id` | Delete a product            |

### Example Request

```http
GET /api/products
```

### Example Response

```json
{
  "success": true,
  "products": []
}
```

---

## 📦 Orders API

| Method | Endpoint      | Description                 |
| ------ | ------------- | --------------------------- |
| `GET`  | `/api/orders` | Retrieve customer orders    |
| `POST` | `/api/orders` | Create a new customer order |

### Example Request

```http
POST /api/orders
Content-Type: application/json
```

Example request body:

```json
{
  "customerName": "Customer Name",
  "items": [],
  "totalAmount": 5000
}
```

---

# 🔄 REST API Architecture

The backend follows standard HTTP methods:

| HTTP Method | Purpose            |
| ----------- | ------------------ |
| `GET`       | Retrieve resources |
| `POST`      | Create resources   |
| `PUT`       | Update resources   |
| `DELETE`    | Delete resources   |

API responses are returned in **JSON format**, allowing the backend to communicate easily with web and mobile clients.

---

# ☁️ Deployment

## Vercel Deployment

The backend is deployed on **Vercel**.

A typical Vercel configuration can be defined using `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### Deployment Steps

1. Push the backend repository to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the project.
5. Verify the production API endpoints.

---

## 🗄️ Railway MySQL Configuration

The production database is hosted using Railway.

Vercel environment variables should contain the Railway database connection information:

```env
MYSQLHOST=your_railway_host
MYSQLPORT=your_railway_port
MYSQLUSER=your_railway_user
MYSQLPASSWORD=your_railway_password
MYSQLDATABASE=your_railway_database
```

### ⚠️ Security Note

Never publish actual database credentials inside:

* `README.md`
* GitHub source code
* Screenshots
* Public documentation
* Frontend JavaScript

Only environment variable **names** should be documented publicly.

---

# 🌐 Live API

The production backend is deployed at:

**https://quetta-dry-fruit-backend.vercel.app**

Example:

```text
https://quetta-dry-fruit-backend.vercel.app/api/products
```

The live API can be consumed by the project's frontend or any HTTP client capable of making REST requests.

---

# 🔗 Frontend Integration

The backend can be consumed from a React or Next.js application using `fetch()` or libraries such as Axios.

Example:

```javascript
const response = await fetch(
  "https://quetta-dry-fruit-backend.vercel.app/api/products"
);

const data = await response.json();

console.log(data);
```

This architecture keeps the frontend and backend independently deployable while allowing them to communicate through HTTP-based REST APIs.

---

# 🌍 CORS Configuration

Cross-Origin Resource Sharing is configured to allow the frontend application to communicate with the backend API from a different origin.

A typical Express configuration is:

```javascript
const cors = require("cors");

app.use(cors());
```

For production applications, CORS should ideally be restricted to trusted frontend origins:

```javascript
app.use(
  cors({
    origin: "https://your-frontend-domain.com"
  })
);
```

---

# 🔒 Security Considerations

The following practices are recommended for production:

* Store credentials in environment variables.
* Never expose MySQL credentials to the frontend.
* Never commit `.env` files.
* Validate incoming request data.
* Use parameterized SQL queries to prevent SQL injection.
* Restrict CORS to trusted origins.
* Implement authentication for administrative endpoints.
* Implement authorization and role-based access control.
* Use HTTPS in production.
* Add centralized error handling.
* Apply rate limiting to public APIs where appropriate.

---

# 📈 Future Improvements

Potential improvements for future versions include:

* 🔐 JWT-based authentication
* 👤 Customer account management
* 🛡️ Role-based authorization
* 🛒 Shopping cart API
* 💳 Payment gateway integration
* 📦 Advanced inventory management
* 📊 Admin dashboard APIs
* 🔍 Product search and filtering
* 📄 Pagination for large datasets
* 🧾 Order status tracking
* 📧 Email notifications
* 📝 API documentation with Swagger/OpenAPI
* 🚦 API rate limiting
* 🧪 Automated unit and integration testing
* 📋 Request validation using a validation library
* 📊 Production logging and monitoring

---

# 🧪 Testing the API

You can test the API using tools such as:

* Postman
* Insomnia
* Thunder Client
* cURL
* Frontend applications

Example:

```bash
curl https://quetta-dry-fruit-backend.vercel.app/api/products
```

---

# 🤝 Contributing

Contributions and improvements are welcome.

To contribute:

```bash
git clone https://github.com/muhammadikram23/Quetta-DryFruit-Backend.git
cd Quetta-DryFruit-Backend
npm install
```

Create a feature branch:

```bash
git checkout -b feature/your-feature
```

Commit your changes:

```bash
git add .
git commit -m "Add your feature"
```

Push the branch:

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 👨‍💻 Author

**Muhammad Ikram**

GitHub:
https://github.com/muhammadikram23

---

# 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file in the repository for complete license information.

---

## ⭐ Project Summary

**Quetta Dry Fruits Backend** demonstrates the development and deployment of a production-oriented REST API using:

```text
Node.js
   ↓
Express.js
   ↓
RESTful API
   ↓
MySQL
   ↓
Railway
   ↓
Vercel
```

The project provides a scalable foundation for an e-commerce platform while maintaining a clear separation between the **frontend, backend API, and database layers**.

If you find this project useful, consider giving the repository a ⭐ on GitHub.
