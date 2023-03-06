const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/userController");

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
 */
router.post("/user", createUser);

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
 */
router.post("/login", login);

module.exports = router;
