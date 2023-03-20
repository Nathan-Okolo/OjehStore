const {Router} = require('express')
const itemController = require('../controllers/itemControllers')
const router = Router()

router.post('/items', itemController.post_items)
router.get('/items', itemController.get_items)
router.put('/items/:id', itemController.update_item)
router.delete('/items/:id', itemController.delete_item)

module.exports = router
// "name": "Ojeh",
// "email": "ojeh@gmail.com",
// "password": 123456789