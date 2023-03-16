const express = require("express");
const router = express.Router();
const {
  addRestaurant,
  getAllRestaurant,
  getRecommendRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");
const { authentication } = require("../utils/jwt");

//取得所有餐廳
/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get a list restaurants for this user
 *     tags:
 *      - Restaurant
 *     description: Get a list restaurants for this user
 *     responses:
 *       200:
 *         description: Success! return a list of restaurants
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/restaurants", authentication, getAllRestaurant);

//取得推薦餐廳
/**
 * @swagger
 * /api/recommendation:
 *   get:
 *     summary: Get a recommend restaurant for this user
 *     tags:
 *      - Restaurant
 *     description: Get a recommend restaurant for this user
 *     responses:
 *       200:
 *         description: Success! return a list of restaurants
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/recommendation", authentication, getRecommendRestaurant);

//新增一筆餐廳
/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags:
 *      - Restaurant
 *     parameters:
 *      - in: body
 *        name: body
 *        description: Restaurant object (without id and username)
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - phone
 *            - address
 *            - image
 *          properties:
 *            name:
 *              type: string
 *            phone:
 *              type: string
 *            address:
 *              type: string
 *            image:
 *              type: string
 *
 *     description: Add a new restaurant
 *     responses:
 *       200:
 *         description: Success! return the new restaurant object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/restaurants", authentication, addRestaurant);

//取得指定id餐廳資訊
/**
 * @swagger
 * /api/restaurants/:id:
 *   get:
 *     summary: Get a restaurant info from its id
 *     tags:
 *      - Restaurant
 *     description: Get a restaurant info from its id
 *     responses:
 *       200:
 *         description: Success! return the specific id restaurant object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Restaurant not found
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.get("/restaurants/:id", authentication, getRestaurant);

//更新指定id餐廳資訊
/**
 * @swagger
 * /api/restaurants/:id:
 *   put:
 *     summary: Update a specified restaurant by its id.
 *     tags:
 *      - Restaurant
 *     parameters:
 *      - in: body
 *        name: body
 *        description: Restaurant object (without username)
 *        schema:
 *          type: object
 *          required:
 *            - id
 *            - name
 *            - phone
 *            - address
 *            - image
 *          properties:
 *            id:
 *              type: string
 *            name:
 *              type: string
 *            phone:
 *              type: string
 *            address:
 *              type: string
 *            image:
 *              type: string
 *
 *     description: Update a restaurant
 *     responses:
 *       200:
 *         description: Success! return the updated restaurant object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Restaurant not found
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.put("/restaurants/:id", authentication, updateRestaurant);

//刪除指定id餐廳資訊
/**
 * @swagger
 * /api/restaurants/:id:
 *   delete:
 *     summary: Delete a specified restaurant by its id.
 *     tags:
 *      - Restaurant
 *     responses:
 *       200:
 *         description: Success! return the deleted restaurant name
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Restaurant not found
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.delete("/restaurants/:id", authentication, deleteRestaurant);

module.exports = router;
