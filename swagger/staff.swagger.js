/**
 * @swagger
 * tags:
 *   name: Staff
 *   description: API endpoints for managing staff members
 */

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: List all staff members
 *     tags: [Staff]
 *     parameters:
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (ascending or descending)
 *     responses:
 *       '200':
 *         description: List of staff members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Create a new staff member
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewStaff'
 *     responses:
 *       '201':
 *         description: Staff member created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /staff/password/{id}:
 *   patch:
 *     summary: Change the password of an existing staff member by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the staff member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Staff member not found
 */

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     summary: Delete an existing staff member by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the staff member
 *     responses:
 *       '204':
 *         description: Staff member deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Staff member not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the staff member
 *         name:
 *           type: string
 *           description: The name of the staff member
 *         username:
 *           type: string
 *           description: The username of the staff member
 *     NewStaff:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the new staff member
 *         username:
 *           type: string
 *           description: The username of the new staff member
 *         password:
 *           type: string
 *           description: The password of the new staff member
 *     ChangePassword:
 *       type: object
 *       properties:
 *         newPassword:
 *           type: string
 *           description: The new password for the staff member
 */
