const mongoose = require('mongoose');

const savingsGoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, "Le titre de l'objectif est obligatoire"],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  targetAmount: {
    type: Number,
    required: [true, "Le montant cible est obligatoire"],
    min: [1, 'Le montant cible doit être positif']
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: [0, 'Le montant actuel ne peut pas être négatif']
  },
  deadline: {
    type: Date,
    required: [true, "La date limite est obligatoire"]
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

savingsGoalSchema.virtual('progressPercent').get(function () {
  if (this.targetAmount === 0) return 0;
  return Math.min(Math.round((this.currentAmount / this.targetAmount) * 100), 100);
});
savingsGoalSchema.virtual('remainingAmount').get(function () {
  return Math.max(this.targetAmount - this.currentAmount, 0);
});

module.exports = mongoose.model('SavingsGoal', savingsGoalSchema);