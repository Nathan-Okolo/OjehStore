const{Router} = require('express')
const authController = require('../controllers/authControllers')
const auth = require('../middleware/auth')
const router = Router()

router.post('/register', authController.signup)
router.post('/login', authController.login)
router.get('/user',auth, authController.get_user)
router.get('/allusers', authController.get_all_user) 


module.exports = router