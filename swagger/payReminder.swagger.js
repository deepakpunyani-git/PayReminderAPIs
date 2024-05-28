/**
 * @swagger
 * components:
 *   schemas:
 *     PayReminder:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         reminderStartDate:
 *           type: string
 *           format: date
 *         numberOfPayments:
 *           type: integer
 *         notifyBeforeDays:
 *           type: integer
 *         paymentAmountPerInstallment:
 *           type: number
 *         recurringNotificationDays:
 *           type: integer
 */

/**
 * @swagger
 * /reminders:
 *   post:
 *     summary: Create a new reminder
 *     tags: [Reminders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayReminder'
 *     responses:
 *       201:
 *         description: The reminder was created successfully
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * /reminders/{id}:
 *   put:
 *     summary: Update a reminder
 *     tags: [Reminders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Reminder ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the reminder
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email for the reminder
 *     responses:
 *       200:
 *         description: The reminder was updated successfully
 *       400:
 *         description: Validation error(s)
 *       404:
 *         description: Reminder not found
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     PayReminder:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         reminderStartDate:
 *           type: string
 *           format: date
 *         numberOfPayments:
 *           type: integer
 *         notifyBeforeDays:
 *           type: integer
 *         paymentAmountPerInstallment:
 *           type: number
 *         recurringNotificationDays:
 *           type: integer
 *     PayReminderDetails:
 *       type: object
 *       properties:
 *         payReminderID:
 *           type: string
 *           format: objectId
 *         notificationDate:
 *           type: string
 *           format: date
 *         paymentDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: ['pending', 'completed', 'stop']
 *         paymentReceived:
 *           type: boolean
 *         amount:
 *           type: number
 */

/**
 * @swagger
 * /reminders:
 *   get:
 *     summary: Get all reminders with pagination, filtering, and sorting
 *     tags: [Reminders]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of reminders per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter reminders by name
 *       - in: query
 *         name: reminderStartDateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter reminders with start date from this date
 *       - in: query
 *         name: reminderStartDateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter reminders with start date up to this date
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [reminderStartDate, name]
 *           default: reminderStartDate
 *         description: Sort by reminderStartDate or name
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: List of reminders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 reminders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PayReminder'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /reminders/{id}:
 *   get:
 *     summary: Get a single reminder
 *     tags: [Reminders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: objectId
 *         required: true
 *         description: Reminder ID
 *     responses:
 *       200:
 *         description: Reminder details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayReminder'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reminder not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /reminders/stop/{id}:
 *   put:
 *     summary: Stop a PayReminder and update PayReminderDetails status to 'stop' where status is 'pending'
 *     tags: [Reminders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The PayReminder ID
 *     responses:
 *       200:
 *         description: Reminder stopped successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 payReminder:
 *                   $ref: '#/components/schemas/PayReminder'
 *       404:
 *         description: PayReminder not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /reminders/custom-email/{id}:
 *   put:
 *     summary: Update custom email content for a PayReminder
 *     tags: [Reminders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The PayReminder ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *               useCustomContent:
 *                 type: boolean
 *                 description: Flag to indicate whether custom content is used
 *             example:
 *               emailSubject: Payment Reminder from [company_name]
 *               emailContent: |
 *                 Dear [client_name],
 *                 
 *                 This is a reminder that your payment of [amount] is due.
 *                 
 *                 Please contact us if you have any questions.
 *                 
 *                 Best regards,
 *                 [company_name]
 *                 [company_email]
 *                 [company_phone_number]
 *               useCustomContent: true
 *     responses:
 *       200:
 *         description: Custom email content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 payReminder:
 *                   $ref: '#/components/schemas/PayReminder'
 *       404:
 *         description: PayReminder not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /reminderdetails/{id}:
 *   put:
 *     summary: Update reminder details
 *     tags: [Reminders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The PayReminderDetails ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notificationDate:
 *                 type: string
 *                 format: date-time
 *                 description: Notification date
 *               paymentDate:
 *                 type: string
 *                 format: date-time
 *                 description: Payment date
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *             example:
 *               notificationDate: 2024-05-27T10:00:00Z
 *               paymentDate: 2024-06-27T10:00:00Z
 *               amount: 100
 *     responses:
 *       200:
 *         description: Reminder details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reminderDetails:
 *                   $ref: '#/components/schemas/PayReminderDetails'
 *       404:
 *         description: Reminder details not found
 *       500:
 *         description: Server error
 *
 * /reminderdetails/stop/{id}:
 *   put:
 *     summary: Stop reminder
 *     tags: [Reminders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The PayReminderDetails ID
 *     responses:
 *       200:
 *         description: Reminder status updated to stop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reminderDetails:
 *                   $ref: '#/components/schemas/PayReminderDetails'
 *       404:
 *         description: Reminder details not found
 *       500:
 *         description: Server error
 *
 *
 * components:
 *   schemas:
 *     PayReminderDetails:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         payReminderID:
 *           type: string
 *         notificationDate:
 *           type: string
 *           format: date-time
 *         paymentDate:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [pending, completed, stop]
 *         paymentReceived:
 *           type: boolean
 *           default: false
 *         amount:
 *           type: number
 */

/**
 * @swagger
 * /reminderdetails/{id}:
 *   get:
 *     summary: Get a single reminder detail
 *     tags: [Reminders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The PayReminderDetails ID
 *     responses:
 *       200:
 *         description: Reminder detail fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reminderDetail:
 *                   $ref: '#/components/schemas/PayReminderDetails'
 *       400:
 *         description: Setup not complete
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Reminder detail not found
 *       500:
 *         description: Server error
 *
 * components:
 *   schemas:
 *     PayReminderDetails:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         payReminderID:
 *           type: string
 *         notificationDate:
 *           type: string
 *           format: date-time
 *         paymentDate:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [pending, completed, stop]
 *         paymentReceived:
 *           type: boolean
 *           default: false
 *         amount:
 *           type: number
 */

/**
 * @swagger
 * /reminderdetails/payment-received/{id}:
 *   put:
 *     summary: Mark payment as received
 *     tags: [Reminders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The PayReminderDetails ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentReceived:
 *                 type: boolean
 *                 description: Payment received status
 *             example:
 *               paymentReceived: true
 *     responses:
 *       200:
 *         description: Payment received status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reminderDetail:
 *                   $ref: '#/components/schemas/PayReminderDetails'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Reminder detail not found
 *       500:
 *         description: Server error
 */