PayReminderAPIs
PayReminderAPIs is a Node.js application designed to help users manage payment reminders efficiently. This repository includes a RESTful API built using Express.js, and it utilizes various dependencies for handling authentication, scheduling, and documentation.

Features

    Authentication
        User registration and login functionality.
        Password hashing and verification using bcrypt.
        JWT-based authentication for secure API access.
        OAuth 2.0 authentication using Google with Passport.js.
    Authorization
        Role-based access control for different user types (staff, clients).
        Secure session management with express-session.
    User Management
        CRUD operations for user profiles.
        Password reset functionality.
        Email notifications using Nodemailer.
    Client and Staff Management
        CRUD operations for managing clients and staff members.
        Detailed views for individual client and staff profiles.
    Payment Reminders
        Automated payment reminders using node-schedule.
        Integration with email service to send reminders.
    Contact Management
        Contact form handling.
        Storing and managing contact inquiries.



Table of Contents
Installation
Usage
API Documentation
Environment Variables
Scripts
Dependencies
Contributing
License
Installation
To get started with PayReminderAPIs, follow these steps:

Clone the repository:
git clone https://github.com/deepakpunyani-git/PayReminderAPIs.git
cd PayReminderAPIs

Install the dependencies:
npm install

Set up environment variables:
Create a .env file in the root directory and add the necessary environment variables


Usage
To start the server, you can use the following commands:

Start the server:
npm start

Start the server in development mode (with nodemon):
npm run dev

API Documentation
The API documentation is available at [Swagger UI](https://payreminder.onrender.com/api-docs).

Environment Variables
PORT
MONGODB_URI
saltRounds
JWT_SECRET 
email
EMAIL_HOST
EMAIL_PORT
EMAIL_USER
EMAIL_PASSWORD
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
CLIENT_URL

Scripts
npm start: Starts the server.
npm run dev: Starts the server in development mode with nodemon.


Dependencies
bcrypt: ^5.1.1
cors: ^2.8.5
cros: ^1.0.1
dotenv: ^16.4.5
express: ^4.19.2
express-session: ^1.18.0
express-validator: ^7.0.1
jsonwebtoken: ^9.0.2
moment: ^2.30.1
mongoose: ^8.4.0
morgan: ^1.10.0
multer: ^1.4.5-lts.1
node-schedule: ^2.1.1
nodemailer: ^6.9.13
passport: ^0.7.0
passport-google-oauth20: ^2.0.0
passport-jwt: ^4.0.1
swagger-jsdoc: ^6.2.8
swagger-ui-express: ^5.0.0

Contributing
Feel free to fork this repository and submit pull requests. If you find any bugs or have any questions, please create an issue https://github.com/deepakpunyani-git/PayReminderAPIs/issues


License
This project is licensed under the ISC License.

Author
Deepak Punyani