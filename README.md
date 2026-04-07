# LimitedEdition Clothline Platform

A production-minded MERN stack clothline storefront focused on curated collections and inventory precision.

## Stack
- Frontend: React, Vite, Tailwind CSS, React Router, Zustand, React Hook Form, Zod, Axios, TanStack Query
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- Security: Helmet, CORS, rate limiting, request validation

## Quick Start
1. Install dependencies
   - `npm run install:all`
2. Configure environment files
   - Copy `server/.env.example` to `server/.env`
   - Copy `client/.env.example` to `client/.env`
3. Seed sample data
   - `npm run seed --prefix server`
4. Start apps
   - `npm run dev`

## URLs
- Client: http://localhost:5173
- API: http://localhost:5000/api

## Core Features
- Collection-first storefront
- Variant-level inventory tracking with low-stock and out-of-stock awareness
- JWT auth with role-based access
- Admin dashboard for products, collections, inventory movements
- Cart with stock-safe quantity validation
