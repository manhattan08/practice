const Router = require('express');
const router = new Router();
const userController = require('../controllers/auth.controller')

router.post('/registration',userController.registration)
router.post('/login',userController.login)

module.exports = router