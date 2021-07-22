const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

// auth
const auth = require('../middlewares/auth');

// register
router.post('/register', userCtrl.register);

// login
router.post('/login', userCtrl.login);

// logout 
router.get('/logout', userCtrl.logout);

// refresh
router.get('/refresh', userCtrl.refreshToken);

// infor
router.get('/infor', auth, userCtrl.getUser);

module.exports = router;