const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");

/**
 * @swagger
 * /api/user:
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
router.post("/user", register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login
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
router.post("/login", login);

module.exports = router;
