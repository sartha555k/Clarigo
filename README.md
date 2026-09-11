# Clarigo Assignment

A full-stack web application with role-based access control, allowing users to log in, sign up, and manage users via an admin dashboard. 

## 🚀 Live Demo

- **Frontend (Deployed on Vercel):** [https://clarigo-flax.vercel.app/](https://clarigo-flax.vercel.app/)
- **Backend (Deployed on Render):** [https://clarigo.onrender.com](https://clarigo.onrender.com)

## 💻 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router Dom
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT), bcryptjs

## ⚙️ Features

- User Authentication (Signup & Login)
- Role-Based Access Control (Admin & User roles)
- JWT-based authorization 
- Admin Dashboard to view, add, edit, and delete users
- Protected routes

## 🛠️ How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas connection URI

### 1. Clone the repository
```bash
git clone https://github.com/sartha555k/Clarigo.git
cd Clarigo
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup Frontend
Open a new terminal window/tab:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
The frontend will run on `http://localhost:5173` and the backend will run on `http://localhost:5000`.
