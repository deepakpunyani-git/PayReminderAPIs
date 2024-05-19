/**
 * @swagger
 * tags:
 *   name: Plans
 *   description: API endpoints for managing payment reminder plans
 */

/**
 * @swagger
 * /plan:
 *   post:
 *     summary: Add a new payment reminder plan (Access by only Admin)
 *     tags: [Plans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               yearlyPrice:
 *                 type: number
 *               monthlyPrice:
 *                 type: number
 *               customize_content:
 *                 type: boolean
 *               total_customers:
 *                 type: number
 *               total_sms:
 *                 type: number
 *               total_email:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Plan added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayReminderPlan'
 *       '400':
 *         description: Bad request, validation failed
 *       '401':
 *         description: Unauthorized, user not authenticated
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /plan/{id}:
 *   put:
 *     summary: Update an existing payment reminder plan by ID (Access by only Admin)
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayReminderPlan'
 *     responses:
 *       '200':
 *         description: Plan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayReminderPlan'
 *       '400':
 *         description: Bad request, validation failed
 *       '401':
 *         description: Unauthorized, user not authenticated
 *       '404':
 *         description: Plan not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete a payment reminder plan by ID (Access by only Admin)
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Plan deleted successfully
 *       '401':
 *         description: Unauthorized, user not authenticated
 *       '404':
 *         description: Plan not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: List all payment reminder plans (Access by All user types)
 *     tags: [Plans]
 *     parameters:
 *       - in: query
 *         name: sortOrder
 *         description: Sort order for the list of plans (asc or desc)
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       '200':
 *         description: List of payment reminder plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PayReminderPlan'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /plans/{id}:
 *   get:
 *     summary: Retrieve a single PayReminder plan
 *     description: Fetch details of a single PayReminder plan by ID.
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the plan
 *     responses:
 *       '200':
 *         description: A single PayReminder plan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Customized message based on the plan and user type
 *                 plan:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The plan ID
 *                     name:
 *                       type: string
 *                       description: The plan name
 *                     features:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: The features of the plan
 *                     yearlyPrice:
 *                       type: number
 *                       description: The yearly price of the plan
 *                     monthlyPrice:
 *                       type: number
 *                       description: The monthly price of the plan
 *                     customize_content:
 *                       type: boolean
 *                       description: Indicates if the plan includes customized content features
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Plan not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PayReminderPlan:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         features:
 *           type: array
 *           items:
 *             type: string
 *         yearlyPrice:
 *           type: number
 *         monthlyPrice:
 *           type: number
 *         customize_content:
 *           type: boolean
 *         total_customers:
 *           type: number
 *         total_sms:
 *           type: number
 *         total_email:
 *           type: number
 */

