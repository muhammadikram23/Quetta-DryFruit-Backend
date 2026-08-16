# 🛒 Quetta Dry Fruits — Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-REST%20API-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Railway-Database%20Hosting-0B0D0E?style=for-the-badge&logo=railway&logoColor=white" alt="Railway" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/API-RESTful-FF6F00?style=flat-square" alt="REST API" />
  <img src="https://img.shields.io/badge/Architecture-Serverless-5E5CE6?style=flat-square" alt="Serverless" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Project Status" />
  <img src="https://img.shields.io/badge/Project-Educational-blue?style=flat-square" alt="Educational Project" />
</p>

<p align="center">
  <strong>Production-deployed RESTful backend API for the Quetta Dry Fruits e-commerce platform.</strong>
</p>

<p align="center">
  Built with Node.js, Express.js, and MySQL • Hosted on Vercel • Powered by Railway MySQL
</p>

<p align="center">
  <a href="https://quetta-dry-fruit-backend.vercel.app">
    <img src="https://img.shields.io/badge/🚀_Live_API-Visit%20Deployment-000000?style=for-the-badge" alt="Live API" />
  </a>
  <a href="https://github.com/muhammadikram23/Quetta-DryFruit-Backend">
    <img src="https://img.shields.io/badge/💻_GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
</p>

---

## 📚 Table of Contents

- [📖 About The Project](#-about-the-project)
- [🎯 Project Goals](#-project-goals)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ System Architecture](#️-system-architecture)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [📡 API Endpoints](#-api-endpoints)
- [🔄 REST API Design](#-rest-api-design)
- [☁️ Deployment](#️-deployment)
- [🗄️ Railway MySQL](#️-railway-mysql)
- [🌐 Live Deployment](#-live-deployment)
- [🔗 Frontend Integration](#-frontend-integration)
- [🌍 CORS Configuration](#-cors-configuration)
- [🔒 Security Considerations](#-security-considerations)
- [🧪 API Testing](#-api-testing)
- [📈 Future Improvements](#-future-improvements)
- [🤝 Contributing](#-contributing)
- [👨‍💻 About the Developer](#-about-the-developer)
- [🎓 Educational Project & License](#-educational-project--license)
- [⭐ Project Highlights](#-project-highlights)

## 📖 About The Project

**Quetta Dry Fruits Backend** is the backend component of a full-stack e-commerce application developed for managing and selling dry-fruit products.

The application provides a **RESTful API** that handles product management, inventory operations, customer orders, and database communication. It is designed to serve as the server-side layer between a modern frontend application and a relational MySQL database.

The backend is built using **Node.js and Express.js**, uses **MySQL** for persistent data storage, and is deployed on **Vercel** with a hosted **Railway MySQL** database.

### 🎯 Project Goals

The primary goals of this project are to demonstrate practical implementation of:

* RESTful API development
* Backend architecture using Node.js and Express.js
* Relational database integration using MySQL
* CRUD operations
* Server-side application development
* Environment-based configuration
* Cloud database integration
* Serverless deployment
* Frontend-backend communication
* Full-stack application architecture

---

## ✨ Key Features

### 🛍️ Product Management

* Retrieve all products
* Retrieve individual products
* Create new products
* Update product information
* Delete products
* Manage inventory and stock information

### 📦 Order Management

* Create customer orders
* Retrieve order information
* Store purchase records
* Manage order-related data

### 🗄️ Database Management

* MySQL relational database
* `mysql2` database driver
* Connection pooling
* Railway-hosted production database
* Environment-based database configuration

### 🌐 RESTful API

* Standard HTTP methods
* JSON request and response format
* Structured API endpoints
* HTTP status codes
* CORS support
* Frontend integration ready

### ☁️ Cloud Deployment

* Deployed on Vercel
* Serverless backend architecture
* Railway MySQL database
* Production environment variables
* Publicly accessible API

---

# 🛠️ Tech Stack

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| 🟢 **Node.js**      | JavaScript runtime              |
| ⚡ **Express.js**    | Backend web framework           |
| 🐬 **MySQL**        | Relational database             |
| 🔌 **mysql2**       | MySQL database driver           |
| 🚀 **Vercel**       | Backend deployment              |
| 🚂 **Railway**      | MySQL database hosting          |
| 🌍 **CORS**         | Cross-origin API communication  |
| 🔐 **dotenv**       | Environment variable management |
| 🐙 **Git & GitHub** | Version control                 |

---

# 🏗️ System Architecture

```text
┌─────────────────────────────────────┐
│          Frontend Application       │
│          React / Next.js            │
└──────────────────┬──────────────────┘
                   │
                   │ HTTPS / REST API
                   ▼
┌─────────────────────────────────────┐
│              Vercel                 │
│                                     │
│        Express.js Backend           │
│        Serverless Functions         │
└──────────────────┬──────────────────┘
                   │
                   │ MySQL Connection
                   ▼
┌─────────────────────────────────────┐
│             Railway                 │
│                                     │
│          MySQL Database             │
│                                     │
│ Products • Orders • Inventory       │
└─────────────────────────────────────┘
```

### 🔄 Request Flow

```text
Client
  │
  ▼
HTTP Request
  │
  ▼
Express.js Route
  │
  ▼
Business Logic
  │
  ▼
MySQL Query
  │
  ▼
Railway MySQL
  │
  ▼
JSON Response
  │
  ▼
Client
```

---

# 📁 Project Structure

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

> The exact folder structure may vary depending on the current implementation of the repository.

---

# 🚀 Getting Started

## Prerequisites

Before running the project locally, make sure you have:

* **Node.js 18+**
* **npm 9+**
* **Git**
* **MySQL**

You can use:

* Local MySQL
* XAMPP
* MySQL Workbench
* Railway MySQL

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/muhammadikram23/Quetta-DryFruit-Backend.git

cd Quetta-DryFruit-Backend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

MYSQLHOST=your_database_host
MYSQLPORT=your_database_port
MYSQLUSER=your_database_user
MYSQLPASSWORD=your_database_password
MYSQLDATABASE=your_database_name
```

### ⚠️ Important

Never commit your `.env` file to GitHub.

Your `.gitignore` should contain:

```gitignore
.env
node_modules/
```

---

## 4️⃣ Start the Development Server

```bash
npm run dev
```

Or:

```bash
npm start
```

The local backend will run at:

```text
http://localhost:5000
```

---

# 🔐 Environment Variables

| Variable        | Description         | Example             |
| --------------- | ------------------- | ------------------- |
| `PORT`          | Backend server port | `5000`              |
| `MYSQLHOST`     | MySQL hostname      | `localhost`         |
| `MYSQLPORT`     | MySQL port          | `3306`              |
| `MYSQLUSER`     | MySQL username      | `root`              |
| `MYSQLPASSWORD` | MySQL password      | `********`          |
| `MYSQLDATABASE` | Database name       | `quetta_dry_fruits` |

For production, configure these values through the Vercel dashboard rather than committing credentials to the repository.

---

# 📡 API Endpoints

## 🛍️ Products

| Method   | Endpoint            | Description                 |
| -------- | ------------------- | --------------------------- |
| `GET`    | `/api/products`     | Retrieve all products       |
| `GET`    | `/api/products/:id` | Retrieve a specific product |
| `POST`   | `/api/products`     | Create a new product        |
| `PUT`    | `/api/products/:id` | Update an existing product  |
| `DELETE` | `/api/products/:id` | Delete a product            |

### Example

```http
GET /api/products
```

Example response:

```json
{
  "success": true,
  "products": []
}
```

---

## 📦 Orders

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| `GET`  | `/api/orders` | Retrieve customer orders |
| `POST` | `/api/orders` | Create a customer order  |

Example:

```http
POST /api/orders
Content-Type: application/json
```

```json
{
  "customerName": "Customer Name",
  "items": [],
  "totalAmount": 5000
}
```

---

# 🔄 REST API Design

The backend follows conventional REST principles:

| HTTP Method | Operation     |
| ----------- | ------------- |
| `GET`       | Retrieve data |
| `POST`      | Create data   |
| `PUT`       | Update data   |
| `DELETE`    | Delete data   |

All API responses are designed to use **JSON**, making the backend compatible with modern web and mobile clients.

---

# ☁️ Deployment

## 🚀 Vercel

The backend is deployed using **Vercel Serverless Infrastructure**.

A typical `vercel.json` configuration is:

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

### Deployment Process

1. Push the backend repository to GitHub.
2. Import the repository into Vercel.
3. Configure production environment variables.
4. Deploy the application.
5. Test the deployed API endpoints.

---

# 🗄️ Railway MySQL

The production database is hosted on **Railway MySQL**.

Production database credentials are supplied to Vercel through environment variables:

```env
MYSQLHOST=your_railway_host
MYSQLPORT=your_railway_port
MYSQLUSER=your_railway_user
MYSQLPASSWORD=your_railway_password
MYSQLDATABASE=your_railway_database
```

### 🔒 Security

Actual database credentials should **never** be placed inside the README or committed to GitHub.

---

# 🌐 Live Deployment

### 🚀 Production API

**https://quetta-dry-fruit-backend.vercel.app**

Example API request:

```text
https://quetta-dry-fruit-backend.vercel.app/api/products
```

---

# 🔗 Frontend Integration

The backend can be consumed by React, Next.js, or other frontend applications.

### Example using Fetch API

```javascript
const response = await fetch(
  "https://quetta-dry-fruit-backend.vercel.app/api/products"
);

const data = await response.json();

console.log(data);
```

This separation allows the frontend and backend to be independently developed, tested, deployed, and maintained.

---

# 🌍 CORS Configuration

The backend supports Cross-Origin Resource Sharing (CORS), allowing frontend applications hosted on different domains to communicate with the API.

A basic Express configuration is:

```javascript
const cors = require("cors");

app.use(cors());
```

For a production environment, CORS should preferably be restricted to trusted frontend domains:

```javascript
app.use(
  cors({
    origin: "https://your-frontend-domain.com"
  })
);
```

---

# 🔒 Security Considerations

For a production-grade deployment, the following security practices are recommended:

* 🔐 Keep database credentials in environment variables.
* 🚫 Never expose database credentials to the frontend.
* 🛡️ Validate incoming request data.
* 💉 Use parameterized SQL queries to prevent SQL injection.
* 🌐 Restrict CORS to trusted domains.
* 👤 Implement authentication for administrative operations.
* 🔑 Implement authorization and role-based access control.
* 🔒 Use HTTPS in production.
* 🚦 Implement API rate limiting.
* 📝 Add centralized error handling.
* 📊 Implement logging and monitoring.

---

# 🧪 API Testing

The API can be tested using:

* **Postman**
* **Insomnia**
* **Thunder Client**
* **cURL**
* Frontend applications

Example:

```bash
curl https://quetta-dry-fruit-backend.vercel.app/api/products
```

---

# 📈 Future Improvements

Potential future enhancements include:

* 🔐 JWT authentication
* 👤 Customer authentication
* 🛡️ Role-based authorization
* 🛒 Shopping cart APIs
* 💳 Payment gateway integration
* 📦 Advanced inventory management
* 📊 Admin dashboard
* 🔍 Product search and filtering
* 📄 API pagination
* 🧾 Order status management
* 📧 Email notifications
* 📚 Swagger / OpenAPI documentation
* 🧪 Automated testing
* 🚦 API rate limiting
* 📊 Production monitoring and logging

---

# 🤝 Contributing

Although this is primarily an educational project, contributions, suggestions, and improvements are welcome.

### Fork the repository

```bash
git clone https://github.com/muhammadikram23/Quetta-DryFruit-Backend.git

cd Quetta-DryFruit-Backend
```

### Create a feature branch

```bash
git checkout -b feature/your-feature
```

### Commit your changes

```bash
git add .

git commit -m "Add your feature"
```

### Push the branch

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 👨‍💻 About the Developer

### Muhammad Ikram

I am a **Computer Science student and aspiring Full-Stack Web Developer** with an interest in building practical web applications, RESTful APIs, database-driven systems, and modern software solutions.

This project represents my practical implementation of backend development concepts as part of a complete full-stack e-commerce application. Through this project, I worked with **Node.js, Express.js, REST APIs, MySQL, cloud database infrastructure, and Vercel deployment**.

### 🔗 Connect With Me

<p align="center">
  <a href="https://github.com/muhammadikram23">
    <img src="https://img.shields.io/badge/GitHub-muhammadikram23-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="YOUR_LINKEDIN_URL">
    <img src="https://img.shields.io/badge/LinkedIn-Muhammad%20Ikram-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</p>

### 📌 Project Links

| Resource | Link |
|---|---|
| 💻 GitHub Profile | [Muhammad Ikram](https://github.com/muhammadikram23) |
| 📦 Backend Repository | [Quetta Dry Fruits Backend](https://github.com/muhammadikram23/Quetta-DryFruit-Backend) |
| 🚀 Live Backend API | [Vercel Deployment](https://quetta-dry-fruit-backend.vercel.app) |
| 💼 LinkedIn | [Muhammad Ikram](www.linkedin.com/in/muhammad-ikram-085823350) |

# 🎓 Educational Project & License

This project is an **educational full-stack web development project**, specifically the **backend component** of the Quetta Dry Fruits e-commerce application.

It was developed as the **final project for the AI & Web Development program**, offered through **Balochistan Youth Empowerment — Digital Balochistan**, by the **Digital Transformation Awareness Network (DTAN)**.

The project was created for educational and practical learning purposes, with the objective of applying concepts and technologies related to:

* Full-stack web development
* Backend API development
* RESTful architecture
* Database management
* Cloud deployment
* Web application architecture
* AI & modern digital technologies

### 📄 License

This project is licensed under the **MIT License**.

The MIT License permits the use, modification, and distribution of this project subject to the terms and conditions defined in the `LICENSE` file.

**Educational Project — AI & Web Development Final Project**
**Balochistan Youth Empowerment — Digital Balochistan**
**Digital Transformation Awareness Network (DTAN)**

---

# ⭐ Project Highlights

```text
🛒 E-Commerce Backend
        │
        ├── Node.js
        ├── Express.js
        ├── RESTful APIs
        ├── MySQL
        ├── Railway
        └── Vercel
              │
              ▼
       Production Deployment
```

> **Quetta Dry Fruits Backend** demonstrates the practical implementation of a full-stack application's server-side architecture, from REST API development and relational database integration to cloud deployment.

<p align="center">
  <strong>Built for learning • Built for practice • Built for the future 🚀</strong>
</p>
