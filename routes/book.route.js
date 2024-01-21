const Router = require('express');
const router = new Router();
const bookController = require('../controllers/book.controller')
const {isAdmin, isAuth} = require("../middleware/auth.middleware");

router.post('/create',isAuth,isAdmin,bookController.create)
router.patch('/update/:id',isAuth,isAdmin,bookController.update)
router.delete('/delete/:id',isAuth,isAdmin,bookController.delete)
router.get('/all',bookController.getAll)
router.get('/:id',bookController.getOne)

module.exports = router