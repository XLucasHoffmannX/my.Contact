const router = require('express').Router();
const auth = require('../middlewares/auth')
const categoryCtrl = require('../controllers/categoryCtrl');

router.route('/category')
  .get(auth, categoryCtrl.getCategory)
  .post(auth, categoryCtrl.createCategory);

router.route('/category/:id').delete(auth, categoryCtrl.removeCategory);

module.exports = router;