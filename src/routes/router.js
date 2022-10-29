const express = require('express');

const { validateToken } = require('../middlewares/auth.middleware');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const categoriesRouter = require('./categories.router');
const blogPostRouter = require('./post.router');

const routers = express.Router();

routers.use('/login', authRouter);
routers.use('/user', userRouter);

routers.use('/categories', validateToken, categoriesRouter);
routers.use('/post', validateToken, blogPostRouter);

module.exports = routers;
