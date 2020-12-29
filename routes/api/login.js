const router = require('express').Router();
var userController = require('../../controllers/userController');

router.post('/', userController.login_user_post);

module.exports = router;