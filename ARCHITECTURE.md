# LimitedEdition Architecture Guide

## 1) Recommended Folder Structure

### Client (React + Vite)
- `client/src/app/router` - Route tree and protected route composition
- `client/src/app/store` - Zustand stores for auth and cart state snapshots
- `client/src/components` - Reusable UI primitives and domain widgets
- `client/src/pages` - Route-level page composition
- `client/src/services` - Central API service layer (Axios wrappers)
- `client/src/hooks` - Shared route/auth hooks
- `client/src/utils` - Utility functions (stock logic, class helpers)
- `client/src/features` - Reserved feature modules for future extraction

### Server (Node + Express)
- `server/src/config` - Environment and database connection
- `server/src/models` - Mongoose schemas
- `server/src/services` - Business logic and inventory/cart correctness
- `server/src/controllers` - Thin HTTP layer
- `server/src/routes` - REST endpoint definitions
- `server/src/middlewares` - Auth, validation, upload, errors
- `server/src/validators` - Zod payload schemas
- `server/src/scripts` - Seed scripts
- `server/src/modules` - Reserved bounded contexts for scaling

## 2) Schema Relationships

- `User`
  - One user has one cart (`Cart.user` unique reference)
  - One user can create many inventory logs (`InventoryLog.actor`)
  - Roles: `admin`, `customer`

- `Collection`
  - One collection has many products (`Product.collection`)
  - `isActive` enables seasonal hide/deactivate workflows

- `Product`
  - Belongs to one collection
  - Contains many variants embedded as subdocuments
  - Variant structure:
    - size
    - color
    - sku
    - quantity
    - lowStockThreshold
  - Supports tags (`casual`, `essentials`, `office`, `weekend`, `luxury`, `minimal`, `bold`)

- `InventoryLog`
  - References product + variantId
  - Stores action (`add`, `reduce`, `adjust`) and quantity deltas
  - Audits actor and reason for all stock movement

- `Cart`
  - One per user
  - Items reference product and variantId with quantity
  - Stock is validated before insert/update

## 3) Route List

Base: `/api`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Collections
- `GET /collections` (public active collections)
- `GET /collections/admin/all` (admin)
- `POST /collections` (admin)
- `PUT /collections/:id` (admin)
- `DELETE /collections/:id` (admin)

### Products
- `GET /products` (public, filterable)
- `GET /products/:slug` (public)
- `GET /products/low-stock` (admin)
- `GET /products/admin/all` (admin)
- `POST /products` (admin)
- `PUT /products/:id` (admin)
- `PATCH /products/:id/deactivate` (admin)
- `POST /products/:id/image` (admin, multipart image upload)
- `DELETE /products/:id` (admin)

### Inventory
- `GET /inventory/summary` (admin)
- `GET /inventory/logs` (admin)
- `POST /inventory/adjust` (admin)

### Cart
- `GET /cart` (authenticated)
- `POST /cart/item` (authenticated)
- `DELETE /cart/item` (authenticated)

## 4) Implementation Order

1. Configure infrastructure and security middleware
2. Implement auth and role middleware
3. Model collections/products with variant inventory
4. Add inventory service with logs and transactional updates
5. Add cart stock validation guardrails
6. Build public storefront pages and product filters
7. Build admin dashboard and inventory controls
8. Add upload flow and image handling
9. Seed realistic fashion-first data
10. Run lint/build and finalize docs

## 5) Notes For Future Extensions

- Orders: introduce `Order`, `OrderItem`, stock reservation and checkout transaction boundaries
- Payments: encapsulate payment adapters in `modules/payments` (Stripe/Flutterwave/etc.)
- Wishlist: add `Wishlist` model with user-product variant references
- Notifications: low-stock email/webhook processors from `InventoryLog` events
- Analytics: event ingestion service for view/add-to-cart/collection interaction metrics
- Search: add indexed faceted search layer (Atlas Search or Elasticsearch)
- Caching: Redis for product listing and collection pages under traffic spikes
- Background jobs: queue-based workers for media processing and async notifications
