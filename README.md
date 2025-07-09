Movie Review App - Project Documentation
========================================

This is a full-stack web application that allows users to register, log in, browse movies, and post reviews. This application is built with the MERN Stack (MongoDB, Express, React, Node.js) and implements a complete authentication system using email/password and Google OAuth.

✨ Key Features
--------------

*   **User Management**: New user registration with email verification.
    
*   **Secure Authentication**:
    
    *   Local login (email & password) with passwords hashed using bcrypt.
        
    *   Social login using Google OAuth 2.0.
        
    *   Session management based on **JSON Web Tokens (JWT)** sent via _cookies_.
        
*   **Routing**: Client-side navigation using react-router-dom and server-side routing with express.
    
*   **CRUD (Create, Read, Update, Delete)**: Full functionality for user and movie review data.
    
*   **Security**: Middleware to protect routes that require login.
    

🛠️ Tech Stack
--------------

*   **Backend**:
    
    *   **Node.js** & **Express**: Server framework.
        
    *   **MongoDB**: NoSQL database with **Mongoose** as ODM.
        
    *   **Passport.js**: Authentication middleware (passport-local, passport-jwt, passport-google-oauth20).
        
    *   **jsonwebtoken**: For creating and verifying JWTs.
        
    *   **bcrypt**: For password hashing.
        
    *   **Nodemailer**: For sending verification emails.
        
    *   **dotenv**: For managing environment variables.
        
*   **Frontend**:
    
    *   **React**: Library for building user interfaces.
        
    *   **React Router**: For client-side routing.
        
    *   **Ant Design (antd)**: UI component library.
        
    *   **CORS**: To allow communication between the frontend and backend.
        

🚀 Setup and Installation Instructions
--------------------------------------

To run this project in your local environment, follow these steps.

### Prerequisites

*   Node.js (v14 or higher)
    
*   npm or yarn
    
*   MongoDB (installed locally or via a cloud service like MongoDB Atlas)
    

### 1\. Backend Setup (Server)

a. **Clone the Repository**:

`git clone   cd` 

b. **Install Dependencies**:

`   npm install   `

c. **Create .env File**:
Create a file named .env in the backend root folder and fill it with the following variables. Replace the values with your own configuration.

`   # Server Configuration  PORT=8080  URL=http://localhost:8080  # MongoDB Connection  MONGO_URI=mongodb://localhost:27017/your-database-name  # JWT Secret Key  JWT_SECRET_KEY=a-very-strong-and-long-secret-key  # Google OAuth 2.0 Credentials (Get from Google Cloud Console)  GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com  GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET  # Nodemailer Credentials (Use an App Password from your Google Account)  EMAIL=your.email.address@gmail.com  GOOGLE_APP_PASSWORD=your-16-digit-app-password   `

d. **Run the Server**:

`   npm start   `

The server will be running at http://localhost:8080.

### 2\. Frontend Setup (Client)

a. **Navigate to the Client Folder**:

`cd` 

b. **Install Dependencies**:

`   npm install   `

c. **Run the React Application**:

`   npm run dev   `

The React application will be running at http://localhost:5173 (or another available port).

📝 Contribution
--------------------------------------------

*   **Alia Nurul Aziiza**:
    
    *   Front End Development
        
*   **Alif Elang Abhipraya**:
    
    *   Back End Development (Authorization and Authentication)

*   **Angelica Suti Whiharto**:
    
    *   Full-Stack Development (Front End, Back End {database & Auth})
