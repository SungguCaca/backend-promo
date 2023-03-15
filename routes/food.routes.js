const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController.js');

router.get('/', foodController.getAllFoods);
router.post('/', foodController.createFood);
router.get('/:foodId', foodController.getFoodById);
router.put('/:foodId', foodController.updateFood);
router.delete('/:foodId', foodController.deleteFood);

module.exports = router;
