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
 *     tags: 
 *       - Contact Us
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items to return per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter messages by status
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter messages created from this date (YYYY-MM-DD)
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter messages created up to this date (YYYY-MM-DD)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by (status, datecreated, etc.)
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (ascending or descending)
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
 * /contact-us/message/status/{id}:
 *   put:
 *     summary: Change message status
 *     tags: [Contact Us]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 */
