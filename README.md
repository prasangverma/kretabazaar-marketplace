# 🛍️ Kretabazaar — Full-Stack Dropshipping E-Commerce Platform

Kretabazaar is a high-converting, production-ready Full-Stack Dropshipping E-Commerce Platform built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, Prisma ORM, and Stripe API integrations.

## 🚀 Key Features

- **Database ORM (Prisma & SQLite/PostgreSQL)**: Data models for `User`, `Address`, `Product`, `ProductVariant`, `Category`, `Collection`, `Cart`, `CartItem`, `Order`, `OrderItem`, `Review`, and `DiscountCode`.
- **API Route Handlers**:
  - `GET /api/products`: Advanced category/price filtering, search, sorting, and pagination.
  - `GET /api/products/[id]`: Product details with variants and verified customer reviews.
  - `POST /api/cart` & `/api/cart/sync`: Persistent guest session token cart & account cart merging upon login.
  - `POST /api/checkout`: Stripe Checkout Session creation with dynamic line items & coupon calculations (`KRETA15`).
  - `POST /api/webhooks/stripe`: Secure webhook signature verification, order creation, inventory decrementing, and email trigger simulation.
  - `GET /api/orders`: Public logistics package tracking lookup API returning carrier info (FedEx, CJ Dropshipping) and milestone status.
  - `POST /api/reviews`: Product review submission with verified buyer validation.
- **Conversion UI/UX**:
  - Promotional hero banner with urgent flash sale countdown ticker (*05h:22m:41s*) and direct "Shop Now" CTAs.
  - Slide-over Cart Drawer with free shipping progress bar meter and coupon applicator.
  - Interactive live order tracking page (`/track-order`) displaying step-by-step delivery progress timelines.
  - Policy pages, payment gateway badges (**Stripe**, **PayPal**, **Razorpay**, **Cash on Delivery**), and VIP discount newsletter form.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **ORM & Database**: Prisma ORM with SQLite (`prisma/dev.db`) / PostgreSQL
- **Payments**: Stripe API SDK & Webhook verification
- **Validation**: Zod schema validation
- **State Management**: React Context API
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

## 🖥️ Local Setup & Seed Commands

```bash
export PATH=/home/prasang/node-v20/bin:$PATH

# 1. Sync Database Schema
npx prisma db push

# 2. Seed Database with Products & Sample Orders
npx tsx prisma/seed.ts

# 3. Start Next.js Development Server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
