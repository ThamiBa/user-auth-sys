# User authencation system

A full-stack authentication system built with the **MERN stack** (MongoDB, Express, React, Node.js) that includes advanced features like **Email Verification**, **Password Recovery**, and **Welcome Emails**.

---

## Features

- **User Registration**: Users can create an account with a username, email, and password.
- **Email Verification**: Users receive a verification email to confirm their account.
- **Password Recovery**: Users can reset their password via a secure email link.
- **Welcome Emails**: Users receive a welcome email upon successful registration.
- **JWT Authentication**: Secure authentication using JSON Web Tokens (JWT).
- **Protected Routes**: Middleware ensures only authenticated users can access certain routes.

---

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime for the server.
- **Express**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Nodemailer**: For sending emails (verification, password recovery, and welcome emails).
- **Bcryptjs**: For password hashing.
- **JSON Web Tokens (JWT)**: For secure authentication.
- **Dotenv**: For managing environment variables.

### Frontend

- **React**: JavaScript library for building the user interface.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests to the backend.
- **Bootstrap**: For styling the UI.

### Email Service

- **Mailtrap**: For testing email functionality in development.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Git](https://git-scm.com/) (for cloning the repository)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/user-auth-sys.git
cd user-auth-sys
```

### 2. Install Backend Dependencies

Navigate to the `server` folder and install dependencies:

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

Navigate to the `client` folder and install dependencies:

```bash
cd ../client
npm install
```

### 4. Set Up Environment Variables

Create a `.env` file in the `server` folder and add the following variables:

```bash
MONGO_URI=mongodb://localhost:27017/advanced-auth
JWT_SECRET=your_jwt_secret_key
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
BASE_URL=http://localhost:3000
```

### 5. Start the Backend Server

From the `server` folder, run:

```bash
npm start
```

The server will run on `http://localhost:5000`.

### 6. Start the Frontend Development Server

From the `client` folder, run:

```bash
npm start
```

The frontend will run on `http://localhost:3000`.

---

### API Endpoints

### 1. User Registration

- URL: /api/auth/register
- Method: POST
- Request Body:

```bash
json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

- Response:

```bash
json
{
  "message": "User registered successfully. Please check your email for verification."
}
```

### 2. Email Verification

- URL: `/api/auth/verify-email?token=<verification_token>`
- Method: `GET`
- Response:

```bash
json
{
  "message": "Email verified successfully."
}
```

### 3. User Login

- URL: `/api/auth/login`
- Method: `POST`
- Request Body:

```bash
json
{
  "email": "test@example.com",
  "password": "password123"
}
```

- Response:

```bash
json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c9e8b4a3f4d5e6f7",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### 4. Password Recovery

- URL: `/api/auth/forgot-password`
- Method: `POST`
- Request Body:

```bash
json
{
  "email": "test@example.com"
}
```

- Response:

```bash
json
{
  "message": "Password reset email sent. Please check your email."
}
```

### 5. Reset Password

- URL: /api/auth/reset-password?token=<reset_token>
- Method: POST
- Request Body:

```bash
json
{
  "password": "newpassword123"
}
```

- Response:

```bash
json
{
  "message": "Password reset successfully."
}
```

### Project Structure

```bash
advanced-mern-auth/
├── client/                  # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Application pages
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Entry point
│   └── package.json
├── server/                  # Backend (Node.js + Express)
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions (e.g., email sending)
│   ├── .env                 # Environment variables
│   ├── app.js               # Main application file
│   └── package.json
└── README.md                # Project documentation
```

---

### Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

Fork the repository.

Create a new branch (´git checkout -b feature/YourFeatureName´).

Commit your changes (´git commit -m 'Add some feature'´).

Push to the branch (´git push origin feature/YourFeatureName´).

Open a pull request.

---

### License

This project is licensed under the MIT `License`. See the LICENSE file for details.

---

### Acknowledgments

- [Node.js](https://nodejs.org/)

- [Express](https://expressjs.com/)

- [MongoDB](https://www.mongodb.com/fr-fr)

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

- [JSON Web Tokens](https://jwt.io/)

---

### Contact

For questions or feedback, feel free to reach out:

Thami Baladi

Email: <baladithami@gmail.com>

GitHub: [ThamiBa](https://github.com/ThamiBa)
