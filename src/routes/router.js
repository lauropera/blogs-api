const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const categoriesRouter = require('./categories.router');
const blogPostRouter = require('./post.router');

const routers = express.Router();

routers.use('/login', authRouter);
routers.use('/user', userRouter);

routers.use('/categories', authMiddleware.validateToken, categoriesRouter);
routers.use('/post', authMiddleware.validateToken, blogPostRouter);

module.exports = routers;
