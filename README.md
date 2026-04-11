# 🌍 WanderLust – Vacation Rental Web App

WanderLust is a full-stack Vacation Rental Web Application that allows users to explore, create, and manage property listings.

The platform is designed with a strong focus on backend architecture, secure authentication, and scalable real-world deployment.

---

## 🚀 Live Demo

👉 https://your-render-link.onrender.com

---

## ✨ Key Features

### 🔐 Authentication & Security

* User authentication using Passport.js
* Password hashing with bcrypt
* Session management with express-session
* MongoDB session store using connect-mongo
* Protected routes & authorization

### 🏡 Listings Management

* Full CRUD operations for property listings
* Image upload & storage using Cloudinary
* Clean card-based UI
* Responsive layout for all devices

### ⭐ Reviews & Ratings

* Add reviews with star rating system
* Delete only own reviews (authorization)
* One-to-many relationship (Listings → Reviews)

### ⚡ Backend & Architecture

* MVC architecture
* RESTful API design
* Centralized error handling
* Async error wrapper (wrapAsync)

### 🛡 Validation

* Schema validation using Joi
* Server-side validation for listings & reviews

### 💬 Flash Messages

* Success & error alerts using connect-flash

### 📱 Responsive UI

* Mobile-first design
* Horizontal scroll filters
* Optimized layouts for different screen sizes

---

## 🛠 Tech Stack

### 🔧 Backend

* Node.js
* Express.js
* MongoDB Atlas

### 🎨 Frontend

* EJS (Server-side rendering)
* Bootstrap 5
* Custom CSS

### 🔐 Authentication & Sessions

* Passport.js
* express-session
* connect-mongo

### ☁️ Cloud & Deployment

* Render (Backend Hosting)
* Cloudinary (Image Storage)

### 🛡 Validation

* Joi

---

## 🧠 Concepts Implemented

* MVC Architecture
* RESTful APIs
* Authentication & Authorization
* Middleware (custom & third-party)
* Session handling
* MongoDB relationships
* Cloud storage integration
* Server-side validation
* Global error handling

---

## 📂 Folder Structure
📁 models/ → Mongoose schemas
📁 routes/ → Express routes
📁 controllers/ → Business logic
📁 middleware/ → Auth & validation middleware
📁 views/ → EJS templates
📁 public/ → CSS, JS, assets
📁 utils/ → Custom error & async wrapper
📁 assets/ → Project screenshots

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
npm install

Create .env file:

ATLASDB_URL=your_mongodb_atlas_url
SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret

Run project:

npm start
📸 Screenshots

(Add your screenshots here 👇)

![Home](./assets/screenshots/home.png)
![Create](./assets/screenshots/create.png)
![Signup](./assets/screenshots/signup.png)
![Reviews](./assets/screenshots/reviews.png)
🎯 Project Purpose

This project was built to:

Strengthen backend development skills
Understand real-world application architecture
Implement secure authentication systems
Work with cloud services like MongoDB Atlas & Cloudinary
Prepare for backend/full-stack interviews

🚧 Current Status

🟢 Actively improving UI and performance
🟢 Enhancing scalability and user experience

🛣 Upcoming Features
🔍 Advanced search & filtering
📄 Pagination
❤️ Wishlist system
🗺 Map integration (Mapbox)
⚡ Performance optimization
👨‍💻 Author

Ravikant
📍 Haryana, India

⭐ Support

If you like this project, give it a ⭐ on GitHub!
