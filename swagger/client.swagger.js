/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API endpoints for managing clients
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: List clients
 *     tags: [Clients]
 *     description: Retrieve a list of clients
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (minimum 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of clients to return per page (minimum 1)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter clients by name
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         enum: [asc, desc]
 *         description: Sort clients in ascending or descending order
 *     responses:
 *       200:
 *         description: List of clients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       400:
 *         description: Bad request, validation failed
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       500:
 *         description: Internal server error
 */
