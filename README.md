# Food Delivery Web Application

A full-stack **MERN (MongoDB, Express, React, Node.js)** based food ordering platform that enables users to browse restaurants, manage carts, and place orders seamlessly. The system includes secure authentication, role-based access control, and an admin dashboard for managing menus and orders.


# Live Demo 
https://food-delivery-7phs.vercel.app/


# Features

# User Functionality
- User registration & login using JWT authentication  
- Browse restaurants and menu items  
- Add/remove items from cart  
- Place orders securely  
- Track order status  

# Admin Functionality
- Add, update, and delete food items  
- Manage restaurant listings  
- Update order status  
- Protected admin routes  

# Payment Integration (Stripe)

- Secure payment processing using **Stripe API**
- Server-side payment intent creation
- Payment confirmation & verification
- Secure handling of transaction data
- Environment-based Stripe key configuration


# Tech Stack

# Frontend
- React.js  
- Tailwind CSS  
- Axios  

# Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  
- bcrypt (Password Hashing)  
- Stripe API


# Security Implementation
- Passwords hashed using bcrypt  
- JWT-based authentication system  
- Middleware-protected routes  
- Role-based access control (User/Admin)  



# Project Structure

food-delivery/

├── frontend/

├── backend/

├── .env

└── README.md



# Installation

# 1️ Clone Repository


git clone https://github.com/your-username/food-delivery-website.git

cd food-delivery-website

# 2️ Setup Backend


cd backend
npm install
npm run dev


# 3️ Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# 4 Setup Frontend


cd frontend
npm install
npm start



# 👨‍💻 Author

Parth Jagad

GitHub: https://github.com/parthjagad09

LinkedIn: https://www.linkedin.com/in/parth-jagad-97664725b/