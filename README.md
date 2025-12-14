# 🍬 Sweet Shop Management System

A modern, full-stack application for managing a Sweet Shop inventory, built with **React**, **Node.js**, **Express**, and **MongoDB**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/stack-MERN-green.svg)

[**🚀 Live Demo**](https://sweetshop-three.vercel.app)

## ✨ Features

- **Storefront**: Browse sweets, search, filter, and purchase.
- **Authentication**: Secure User Registration and Login (JWT).
- **Admin Panel**: Manage inventory (Add, Edit, Delete, Restock Sweets).
- **Inventory Tracking**: Real-time stock updates upon purchase.
- **Responsive Design**: Beautiful UI built with TailwindCSS.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TypeScript, TailwindCSS, Framer Motion, Axios.
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose).
- **Testing**: Jest, Supertest.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB Connection String

### Installation

1.  **Clone the repository**
2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    # Create .env file with MONGO_URI, JWT_SECRET, PORT=5001
    npm run dev
    ```
3.  **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    # Create .env file if deploying (VITE_API_URL)
    npm run dev
    ```

## 🧪 Testing

Run backend integration tests:
```bash
cd backend
npm test
```

## 👤 Demo Credentials

To test the **Admin** features (Inventory Management), use the following credentials:

| Role  | Username | Password |
| :---: | :------- | :------- |
| **Admin** | `ishan` | `1234` |

*Note: You may need to register this user first if the database is empty, or manually set `isAdmin: true` in the database if using a fresh install.*

## 📂 Project Structure

- `/backend`: API and Database logic.
- `/frontend`: React SPA.

## 📄 License

This project is licensed under the MIT License.
