const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller')
const {isAdmin, isAuth} = require("../middleware/auth.middleware");

router.post('/create',isAuth,isAdmin,userController.create)
router.patch('/update/:id',isAuth,isAdmin,userController.update)
router.delete('/delete/:id',isAuth,isAdmin,userController.delete)
router.get('/all',isAuth,isAdmin,userController.getAll)
router.get('/:id',isAuth,isAdmin,userController.getOne)

module.exports = router