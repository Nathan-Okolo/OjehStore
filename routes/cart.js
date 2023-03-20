const { Router } = require('express')
const cartController = require('../controllers/cartControllers')
const router = Router()

router.post('/cart/:userId', cartController.add_cart_items)
router.get('/cart/:userId', cartController.get_cart_items)
router.delete('/cart/:userId/:itemId', cartController.delete_item)

module.exports = router;