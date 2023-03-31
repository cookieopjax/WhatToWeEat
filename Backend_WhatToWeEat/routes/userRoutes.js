const express = require("express");

const router = express.Router();
const {
  register,
  login,
  authentication,
} = require("../controllers/userController");
const { errorWrapper } = require("../middlewares/errorHandler");
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Create a new user
 *     tags:
 *      - Users
 *     description: Create a new user to database
 *     parameters:
 *      - in: body
 *        name: body
 *        description: Username and password to authenticate
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       200:
 *         description: New user name
 *       409:
 *         description: The username is already taken
 */
router.post("/register", errorWrapper(register));

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login to get token
 *     tags:
 *      - Users
 *     description: Login to get jwt
 *     parameters:
 *      - in: body
 *        name: body
 *        description: Username and password to authenticate
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       200:
 *         description: JWT
 *       404:
 *         description: User not found
 *       401:
 *         description: Incorrect password.
 */
router.post("/login", errorWrapper(login));

/**
 * @swagger
 * /api/authentication:
 *   get:
 *     summary: Verify authorization and identity
 *     tags:
 *      - Users
 *     description: check your jwt
 *     responses:
 *       200:
 *         description: return username
 *       401:
 *         description: Unauthorized
 */
router.get("/authentication", errorWrapper(authentication));

module.exports = router;
