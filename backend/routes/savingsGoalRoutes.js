const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const savingsCtrl = require('../controllers/savingsGoalController');

router.use(protect);

router.get('/', savingsCtrl.list);
router.get('/:id', savingsCtrl.getOne);
router.post('/', savingsCtrl.create);
router.put('/:id', savingsCtrl.update);
router.delete('/:id', savingsCtrl.remove);
router.get('/:id/progression', savingsCtrl.progression);

module.exports = router;
