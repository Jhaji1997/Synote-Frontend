# 🧠 Synote Frontend

This is the frontend for **Synote**, a note and task management app. It is built with **React**, **Redux Toolkit**, and **Tailwind CSS** and communicates with a Node.js backend. The app supports JWT-based authentication and AI-powered summarization via OpenRouter.

---

## 📁 Project Structure

```
client/
├── public/              # Static assets (e.g., avatars)
├── src/
│   ├── assets/          # Icons, images, avatars
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utility functions
│   ├── pages/           # Application routes and views
│   ├── services/        # API request handlers
│   ├── store/           # Redux slices and config
│   ├── App.jsx          # App root component
│   ├── index.css        # Tailwind CSS
│   └── main.jsx         # ReactDOM entry point
└── vite.config.js       # Vite config
```

---

## ✨ Features

* ✅ Responsive UI with Tailwind CSS
* ✅ JWT-based login, logout, token refresh
* ✅ View, create, edit, delete notes and tasks
* ✅ Subtask support for tasks
* ✅ Avatar picker component
* ✅ AI-powered summarization via backend
* ✅ Redux Toolkit for global state management
* ✅ React Router DOM for navigation
* ✅ Protected routes for authenticated access

---

## 🔐 Auth Flow

* Access & Refresh tokens handled via HTTP-only cookies
* Frontend uses `/me` endpoint to fetch current user
* Auto-refreshes tokens silently in the background

---

## 🔧 Setup & Running

```bash
cd client
npm install
npm run dev
```

---

### 🌐 ENV Configuration (`client/.env`)

```env
VITE_API_BASE_URL=your-api-endpoint-url
```

---

## ⚙️ Tech Stack

* **React** (Vite-powered)
* **Redux Toolkit** for state management
* **Tailwind CSS** for UI styling
* **React Router DOM** for routing
* **Axios** for API communication
* **Zod + React Hook Form** for validation
* **clsx** for conditional styling

---
