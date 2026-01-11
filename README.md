# 🔐 MERN Authentication System

A secure, full-stack **Authentication System** built with the **MERN Stack** (MongoDB, Express, React, Node.js). It features user registration, secure login, JWT-based authentication, and protected routes.

🚀 **Live Demo:** [https://beautiful-peony-a1e6bb.netlify.app](https://beautiful-peony-a1e6bb.netlify.app/)

![Project Screenshot](<img width="1265" height="881" alt="image" src="https://github.com/user-attachments/assets/fcf0190b-daa6-44df-bdbd-c485ff09aba8" />)

## ✨ Features

- **User Registration:** Create a new account with email and password.
- **Secure Login:** Authenticate existing users.
- **Password Encryption:** Uses `bcryptjs` for hashing passwords securely.
- **JWT Authentication:** Generates JSON Web Tokens for session management.
- **Protected Routes:** "VIP Dashboard" accessible only to logged-in users.
- **Responsive UI:** Built with **React** and **Tailwind CSS**.

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens), Bcrypt.js
- **Deployment:** Render (Backend), Netlify (Frontend)

## 🚀 Run Locally

If you want to run this project on your local machine:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/debasishsasmal/mern-auth-app.git](https://github.com/debasishsasmal/mern-auth-app.git)
    cd mern-auth-app
    ```

2.  **Install Dependencies**
    ```bash
    # Install Backend Dependencies
    npm install

    # Install Frontend Dependencies
    cd frontend
    npm install
    cd ..
    ```

3.  **Setup Environment Variables**
    Create a `.env` file in the root directory and add:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

4.  **Run the App**
    ```bash
    # Run Backend (Port 3000)
    node index.js

    # Run Frontend (Port 5173)
    cd frontend
    npm run dev
    ```

## 📂 Project Structure

```bash
mern-auth-app/
├── frontend/          # React Frontend
├── models/            # Database Models (User Schema)
├── index.js           # Express Server & Routes
├── .env               # Environment Variables (Not uploaded)
└── README.md          # Project Documentation
