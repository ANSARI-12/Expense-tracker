# Bellcorp Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Live Demo

- **Frontend**: [https://expense-tracker-frontend-9870.onrender.com](https://expense-tracker-frontend-9870.onrender.com)
- **Backend API**: [https://expense-tracker-backend-ekke.onrender.com](https://expense-tracker-backend-ekke.onrender.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## ✨ Features

- User authentication (Register/Login)
- Add, view, and manage expenses
- Transaction history with filtering
- Dashboard with expense analytics
- Responsive design

## 🛠 Tech Stack

### Frontend

- **React** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Router** - Navigation
- **CSS** - Styling

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📂 Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── middleware/
│   │   └── authMiddleware.js # JWT authentication
│   ├── models/
│   │   ├── TransactionModel.js
│   │   └── UserModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── transactionRoutes.js
│   ├── app.js              # Express app
│   ├── check-env.js        # Environment check
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js    # Axios configuration
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Explorer.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   └── *.css
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

```
bash
   cd bellcorp-expense-tracker

```

2. **Install Backend Dependencies**

```
bash
   cd backend
   npm install

```

3. **Install Frontend Dependencies**

```
bash
   cd frontend
   npm install

```

### Running the Application

#### Backend

```
bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

#### Frontend

```
bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | User login        |
| GET    | `/api/auth/profile`  | Get user profile  |

### Transactions

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/api/transactions`     | Get all transactions   |
| POST   | `/api/transactions`     | Create new transaction |
| PUT    | `/api/transactions/:id` | Update transaction     |
| DELETE | `/api/transactions/:id` | Delete transaction     |

## ⚙️ Environment Variables

### Backend (.env)

```
env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bellcorp-expense
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env)

```
env
VITE_API_URL=http://localhost:5000
```

## 🚢 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret
   - `PORT` - 5000
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Push code to GitHub
2. Import project in Vercel/Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Set environment variable:
   - `VITE_API_URL` - Your backend API URL
5. Deploy

## 📄 License

This project is licensed under the MIT License.
