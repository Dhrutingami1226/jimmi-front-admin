# Jimmi - Franchise Management System

A comprehensive web application for managing franchise stores, menu items, offers, and customer inquiries. This project includes a full-stack solution with a React-based admin dashboard, customer-facing frontend, and Express.js backend API.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure Details](#project-structure-details)

## 🎯 Project Overview

Jimmi is a full-stack franchise management platform that enables:
- **Franchise Owners**: Manage their store information, menus, offers, and inquiries
- **Admin Users**: Oversee all franchise operations, manage content, and monitor inquiries
- **Customers**: Browse stores, view menus, check offers, and submit franchise inquiries

## ✨ Features

### Admin Dashboard
- User authentication (Login, Register, Forgot Password)
- **Admin Management**
  - View and manage admin users
  - Role-based access control
- **Store Management**
  - Create, read, update, and delete store locations
  - Store search and filtering
  - Store location tracking
- **Content Management**
  - Menu item management with categories
  - Promotional offers management
  - Carousel/banner management
- **Inquiry Management**
  - Franchise inquiry processing
  - Inquiry status tracking
- **Dashboard Analytics**
  - Admin dashboard with key metrics

### Customer Frontend
- **Navigation & Exploration**
  - Responsive navigation bar
  - Interactive footer with links and information
- **Store Discovery**
  - Store locator with search functionality
  - Store listing and filtering
- **Menu & Offers**
  - Browse menu items by category
  - View current promotions and offers
- **Franchise Inquiry**
  - Submit franchise inquiry forms
  - Application tracking
- **Information Pages**
  - About page with company information
  - Carousel with featured content

## 🛠 Tech Stack

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: MongoDB (Mongoose) & MySQL (Sequelize)
- **Authentication**: JWT + bcrypt
- **Email**: Nodemailer
- **Validation**: Express-validator
- **Session Management**: express-session

### Frontend (Customer)
- **Framework**: React 19
- **Build Tool**: Vite
- **UI Framework**: React Bootstrap 5
- **Routing**: React Router v7
- **Icons**: React Icons
- **Styling**: Tailwind CSS, Bootstrap 5

### Admin Dashboard
- **Framework**: React 19
- **Build Tool**: Vite
- **UI Framework**: React Bootstrap 5
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Styling**: Tailwind CSS, Bootstrap 5

### Development Tools
- **Code Quality**: ESLint
- **Dev Server**: Vite, Nodemon
- **CSS Processing**: PostCSS, Autoprefixer

## 📁 Project Structure

```
jimmi/
├── backend/                 # Express.js API server
│   ├── Controller/         # Request handlers for all endpoints
│   ├── models/            # Sequelize/Mongoose data models
│   ├── routes/            # API route definitions
│   ├── config/            # Database configuration
│   ├── index.mjs          # Main server entry point
│   ├── seed.mjs           # Database seed script
│   └── package.json
│
├── frontend/              # Customer-facing React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── assets/        # Images and static files
│   │   ├── main.jsx       # App entry point
│   │   ├── App.jsx        # Main App component
│   │   └── *.jsx          # Page components (home, about, menu, etc.)
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── Admin/                 # Admin dashboard React application
│   ├── src/
│   │   ├── components/    # Admin UI components
│   │   ├── AdminPanel.jsx # Main admin layout
│   │   ├── main.jsx       # Entry point
│   │   ├── App.jsx        # App component
│   │   └── assets/
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── tailwind.config.js     # Root Tailwind configuration
└── README.md             # This file
```

## 📋 Prerequisites

- **Node.js** v16 or higher
- **npm** v7 or higher
- **MongoDB** (for database) - or configured MySQL
- **Git** (optional, for version control)

## 🚀 Installation

### 1. Clone or Download the Project
```bash
cd c:\Users\Admin\Desktop\jimmi
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Install Admin Dashboard Dependencies
```bash
cd ../Admin
npm install
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (MongoDB)
MONGODB_URI=mongodb://localhost:27017/jimmi

# OR for MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jimmi

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Session Configuration
SESSION_SECRET=your_session_secret
```

### Frontend Configuration

Both `frontend/` and `Admin/` directories include `vite.config.js` and `tailwind.config.js` files that should be pre-configured. You may need to update API endpoints if the backend runs on a different port.

In the components or environment configuration, update the API base URL:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 🎮 Running the Application

### Option 1: Run Each Part Separately

**Terminal 1 - Backend API:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Customer Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000 (or next available port)
```

**Terminal 3 - Admin Dashboard:**
```bash
cd Admin
npm run dev
# Runs on http://localhost:3001 (or next available port)
```

### Option 2: Build for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Admin:**
```bash
cd Admin
npm run build
npm run preview
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Available Endpoints

#### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `POST /api/forgotpass` - Password recovery

#### Store Management
- `GET /api/storelocator` - Get all stores
- `POST /api/storelocator` - Create new store
- `PUT /api/storelocator/:id` - Update store
- `DELETE /api/storelocator/:id` - Delete store

#### Menu Management
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

#### Offers Management
- `GET /api/offers` - Get all offers
- `POST /api/offers` - Create offer
- `PUT /api/offers/:id` - Update offer
- `DELETE /api/offers/:id` - Delete offer

#### Carousel Management
- `GET /api/carousel` - Get carousel items
- `POST /api/carousel` - Create carousel item
- `PUT /api/carousel/:id` - Update carousel item
- `DELETE /api/carousel/:id` - Delete carousel item

#### Franchise Inquiries
- `GET /api/franchise` - Get all inquiries
- `POST /api/franchise` - Submit inquiry
- `PUT /api/franchise/:id` - Update inquiry status

## 📁 Project Structure Details

### Backend Models
- **registermodel.js** - User registration data
- **franchisemodel.js** - Franchise store information
- **franchiseinquirymodel.js** - Inquiry submissions
- **menumodel.js** - Menu items
- **offermodel.js** - Promotional offers
- **carouselmodel.js** - Banner/carousel content
- **storelocatormodel.js** - Store location data

### Frontend Components
- **home.jsx** - Homepage with featured content
- **menu.jsx** - Menu browsing interface
- **carousel.jsx** - Featured items carousel
- **about.jsx** - About company page
- **storelocator.jsx** - Store search and locator
- **franchise.jsx & franchiseform.jsx** - Franchise inquiry
- **footer.jsx** - Footer component
- **nav.jsx** - Navigation bar

### Admin Components
- **AdminLogin.jsx** - Admin authentication
- **AdminDashboard.jsx** - Main dashboard
- **AdminsList.jsx** - Admin user management
- **StoreList.jsx & StoreForm.jsx** - Store management
- **MenuManager.jsx** - Menu editing
- **OffersManager.jsx** - Offers management
- **CarouselManager.jsx** - Carousel management
- **FranchiseInquiries.jsx** - Inquiry handling

## 🧪 Testing

To run linters and check code quality:

```bash
# Frontend
cd frontend
npm run lint

# Admin
cd Admin
npm run lint

# Backend (if ESLint configured)
cd backend
npm run lint
```

## 📝 Notes

- Ensure MongoDB or MySQL is running before starting the backend
- The admin dashboard is intended for internal management only
- Customer frontend should be public-facing
- CORS is configured for local development; adjust for production
- Use environment variables for sensitive information

## 📧 Support

For issues or questions, please refer to individual README.md files:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [Admin Dashboard README](./Admin/README.md)

## 📄 License

ISC License - See individual package.json files for details

---

**Happy coding! 🚀**
