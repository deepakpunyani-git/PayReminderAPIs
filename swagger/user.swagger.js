/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         age:
 *           type: integer
 *         gender:
 *           type: string
 */

/**
 * @swagger
 * /user/profile-update:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     description: Update user profile details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *             example:
 *               name: John Doe
 *               age: 30
 *               gender: male
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, validation failed or missing fields
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/email-change:
 *   put:
 *     summary: Change user email
 *     tags: [Users]
 *     description: Change user email address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_email:
 *                 type: string
 *             example:
 *               new_email: john.doe@example.com
 *     responses:
 *       200:
 *         description: Email changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request, validation failed or missing fields
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/password-change:
 *   put:
 *     summary: Change user password
 *     tags: [Users]
 *     description: Change user password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *             example:
 *               old_password: current_password
 *               new_password: new_password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request, validation failed or missing fields
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile details
 *     tags: [Users]
 *     description: Get user profile details
 *     responses:
 *       200:
 *         description: User profile details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 gender:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Block:
 *       type: object
 *       properties:
 *         block_user:
 *           type: boolean
 *           description: Block/Unblock user
 *           example: true
 */

/**
 * @swagger
 * /user/block-status/{id}:
 *   patch:
 *     summary: Change status
 *     tags: [Users , Clients,Staff]
 *     description: Change the status of a user/client/staff
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Block'
 *     responses:
 *       200:
 *         description: User status changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request, validation failed or missing fields
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/update-profile-pic:
 *   put:
 *     summary: Update user profile picture
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_pic:
 *                 type: string
 *                 format: binary
 *                 description: The profile picture file to upload
 *     responses:
 *       '200':
 *         description: Profile picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile picture updated successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No file uploaded
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *         name:
 *           type: string
 *           example: John Doe
 *         age:
 *           type: integer
 *           example: 30
 *         gender:
 *           type: string
 *           example: male
 *         profile_pic:
 *           type: string
 *           example: uploads/1625847748061.jpg
 *         status:
 *           type: string
 *           example: active
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         googleId:
 *           type: string
 *           example: 1234567890
 *         trail_taken:
 *           type: boolean
 *           example: true
 *         email_otp:
 *           type: string
 *           example: 123456
 *         email_otp_expiresAt:
 *           type: string
 *           format: date-time
 *           example: 2024-05-20T10:30:00.000Z
 *         email_otp_dateCreated:
 *           type: string
 *           format: date-time
 *           example: 2024-05-20T10:00:00.000Z
 */
