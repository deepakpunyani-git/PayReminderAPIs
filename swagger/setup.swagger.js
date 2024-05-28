/**
 * @swagger
 * /setup:
 *   post:
 *     summary: Setup company details
 *     tags: [Setup]
 *     description: Endpoint to set up company details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 description: Company name
 *               companyEmail:
 *                 type: string
 *                 format: email
 *                 description: Company email
 *               companyPhoneNumber:
 *                 type: string
 *                 pattern: '^\d{3}-\d{3}-\d{4}$'
 *                 description: Company phone number 
 *     responses:
 *       '200':
 *         description: Company setup completed successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *               param:
 *                 type: string
 *               location:
 *                 type: string
 *       example:
 *         errors:
 *           - msg: Email Content is required
 *             param: emailContent
 *             location: body
 *
 * /setup-email-content:
 *   post:
 *     summary: Setup email content
 *     tags: [Setup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailContent
 *               - emailSubject
 *             properties:
 *               emailSubject:
 *                 type: string
 *                 description: Email Subject
 *               emailContent:
 *                 type: string
 *                 description: >
 *                   Email content with placeholders for dynamic data. 
 *                   Placeholders:
 *                   - [company_name]: Will be replaced with the company name.
 *                   - [company_email]: Will be replaced with the company email.
 *                   - [company_phone_number]: Will be replaced with the company phone number.
 *                   - [amount]: Will be replaced with the amount due.
 *                   - [client_name]: Will be replaced with the client's name.
 *           example:
 *             emailSubject: Payment Reminder from [company_name]
 *             emailContent: |
 *               Dear [client_name],
 *               
 *               This is a reminder that your payment of [amount] is due.
 *               
 *               Please contact us if you have any questions.
 *               
 *               Best regards,
 *               [company_name]
 *               [company_email]
 *               [company_phone_number]
 *     responses:
 *       200:
 *         description: Email content setup successful
 *       400:
 *         description: Validation error(s)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


/**
 * @swagger
 * /setup-details:
 *   get:
 *     summary: Get setup details
 *     tags: [Setup]
 *     responses:
 *       200:
 *         description: List of setup details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   companyName:
 *                     type: string
 *                     example: ABC
 *                   companyEmail:
 *                     type: string
 *                     example: john.doe@example.com
 *                   companyPhoneNumber:
 *                     type: string
 *                     example: xxx-xxx-xxxx
 *                   emailSubject:
 *                     type: string
 *                     example: Test
 *                   emailContent:
 *                     type: string
 *                     example: This Email
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */