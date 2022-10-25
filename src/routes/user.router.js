const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/', userController.createNewUser);

router.use(authMiddleware.validateToken);
router.get('/', userController.getAllUsers);
router.delete('/me', userController.deleteSelfUser);
router.get('/:id', userController.getUserById);

module.exports = router;
