/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Authenticate with Google
 *     tags: [Authentication]
 *     responses:
 *       '302':
 *         description: Redirect to Google authentication page
 *         headers:
 *           Location:
 *             description: URL to Google authentication page
 *             schema:
 *               type: string
 *   parameters:
 *     - name: redirect_uri
 *       in: query
 *       description: Redirect URL after authentication
 *       required: false
 *       schema:
 *         type: string
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request, validation failed
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with email and password
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
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '400':
 *         description: Bad request, validation failed
 *       '401':
 *         description: Invalid credentials
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin-forgot-password:
 *   post:
 *     summary: Send a reset email for admin password
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
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Error
 */

/**
 * @swagger
 * /admin-reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordReset'
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PasswordReset:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         otp:
 *           type: string
 *         newPassword:
 *           type: string
 *       required:
 *         - email
 *         - otp
 *         - newPassword
 */
