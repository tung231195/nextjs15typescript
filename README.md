# E-Commerce & Blog Platform

> Full-featured E-commerce website with Blog functionality including real-time likes and comments via WebSocket, built with TypeScript and MUI.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Run](#setup--run)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## Overview

This project is a **full-stack E-commerce platform** with an integrated blog.
It includes standard e-commerce features (product listing, cart, checkout) and a blog system where users can **like and comment in real-time** using WebSocket.

Purpose:

- Provide a complete e-commerce solution for online shopping.
- Include a blog section to engage users with interactive content.

---

## Features

### E-Commerce

- Product listing with categories and filters
- Product details page
- Shopping cart & checkout
- User authentication (signup/login)
- Order management
- Admin dashboard for managing products, orders, users,blogs, dashboards, customers, payments, shippings

### Blog

- Create, edit, delete posts (admin)
- View posts (users)
- Real-time likes and comments using **Socket.io**
- Comment replies and notifications

### Other

- Responsive UI with **Material-UI (MUI)**
- Secure user authentication (JWT)
- Error handling & validations
- Written entirely in **TypeScript**

---

## Tech Stack

- Frontend: **React.js + TypeScript + MUI**
- Backend: **Node.js + Express.js + TypeScript + Socket.io**
- Database: **MongoDB**
- Authentication: **JWT**
- Tools: Git, Docker, VSCode
- Deployment: Optional Vercel / Render for frontend, Heroku / Docker for backend

---

## Setup & Run

Follow these steps to run the project locally:

```bash
# Clone the repo
git clone https://github.com/tung231195/nextjs15typescript.git
cd nextjs15typescript

# Install backend dependencies
cd backend
npm install

# Start backend server
npm run dev

# Install frontend dependencies
cd ../frontend
npm install

# Start frontend server
npm start
```

### Database Setup

- MongoDB connection string: add `.env` file in `backend/` with:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

- Optional: run seed script for sample products and blog posts:

```bash
npm run seed
```

---

## Usage

- Access the website: `http://localhost:3000`
- Create a user account and login
- Browse products, add to cart, checkout
- Visit blog section, like and comment on posts in real-time

---

## Screenshots

_Add screenshots of key pages (optional but recommended)_

- Home page: ![Home](./screenshots/home.png)
- Product page: ![Product](./screenshots/product.png)
- Blog page with live comments: ![Blog](./screenshots/blog.png)

---

## Contributing

- Contributions are welcome!
- Please fork the repo, make changes, and create a pull request.

---

## Contact

- Kenny Danh – [Email](mailto:kennydanh11195@gmail.com)
