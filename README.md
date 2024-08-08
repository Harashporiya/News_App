Backend Setup Instructions
1. Prisma Setup
1.1 Install Prisma
First, install the Prisma CLI as a development dependency in your project.

1.2 Initialize Prisma
Next, initialize Prisma in your project. This will set up the necessary files and directories to use Prisma.

1.3 Install Prisma Client
After initializing Prisma, install the Prisma Client, which will allow you to interact with your database in your application.

1.4 Generate Prisma Client
Before starting to write your code, generate the Prisma Client based on your Prisma schema. This step is crucial to ensure that your application can communicate with the database.

2. MongoDB Setup
MongoDB Installation
Install the Mongoose library, which is an Object Data Modeling (ODM) tool for MongoDB and Node.js. It provides a straightforward way to work with your MongoDB database.

3. Express.js Setup
Express.js Installation
Install Express.js, which is a web application framework for Node.js. It provides a robust set of features to develop web and mobile applications.

4. Starting the Backend
4.1 Install All Dependencies
Make sure that all the necessary dependencies for the project are installed. This includes Prisma, Mongoose, Express.js, and any other packages required by the project.

4.2 Start the Backend Server
Once all dependencies are installed, you can start the backend server to begin development or testing.

5. Authentication Setup
5.1 Install JSON Web Token (JWT)
Install the JSON Web Token (JWT) library, which is used to create and verify tokens for securing the authentication process in your application.

5.2 Token Storage with Cookies
Install a library to handle cookies in your application. This is important for storing the JWT token securely in the user's browser.

5.3 Set Token Expiration
Configure the token to expire after a certain period. In this case, the login token should be set to expire after 2 days.

6. Forgot Password Implementation
Use Nodemailer for Sending Emails
Implement the backend functionality to send a verification email to users who have forgotten their password. This email should allow users to verify their identity and set a new password.

Redirect After Password Reset
Once the user has set a new password, redirect them back to the sign-in page so they can log in with their new credentials.

