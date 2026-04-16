const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom de la catégorie est obligatoire"],
    trim: true,
    maxlength: [50, "Le nom ne peut pas dépasser 50 caractères"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null 
  }
}, { timestamps: true });

categorySchema.index({ name: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Category', categorySchema);
