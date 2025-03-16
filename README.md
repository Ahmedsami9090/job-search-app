# Job Search App 🚀

Welcome to the **Job Search App**, a platform that simplifies the job application process for both job seekers and employers. Whether you're looking to showcase your CV or seeking the perfect candidate for your company, this app has you covered. With a seamless login system, job posting, and applicant screening features, it's your one-stop solution for all things job search.

---

## Features 🌟

- **User Login:** Secure authentication for job seekers and employers using JWT (JSON Web Tokens).
- **CV Upload:** Job seekers can upload and manage their CVs for potential employers to view.
- **Company Account:** Companies can create their profiles to post job listings and search for suitable candidates.
- **Job Posting:** Employers can create, update, and manage job listings.
- **Applicant Screening:** Employers can view and manage job applications, accept or reject applicants.
  
---

## Technologies Used ⚙️

- **Authentication & Security:**
  - `bcrypt` - Secure password hashing
  - `jsonwebtoken` - JWT for authentication and authorization
  - `helmet` - Security headers for enhanced protection
  
- **File Upload & Cloud Storage:**
  - `multer` - Middleware for handling multipart/form-data (for file uploads)
  - `cloudinary` - Cloud storage service for storing CV files and images
  
- **Backend Framework:**
  - `express` - Web framework for building the app’s backend
  - `express-rate-limit` - To prevent abuse by limiting repeated requests from the same IP
  
- **Database:**
  - `mongoose` - MongoDB ODM for easy data modeling
  - `graphql` - Query language for APIs, making data fetching flexible and efficient
  
- **Job Management & Scheduling:**
  - `node-cron` - Scheduled tasks to handle recurring events like application reminders
  
- **Email Notifications:**
  - `nodemailer` - For sending email notifications to applicants and employers
  
- **Other Utilities:**
  - `dotenv` - For loading environment variables securely
  - `joi` - Data validation for handling form submissions and inputs
  - `nanoid` - For generating unique identifiers for job posts and users
  - `google-auth-library` - For Google authentication, enabling easy login via Google accounts
  - `cors` - For handling Cross-Origin Resource Sharing (CORS) in the app

---

## Installation 🔧

To get started, clone the repository and follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-search-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd job-search-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MODE = 'DEV'
    DB_URI = ''
    HASH_ROUNDS = 
    ENCRYPTION_IV = ""
    ENCRYPTION_KEY = ""
    ENCRYPTION_ALGORITHM = ''
    EMAIL_PASS = ""
    EMAIL_ADDRESS = ""
    TOKEN_SECRET_KEY_ADMIN = ""
    TOKEN_SECRET_KEY_USER = ""
    CLOUD_NAME = ""
    CLOUD_API_KEY = ""
    CLOUD_API_SECRET = ""
   ```

5. Run the application:
   ```bash
   npm start
   ```

The app will now be running locally on `http://localhost:3000`.

---

## API Endpoints 📡

Auth Endpoints: 
- **POST /auth/login** - Login with email and password (returns JWT token).
- **POST /auth/signup** - Register a new user (job seeker or employer).
- **POST /auth/confirm** - Confirm User's email.
- **POST /auth/otp-renew** - Renew OTP sent by email if Expired.
- **POST /auth/google-signup** - Sign up using Google account.
- **POST /auth/google-login** - Login using Google account.
- **POST /auth/password-forgot** - Request email OTP to verify user.
- **PUT /auth/password-reset** - Verify OTP and reset password.
- **POST /auth/refresh-token** - Refresh Access token using Refresh token.

User Endpoints:
- **PUT /users/update** - Update user's personal information.
- **GET /users/profile** - Get user's profile.
- **GET /users/profile/:userId** - Get public information of another user.
- **PUT /users/update/password** - Update user's password.
- **POST /users/upload/profile-pic** - Upload Profile picture.
- **POST /users/upload/cover-pic** - Upload Cover picture.
- **DELETE /users/profile-pic** - Delete Profile picture.
- **DELETE /users/cover-pic** - Delete Cover picture.
- **DELETE /users/delete** - Delete account.

Company EndPoints:
- **POST /company/new** - create new Company account.
- **PATCH /company/update/:companyId** - Update company information.
- **DELETE /company/delete/:companyId** - Delete company account.
- **GET /company/:companyId** - Get company public information.
- **GET /company** - Search by name.
- **PUT /company/upload/logo** - Upload company logo.
- **PUT /company/upload/cover-pic** - Upload company cover picture.
- **GET /company/:companyId** - Get company public information.
- **DELETE /company/:companyId/logo** - Delete company logo.
- **DELETE /company/:companyId/cover-pic** - Delete company cover picture.

Jobs Endpoints:
- **POST /company/:companyId/jobs/new** - Create a new job post.
- **PUT /jobs/update/:jobId** - Update job status (open-closed).
- **DELETE /jobs/:jobId** - Delete job post.
- **GET /jobs?page=1&limit=5** - Search jobs by name.
- **POST /jobs/:jobId/apply** - Apply for a job.
- **GET /jobs/applications** - Retrieve all job applications.
- **PUT /jobs/application/:applicationId/status** - Change status of job application.

Chat Endpoints (soon).
