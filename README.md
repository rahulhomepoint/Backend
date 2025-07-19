# HomePoint Backend

## Project Structure

```
├── app.js (or server.js) - Main entry point, sets up the server and imports routes.
├── src/
│   ├── config/ - Configuration files (database settings, environment variables).
│   ├── controllers/ - Handles incoming requests, interacts with services/models.
│   ├── models/ - Defines data schemas and interacts with the database.
│   ├── routes/ - Defines API endpoints and links them to controllers.
│   ├── services/ - Contains business logic and interacts with models.
│   ├── middleware/ - Custom middleware functions (authentication, logging).
│   ├── utils/ - Utility functions (helpers, validators, common tools).
│   └── views/ (optional, if serving HTML) - Templates for rendering views.
├── tests/ - Unit and integration tests.
├── .env (or config.js) - Environment variables.
├── package.json - Project dependencies and scripts.
├── README.md - Project documentation.
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory with the following content:
   ```env
   MONGO_URL=mongodb://localhost:27017/homepoint
   PORT=3000
   ```
3. Start the server:
   ```bash
   node app.js
   ```
4. Test the MongoDB connection:
   Visit [http://localhost:3000/test-mongo](http://localhost:3000/test-mongo) 

## Password Reset via Email OTP

### 1. Request Password Reset
- **Endpoint:** `POST /request-password-reset`
- **Body:** `{ "email": "user@example.com" }`
- **Description:** Sends a 6-digit OTP to the user's email if the user exists.

### 2. Reset Password with OTP
- **Endpoint:** `POST /reset-password-otp`
- **Body:** `{ "email": "user@example.com", "otp": "123456", "newPassword": "newpassword123" }`
- **Description:** Verifies the OTP and updates the user's password if valid. 