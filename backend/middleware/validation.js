const { body, validationResult } = require('express-validator');
const xss = require('xss');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};
 
const sanitizeInputs = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key].trim());
      }
    }
  }
  next();
};
 
const validateRegister = [
  body('name')
    .notEmpty().withMessage('Le nom est obligatoire')
    .isLength({ max: 50 }).withMessage('Le nom est trop long'),
  body('email')
    .isEmail().withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),
  handleValidationErrors
];
 
const validateLogin = [
  body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
  body('password').notEmpty().withMessage('Le mot de passe est obligatoire'),
  handleValidationErrors
];
 
const validateTransaction = [
  body('type')
    .isIn(['income', 'expense']).withMessage('Type invalide (income ou expense)'),
  body('amount')
    .isFloat({ min: 0.01 }).withMessage('Le montant doit être un nombre positif'),
  body('category')
    .notEmpty().withMessage('La catégorie est obligatoire'),
  body('description')
    .optional()
    .isLength({ max: 200 }).withMessage('La description est trop longue'),
  body('date')
    .optional()
    .isISO8601().withMessage('Date invalide'),
  handleValidationErrors
];
 
module.exports = {
  sanitizeInputs,
  validateRegister,
  validateLogin,
  validateTransaction
};