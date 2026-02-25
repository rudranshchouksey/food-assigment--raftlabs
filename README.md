🍔 FoodFlow: Sr. Full Stack Order Management System
FoodFlow is a high-performance, real-time food delivery application built for the RaftLabs Senior Full Stack Developer Assessment. It features a Zomato-inspired user experience, automated order state transitions, and a robust TDD-backed architecture.

🚀 Live Demo & Repository
Hosted App: https://order-management-raftlabs.vercel.app/

Loom Walkthrough: [Insert Loom Video Link Here]

🛠️ Technical Stack
Frontend: Next.js 15 (App Router), Tailwind CSS, Lucide React, Sonner (Toasts).

State Management: Zustand with Persistence Middleware.

Backend: Next.js Route Handlers (REST API), Zod (Validation).

Database: Neon PostgreSQL with Prisma 7 ORM.

Testing: Vitest with JSDOM and React Testing Library.

📋 Mapping to Evaluation Criteria
1. Problem-Solving & Architecture
Decomposition: I broke the requirements into atomic tasks: Schema design, persistent state management, async background simulators, and reactive UI components.

Scalability: By utilizing Prisma 7 and Neon PostgreSQL, I ensured the system handles data with production-grade durability rather than volatile in-memory storage.

Next.js 15 Handling: I proactively managed the breaking change of asynchronous params in dynamic routes by unwrapping them with await in API handlers.

2. Code Quality & TDD
Test-Driven Development: Implemented a comprehensive Vitest suite covering CRUD operations, Zod input validation (e.g., 10-digit phone requirements), and cart state logic.

Maintainability: Adhered to clean code principles, using specialized components like OrderStatusStepper and decoupled utility functions for background simulations.

3. UI/UX Excellence
Zomato-Style UX: Designed a real-time order tracking page featuring a visual stepper and live status polling.

Micro-interactions: Implemented dynamic cart badges, slide-over drawers, and glassmorphism elements to provide a smooth, intuitive experience.

Large Dataset Handling: Seeded 50+ items to demonstrate UI performance and grid responsiveness at scale.

4. Robust Backend
Secure API: Structured endpoints with proper status codes (201 for creation, 404 for missing orders) and error handling.

Status Simulation: Engineered a non-blocking background function to transition orders through "Preparing", "Out for Delivery", and "Delivered" states.

5. Effective Use of AI
Efficiency: Leveraged AI for rapid data seeding and generating diverse menu items.

Debugging: Used AI tools to resolve complex environment resolution errors in Vitest and to navigate early-adoption hurdles with Next.js 15.

🏗️ Getting Started
Clone & Install:

Bash
git clone https://github.com/rudranshchouksey/food-assigment--raftlabs
npm install
Environment Setup:
Create a .env file with your DATABASE_URL (Neon PostgreSQL).

Database Migration & Seeding:

Bash
npx prisma migrate dev
npx prisma db seed
Run Application:

Bash
npm run dev
Run Tests:

Bash
npm run test
