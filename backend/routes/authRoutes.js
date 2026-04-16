const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin, sanitizeInputs } = require('../middleware/validation');

router.post('/register', sanitizeInputs, validateRegister, register);
router.post('/login', sanitizeInputs, validateLogin, login);
router.get('/me', protect, getMe);

module.exports = router;