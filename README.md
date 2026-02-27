# Full-Stack E-Commerce Platform (MERN)

A scalable RESTful API with a responsive React frontend, built as part of the **Frontend Developer Intern** assignment. This project demonstrates secure authentication, role-based access control (RBAC), and full CRUD operations.

## 🚀 Key Features

### Backend (Primary Focus)
* **User Authentication**: Secure registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
* **Role-Based Access**: Specialized access levels for `User` and `Admin` roles.
* **Product Management (CRUD)**: Full suite of APIs to Create, Read, Update, and Delete products.
* **Scalable Architecture**: Modular project structure organized by Models, Controllers, and Routes for easy maintainability.

### Frontend (Supportive UI)
* **Modern Tech Stack**: Built with React.js and styled using **Tailwind CSS** for a professional look.
* **Dynamic Inventory**: A responsive product grid featuring compact hero sections and stock status badges.
* **Admin Dashboard**: A dedicated portal for authorized admins to manage inventory in real-time.
* **Protected Routes**: Security middleware to prevent unauthorized users from accessing admin-only pages.

## 🛠️ Tech Stack

* **Frontend**: React.js, Tailwind CSS, Axios, React Router.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB (NoSQL) with Mongoose ODM.
* **Security**: JWT for session handling and Bcrypt for data protection.

## 📂 Project Structure

```text
BASSINMENT/
├── Backend/           # Node.js & Express server
│   ├── config/        # Database connection
│   ├── controllers/   # Business logic
│   ├── middleware/    # Auth & Role verification
│   ├── models/        # Database schemas (User, Product, Order)
│   ├── routes/        # API Endpoints
│   └── server.js      # Entry point
└── Frontend/          # React application
    ├── src/
    │   ├── components/# Reusable UI (Navbar, ProtectedRoute)
    │   └── pages/     # Home, Login, Register, Admin Dashboard

⚙️ Installation and Setup Guide
Follow these steps to get the environment running on your local machine.
1. Clone the Project
git clone https://github.com/BalramCode/BackendAssignment
cd BackendAssignment

2. Backend Configuration
# Navigate to backend folder
cd Backend
# Install dependencies
npm install
# Create environment file
touch .env

Open .env and paste the following:
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/assignmentDB
JWT_SECRET=supersecretkey

Run the backend:
npm run dev

3. Frontend Configuration
# Open a new terminal and navigate to frontend folder
cd ../Frontend
# Install dependencies
npm install
# Run the frontend
npm run dev

