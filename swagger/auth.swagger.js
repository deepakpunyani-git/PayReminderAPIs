/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request, validation error
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Unauthorized, invalid credentials
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Send reset password link to the user's email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       '200':
 *         description: Reset password link sent successfully
 *       '404':
 *         description: User not found with the provided email
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset user's password using the reset token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *       '400':
 *         description: Invalid reset token or password format
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *     LoginRequest:
 *       type: object
 *       properties:
 *         usernameOrEmail:
 *           type: string
 *         password:
 *           type: string
 *     ForgotPasswordRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *     ResetPasswordRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         otp:
 *           type: string
 *         newPassword:
 *           type: string
 *       required:
 *         - email
 *         - otp
 *         - newPassword
 */

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OTP verified successfully
 *       '400':
 *         description: Bad request, validation error or invalid/expired OTP
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /auth/google/:
 *   post:
 *     summary: Google Auth
 *     tags: [Authentication]
 *     externalDocs:
 *       description: Open in new tab
 *       url: '/auth/google/'
 */