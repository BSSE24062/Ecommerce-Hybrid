# Hybrid API Lab - Node.js + PostgreSQL + MongoDB

## Objective
This project demonstrates a hybrid backend architecture using:
- Node.js
- PostgreSQL
- MongoDB

Products are stored in PostgreSQL while reviews are stored in MongoDB.

A hybrid API endpoint combines data from both databases.

---

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- MongoDB
- Mongoose
- dotenv

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Run Server

```bash
npx nodemon server.js
```

---

## API Endpoints

### Create Product
POST `/api/products`

### Get Products
GET `/api/products`

### Create Review
POST `/api/reviews`

### Get Product Details
GET `/api/products/:id/details`

---

## Databases
- PostgreSQL → Products
- MongoDB → Reviews

---

## Author
Your Name
