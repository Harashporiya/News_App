# Project Setup Instructions

## Backend Setup

### 1. Prisma Setup
- **Install Prisma CLI:**  
  `npm install @prisma/cli --save-dev`

- **Initialize Prisma:**  
  `npx prisma init`

- **Install Prisma Client:**  
  `npm install @prisma/client`

- **Generate Prisma Client:**  
  Before starting to code, run the following command to generate the Prisma Client:  
  `npx prisma generate`

### 2. MongoDB Setup
- **Install Mongoose:**  
  `npm install mongoose`

### 3. Express.js Setup
- **Install Express.js:**  
  `npm install express`

### 4. Starting the Backend
- **Install All Dependencies:**  
  `npm install`

- **Start the Backend Server:**  
  `npm start`

### 5. Authentication Setup
- **Install JSON Web Token (JWT):**  
  `npm install jsonwebtoken`

- **Token Storage with Cookies:**  
  Install the `cookie-parser` package to manage cookies:  
  `npm install cookie-parser`

- **Set Token Expiration:**  
  The login token will expire after 2 days.

### 6. Forgot Password Implementation
- **Use Nodemailer for Sending Emails:**  
  Implement the backend to use Nodemailer for sending a verification email when the user forgets their password. The user should be able to verify their email and set a new password.

- **Redirect After Password Reset:**  
  After setting the new password, the user should be redirected back to the sign-in page to log in with the new password.

---

## Frontend Setup


