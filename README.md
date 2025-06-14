# 🎬 MERN Movies App

A full-stack Movie Management application built using the **MERN stack (MongoDB, Express, React, Node.js)**. This app allows users to register, log in, explore movie listings, filter/sort them, and lets admins manage genres, upload posters, and add/edit/delete movies.

---

## 🚀 Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, RTK Query, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer, JWT Auth, Cookie Parser
- **State Management:** Redux Toolkit, RTK Query
- **Authentication:** JWT-based Auth with Cookies
- **Image Uploads:** Multer
- **Styling:** Tailwind CSS

---

## 🧩 Features

### 👥 Users

- User Registration & Login
- View all movies with filters & search
- View individual movie details

### 🔐 Admin

- Add / Edit / Delete Genres
- Upload Poster Images
- Create / Update / Delete Movies

### 📱 Responsive

- Mobile and desktop optimized layouts
- Responsive Movie Cards, Sliders, and Dashboard

---

## 📁 Folder Structure

/my-movies
├── backend
│   ├── config/             # MongoDB connection
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth, error handling
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── uploads/            # Image uploads (auto-created)
│   └── index.js            # Main server file
├── frontend
│   ├── src/                # React + Vite project
│   └── vite.config.js
├── .env                    # Environment variables
├── package.json            # Root scripts & dependencies

---

## 🧑‍💻 How to Run Locally

> Prerequisites:

> - Node.js installed
> - MongoDB installed and running locally

### 1. Clone the Repository

git clone https://github.com/abhijitmanna912001/MERN-Movies-App.git
cd MERN-Movies-App

### 2. Install Dependencies

```bash
npm install
```

This installs both backend and root-level dependencies.

### 3. Create `.env` File in Root

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/moviesApp
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

> 🔐 Make sure MongoDB is running locally before starting the app.

### 4. Run Fullstack App

npm run fullstack

This starts:

- Express backend (`localhost:3000`)
- Vite frontend (`localhost:5173`)

---

## 🛠 Available Commands

```json
"scripts": {
  "fullstack": "concurrently \"npm run backend\" \"npm run frontend\"",
  "backend": "nodemon backend/index.js",
  "frontend": "cd frontend && npm run dev",
  "start": "node backend/index.js",
  "build": "cd frontend && npm install && npm run build"
}
```

---

## 📝 Notes

- The `uploads/` folder is ignored in version control via `.gitignore` and is dynamically created at runtime.
- Image uploads are handled using `multer` and served via the `/uploads` static route.
- For production deployment, a cloud-hosted MongoDB Atlas URI should replace the local `MONGO_URL`.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
