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
 *               total_companies:
 *                 type: number
 *               total_customers_in_company:
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
 */
