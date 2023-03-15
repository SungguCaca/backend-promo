// const express = require('express');
// const router = express.Router();
// const promoController = require('../controllers/promoController.js');

// // Get all promos
// router.get('/', promoController.getAllPromos);

// // Create a new promo
// router.post('/', promoController.createPromo);

// // Update the usage of a promo
// router.put('/:id/use', promoController.usePromo);

// // Check if a promo code is valid for all users
// router.get('/:promoCode/check', promoController.checkPromo);

// // Check if a promo code is valid for a specific user
// router.get('/:promoCode/check/:userId', promoController.checkPromo);

// module.exports = router;
const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController.js');

router.get('/:promoCode/:userId', promoController.checkPromo);

module.exports = router;
