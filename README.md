<----------------------->**************Backend*******************<--------------------->

Backend Setup Instructions

1. Prisma Setup
<------------>*********Prisma***********<------------>
Prisma Insatllation Command
  1.1 npm install @prisma/cli --save-dev
<----------->*********npm install @prisma/cli --save-dev**********<---------->
  1.2 Initialize Prisma:
<----------->*********npx prisma init*****<---------->
  1.3 Install Prisma Client:
<---------->*********npm install @prisma/client*****<------->
  1.4Generate Prisma Client:
Before starting to code, run the following command to generate the Prisma Client:
<------------->**********npx prisma generate**********<------------->

2. MongoDB Setup
 And MongoDb Install
<------------>*********MongoDb**********<------------->
<------------>********npm install mongoose********<---------->

 And Express Js install
3. Express.js Setup
<------------>*********Express**********<------------->
<------------>*********npm install Express*******<---------->

Before Start the backend
4. Starting the Backend
  4.1 Install All Dependencies:
<----------->**********npm i********<-------------->

And Backend Start At the Command
   4.2 Start the Backend Server:
<---------->************npm start*******<------------->

5. Authentication Setup
  5.1 Install JSON Web Token (JWT): 
<--------->**********npm install jsonwebtoken********<------------->
<---------->*********JsonWebTpken*******<------------>

   5.2 Token Storage with Cookies:
           Install the cookie-parser package to manage cookies:
<---------->*********Cookies***********<------------->
<---------->*********npm install cookie-parser********<------------>

   5.3 Set Token Expiration:
          The login token will expire after .
<---------->*********2 Day************<------------->

6. Forgot Password Implementation
Use Nodemailer for Sending Emails:

Implement the backend to use Nodemailer for sending a verification email when the user forgets their password. The user should be able to verify their email and set a new password.

Redirect After Password Reset:

After setting the new password, the user should be redirected back to the sign-in page to sign in with the new password.

This structured set of instructions should help you implement and start your backend project using Prisma, MongoDB, Express.js, and JWT-based authentication with email functionality for password reset.

////////////////////////////////////////////////////////////////////////////////////////
<----------------------->************END***************<------------------------------->
////////////////////////////////////////////////////////////////////////////////////////

****************************************************************************************
<------------------------->**********Start Fortend*****<------------------------------->
****************************************************************************************