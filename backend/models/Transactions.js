const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Le type est obligatoire (income/expense)']
  },
  amount: {
    type: Number,
    required: [true, 'Le montant est obligatoire'],
    min: [0.01, 'Le montant doit être positif']
  },
  category: {
    type: String,
    required: [true, 'La catégorie est obligatoire'],
    enum: [
      'salaire', 'freelance', 'investissement', 'autre_revenu',
      'alimentation', 'logement', 'transport', 'sante',
      'loisirs', 'education', 'vetements', 'abonnements', 'autre_depense'
    ]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'La description ne peut pas dépasser 200 caractères']
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  timestamps: true
});


transactionSchema.index({ user: 1, date: -1 });
transactionSchema.index({ user: 1, type: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);