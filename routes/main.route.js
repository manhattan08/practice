const Router = require('express');
const router = new Router();
const authRouter = require('./auth.route');
const bookRouter = require('./book.route');
const userRouter = require('./user.route');
const roleRouter = require('./role.route');

router.use('/auth',authRouter);
router.use('/book',bookRouter);
router.use('/user',userRouter);
router.use('/role',roleRouter);

module.exports = router