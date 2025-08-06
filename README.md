A Full Stack E-Commerce application built using the MERN stack (MongoDB, Express, React, Node.js) with Redux for global state management and Stripe for secure payment processing.
Website Link : https://shrifrontend.vercel.app/

Features
Product Catalog : Browse products with advanced search and filter capabilities by category, price, and ratings.
User Authentication & Profile Management : Secure registration and login. Profile editing, password updates, and order tracking dashboard.
Admin Dashboard : Manage products, users, and orders from a protected admin interface.
Stripe Payment Integration : Secure and reliable payment processing using Stripe Checkout.
Order Management System : Users can place and track orders. Admins can view, update, and process orders.

Tech Stack
Frontend: React, Redux, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Payments: Stripe API

Folder Struture : 
/client        -> React frontend with Redux store and Stripe integration
/server        -> Node.js backend with Express API routes
/models        -> Mongoose schemas for users, products, orders
/controllers   -> Backend logic for authentication, product/order/user handling
/routes        -> API endpoints for users, orders, products
