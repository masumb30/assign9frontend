# 💡 IdeaVault – Startup Idea Sharing Platform

IdeaVault is a modern, dynamic web application designed for entrepreneurs, creators, and innovators to share startup concepts, gather community feedback, and collaboratively validate business ideas. By replacing standard booking mechanisms with deep social interaction, IdeaVault serves as a crowdfunding space for thoughts, allowing users to discover trending innovation, refine project scopes, and build teams organically.

🌐 **[Live Application Link](https://assign9frontend.onrender.com)**  


---

## 🚀 Core Features

*   **Secure Authentication & Dual Identity Access:** Fully integrated email/password and Google OAuth workflows backed by stateless JSON Web Tokens (JWT). Private routes are strictly protected, keeping users securely authenticated even across hard page reloads.
*   **Complete CRUD Idea Pipeline:** Authenticated users can draft, publish, modify, and delete structural startup pitches complete with problem statements, proposed solutions, category filtering, target audience profiling, and budget estimates.
*   **Dynamic Context-Aware Comments System:** An interactive feedback mechanism allowing users to append, live-edit, and delete historical comments on idea profile pages, fostering real-time crowdsourced validation.
*   **Smart Query Engine (Search & Filter):** Features server-side case-insensitive `$regex` matching on idea titles alongside instant category-based drop-down filtering for fluid discovery in a 3-column responsive grid layout.
*   **Global Adaptive Theme Switching:** A comprehensive Light and Dark mode toggle built directly into the main navigation layout that gracefully propagates state changes across the entire interface.

---

## 🛠️ Tech Stack & Architecture

### Client Side
*   **Framework:**  Next.js (App Router)
*   **Styling & UI:** Tailwind CSS, DaisyUI / ShadCN Component Libraries
*   **State Management:** Zustand & TanStack Query (React Query)
*   **Animations:** Framer Motion (for staggered grid cards and banner carousels)
*   **Notifications:** React Hot Toast / Sonner (Zero native browser alerts utilized)

### Server Side
*   **Runtime Environment:** Node.js with Express.js
*   **Database:**  MongoDB 
*   **Security:** JSON Web Tokens (JWT) stored via HttpOnly cookies, bcryptjs for password hashing



