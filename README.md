# User Authentication System

A secure and scalable user authentication system built with **Node.js**, **Express**, **MongoDB**, **bcrypt** for password hashing, and **JSON Web Tokens (JWT)** for session management.

---

## Features

- **User Registration**: Users can create an account with a username, email, and password.
- **User Login**: Users can log in using their email and password.
- **Password Hashing**: Passwords are securely hashed using bcrypt.
- **JWT Authentication**: JSON Web Tokens are used for secure session management.
- **Protected Routes**: Middleware ensures only authenticated users can access certain routes.

---

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Password Hashing**: bcryptjs
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Variables**: dotenv

---

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Postman](https://www.postman.com/) (for testing API endpoints)

---

## Installation

- **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/user-auth-system.git
   cd user-auth-system
   ```

- **Install dependencies**:

    ```bash
    npm install
    ```

- **Set up environment variables**:

- Create a .env file in the root directory.

- Add the following variables:

    ```bash
    MONGO_URI=mongodb://localhost:27017/user_auth
    JWT_SECRET=your_jwt_secret_key
    ```

- **Start the server:**

    ```bash
    npm start
    ```

- The server will run on <http://localhost:5000>.

---

### API Endpoints

- **User Registration**:

- URL: /api/auth/register

- Method: POST

- Request Body:

json

```bash
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

- Response:

json

```bash
{
  "message": "User registered successfully",
  "user": {
    "id": "64f1a2b3c9e8b4a3f4d5e6f7",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

- **User Login**:

- URL: /api/auth/login

- Method: POST

- Request Body:

json

```bash
{
  "email": "test@example.com",
  "password": "password123"
}
```

- Response:

json

```bash
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c9e8b4a3f4d5e6f7",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

- **Protected Route** (Example):

- URL: /api/auth/profile

- Method: GET

- Headers:

```bash
Authorization: Bearer <token>
```

Response:

json

```bash
{
  "message": "Protected route accessed",
  "user": {
    "id": "64f1a2b3c9e8b4a3f4d5e6f7",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

---

### Project Structure

```bash
user-auth-system/
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── User.js
├── routes/
│   └── auth.js
├── .env
├── app.js
├── package.json
└── README.md
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

This project is licensed under the MIT License. See the LICENSE file for details.

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

GitHub: ThamiBa
