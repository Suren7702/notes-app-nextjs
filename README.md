# 📝 CloudSync Notes App

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

A full-stack, secure, and responsive notes application built to demonstrate modern web development practices. Features secure authentication, real-time database synchronization, and a glassmorphism UI.

## 🚀 Live Demo
**Frontend (Vercel):** https://notes-app-alpha-black.vercel.app/
**Backend API (Render):** https://notes-app-nextjs.onrender.com

---

## ✨ Key Features

### 🔒 Security & Authentication
- **JWT Authentication:** Stateless, secure login and registration system.
- **Password Encryption:** User passwords hashed using `bcryptjs` before storage.
- **Protected Routes:** Middleware ensures only authenticated users can access private data.

### 🎨 UI/UX & Design
- **Modern Glassmorphism:** Custom CSS styling with frosted glass effects.
- **Responsive Layout:** Fully optimized for Desktop, Tablet, and Mobile devices.
- **Animations:** Smooth transitions using CSS keyframes for entry, hover, and modals.

### ⚙️ Functionality
- **Full CRUD:** Create, Read, Update, and Delete notes instantly.
- **Smart Search:** Real-time filtering of notes by title or content.
- **Profile Management:** Users can upload and update profile photos (compressed & stored via Base64).
- **Data Persistence:** All data is stored securely in MongoDB Atlas.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js, React, CSS Modules, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (NoSQL) |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 📸 Screenshots

*(Add your screenshots here. You can drag and drop images into the GitHub editor)*

| Login Page | Dashboard |
| :---: | :---: |
| ![Login](https://via.placeholder.com/400x200?text=Login+Page+Screenshot) | ![Dashboard](https://via.placeholder.com/400x200?text=Dashboard+Screenshot) |

---

## 💻 Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/Suren7702/notes-app-nextjs.git](https://github.com/Suren7702/notes-app-nextjs.git)
cd notes-app-nextjs
