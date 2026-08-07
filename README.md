# ⚽ KickKart - Football Jersey Store

KickKart is a modern full-stack football jersey e-commerce platform where users can browse, purchase, and manage premium football jerseys. The application provides secure authentication, Google Sign-In, online payments, Cloudinary image storage, role-based authorization, and a responsive shopping experience.

---

# 🚀 Live Demo

### 🌐 Frontend
https://kickkartstore.netlify.app

### ⚙️ Backend API
https://kickkart-jersey-store-production.up.railway.app

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- Google OAuth2 Login
- JWT Authentication
- Forgot Password
- OTP Verification
- Password Reset
- Logout

---

## 🛍 User Features

- Browse Football Jerseys
- Search Products
- Filter Products
- Product Details
- Add to Cart
- Update Cart Quantity
- Remove from Cart
- Checkout
- Razorpay Payment Integration
- Order History
- Responsive UI

---

## 👨‍💼 Admin Features

- Admin Dashboard
- Add Products
- Update Products
- Delete Products
- Manage Orders
- Role-Based Access Control

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- React Icons
- Vite

---

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Google OAuth2
- Maven

---

## Database

- MySQL

---

## Cloud Services

- Cloudinary (Image Storage)
- Railway (Backend Hosting)
- Netlify (Frontend Hosting)

---

## Payment Gateway

- Razorpay

---

# 📂 Project Structure

```
KickKart-Jersey-Store
│
├── kickkart-frontend
│   ├── src
│   │
│   ├── assets
│   ├── components
│   ├── contexts
│   ├── pages
│   ├── routes
│   ├── layout
│   ├── admin
│   └── api
│
├── kickkart-backend
│   ├── config
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   ├── security
│   ├── service
│   └── util
│
└── README.md
```

---

# 🔐 Authentication Flow

### Local Authentication

- Register
- Login
- JWT Token Generation
- Protected Routes

### Google Authentication

- OAuth2 Login
- JWT Generation
- Automatic User Creation
- Secure Redirect

---

# ☁️ Image Storage

Product images are uploaded using **MultipartFile** and securely stored in **Cloudinary**.

### Benefits

- Cloud Storage
- Fast CDN Delivery
- Permanent Image URLs
- Automatic Image Optimization
- No Local File Storage
- Reliable Production Deployment

---

# 💳 Payment Integration

KickKart uses **Razorpay** for secure online payments.

Features

- Secure Checkout
- Online Payment
- Payment Verification
- Order Creation
- Payment Success Handling

---

# 📱 Responsive Design

Optimized for

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# 📸 Screenshots

Add screenshots here.

- Login Page
- Register Page
- Home Page
- Shop Page
- Product Details
- Cart
- Checkout
- Orders
- Admin Dashboard

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/shrxvx29/KickKart-Jersey-Store.git
```

---

## Frontend Setup

```bash
cd kickkart-frontend

npm install

npm run dev
```

---

## Backend Setup

```bash
cd kickkart-backend

./mvnw spring-boot:run
```

---

# 🌐 Environment Variables

## Frontend (.env)

```env
VITE_API_URL=https://kickkart-jersey-store-production.up.railway.app/api

VITE_RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY
```

---

## Backend (application.properties)

```properties
# Database

spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_DATABASE_USERNAME
spring.datasource.password=YOUR_DATABASE_PASSWORD

# JWT

jwt.secret=YOUR_SECRET_KEY

# Frontend

frontend.url=https://kickkartstore.netlify.app

# Google OAuth

spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET

# Cloudinary

cloudinary.cloud-name=YOUR_CLOUD_NAME
cloudinary.api-key=YOUR_API_KEY
cloudinary.api-secret=YOUR_API_SECRET

# Razorpay

razorpay.key=YOUR_RAZORPAY_KEY
razorpay.secret=YOUR_RAZORPAY_SECRET
```

---

# 📌 API Modules

### Authentication

- Register
- Login
- Google Login
- Forgot Password
- Verify OTP
- Reset Password

---

### Products

- Get Products
- Get Product Details
- Add Product
- Update Product
- Delete Product

---

### Cart

- Add Item
- Update Quantity
- Remove Item
- View Cart

---

### Orders

- Create Order
- View Orders
- Order Details

---

### Payments

- Create Razorpay Order
- Verify Payment

---

# 🚀 Future Enhancements

- Wishlist
- Product Reviews & Ratings
- Coupon & Discount System
- Inventory Management
- Sales Analytics Dashboard
- Order Tracking
- Email Notifications
- User Profile Management

---

# 👨‍💻 Developer

**Saravanan K**

Java Full Stack Developer

### Tech Skills

- Java
- Spring Boot
- Spring Security
- React.js
- Tailwind CSS
- MySQL
- JWT
- Google OAuth2
- Cloudinary
- Razorpay
- Railway
- Netlify
- Git & GitHub

### GitHub

https://github.com/shrxvx29

### LinkedIn

(Add your LinkedIn profile link here)

---

# ⭐ Support

If you found this project useful, consider giving it a **Star ⭐** on GitHub.

It helps others discover the project and motivates future improvements.

---

## 📄 License

This project is licensed under the **MIT License**.