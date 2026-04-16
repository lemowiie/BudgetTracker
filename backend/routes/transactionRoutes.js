const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getStats
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');
const { validateTransaction } = require('../middleware/validation');
router.use(protect);

router.get('/stats', getStats);
router.route('/')
  .get(getTransactions)
  .post(validateTransaction, createTransaction);

router.route('/:id')
  .get(getTransaction)
  .put(validateTransaction, updateTransaction)
  .delete(deleteTransaction);

module.exports = router;