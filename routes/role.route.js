const Router = require('express');
const router = new Router();
const roleController = require('../controllers/role.controller')
const {isAdmin, isAuth} = require("../middleware/auth.middleware");

router.post('/create',isAuth,isAdmin,roleController.create)
router.patch('/update/:id',isAuth,isAdmin,roleController.update)
router.delete('/delete/:id',isAuth,isAdmin,roleController.delete)
router.get('/all',isAuth,isAdmin,roleController.getAll)
router.get('/:id',isAuth,isAdmin,roleController.getOne)

module.exports = router