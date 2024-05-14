/**
 * @swagger
 * tags:
 *   name: Contact Us
 *   description: API endpoints for managing contact messages
 */

/**
 * @swagger
 * /contact-us/message:
 *   post:
 *     summary: Add a new message via contact form
 *     tags: [Contact Us]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactMessage'
 *     responses:
 *       '200':
 *         description: Message added successfully
 *       '400':
 *         description: Bad request, validation failed
 *       '500':
 *         description: Internal server error
 *   get:
 *     summary: List all messages
 *     tags: [Contact Us]
 *     responses:
 *       '200':
 *         description: List of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactMessage'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /contact-us/message/status:
 *   put:
 *     summary: Change message status
 *     tags: [Contact Us]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messageId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [read, pending]
 *     responses:
 *       '200':
 *         description: Message status changed successfully
 *       '400':
 *         description: Bad request, validation failed
 *       '404':
 *         description: Message not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactMessage:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         message:
 *           type: string
 *         datecreated:
 *           type: string
 *           format: date-time
 *         send_by:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, read]
 *         ip_address:
 *           type: string
 */
