import { Router } from 'express';
import { AdvisorCourseFactory } from '../main/factories/AdvisorCourseFactory';
import { authMiddleware } from '../infrastructure/http/middlewares/AuthMiddleware';
import { authorize } from '../infrastructure/http/middlewares/RoleMiddleware';

const advisorCourseRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Advisor Courses
 *     description: Advisor Courses API endpoint
 * securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /advisor-courses/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Advisor Courses
 *     summary: Create link between Advisor and Course.
 *     description: Create link between Advisor and Course.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           description: User login email
 *           schema:
 *             type: object
 *             required:
 *               - advisorId
 *               - courseId
 *               - expirationDate
 *             properties:
 *               advisorId:
 *                 type: integer
 *               courseId:
 *                 type: integer
 *               expirationDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       '201':
 *         description: Linked successfully
 *       '400':
 *         description: Invalid user
 *       '500':
 *         description: Internal server error
 */
advisorCourseRouter.post(
  '/',
  authMiddleware,
  authorize(['administrator']),
  (req, res) => {
    return AdvisorCourseFactory().create(req, res);
  },
);

/**
 * @swagger
 * /advisor-courses/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Advisor Courses
 *     summary: Delete link by ID.
 *     description: Delete link by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Link ID
 *     responses:
 *       '204':
 *         description: A successful response
 *       '404':
 *         description: Link not found
 *       '500':
 *         description: Internal server error
 */
advisorCourseRouter.delete(
  '/delete/:id',
  authMiddleware,
  authorize(['administrator']),
  (req, res) => {
    return AdvisorCourseFactory().delete(req, res);
  },
);

/**
 * @swagger
 * /advisor-courses/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Advisor Courses
 *     summary: Find link by ID.
 *     description: Find link by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Link ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Link not found
 *       '500':
 *         description: Internal server error
 */
advisorCourseRouter.get(
  '/:id',
  authMiddleware,
  authorize(['administrator']),
  (req, res) => {
    return AdvisorCourseFactory().findById(req, res);
  },
);

/**
 * @swagger
 * /advisor-courses/advisor/{advisorId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Advisor Courses
 *     summary: Find all links by advisor ID.
 *     description: Find all links advisor by ID.
 *     parameters:
 *       - in: path
 *         name: advisorId
 *         schema:
 *           type: number
 *         required: true
 *         description: Advisor ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Link not found
 *       '500':
 *         description: Internal server error
 */
advisorCourseRouter.get(
  '/advisor/:advisorId',
  authMiddleware,
  authorize(['administrator']),
  (req, res) => {
    return AdvisorCourseFactory().findAllByAdvisor(req, res);
  },
);

/**
 * @swagger
 * /advisor-courses/course/{courseId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Advisor Courses
 *     summary: Find all links by course ID.
 *     description: Find all links by course ID.
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: number
 *         required: true
 *         description: Course ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Link not found
 *       '500':
 *         description: Internal server error
 */
advisorCourseRouter.get(
  '/course/:courseId',
  authMiddleware,
  authorize(['administrator']),
  (req, res) => {
    return AdvisorCourseFactory().findAllByCourse(req, res);
  },
);

/**
 * @swagger
 * /advisor-courses/search/pair/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Advisor Courses
 *     summary: Search using both Course and Advisor IDs.
 *     description: Search using both Course and Advisor IDs.
 *     parameters:
 *       - in: query
 *         name: advisorId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response
 *       '401':
 *         description: Invalid ids
 *       '500':
 *         description: Internal server error
 */
advisorCourseRouter.get(
  '/search/pair',
  authMiddleware,
  authorize(['administrator']),
  (req, res) => {
    return AdvisorCourseFactory().findByPair(req, res);
  },
);

export default advisorCourseRouter;
