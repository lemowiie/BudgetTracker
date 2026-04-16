const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const savingsCtrl = require('../controllers/savingsGoal.controller');

router.use(auth);

router.get('/', savingsCtrl.list);
router.get('/:id', savingsCtrl.getOne);
router.post('/', savingsCtrl.create);
router.put('/:id', savingsCtrl.update);
router.delete('/:id', savingsCtrl.remove);
router.get('/:id/progression', savingsCtrl.progression);

module.exports = router;
