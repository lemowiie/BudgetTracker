const Category = require('../models/Category');
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      $or: [
        { user: null },
        { user: req.user.id }
      ]
    }).sort({ name: 1 });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des catégories", error: error.message });
  }
};

// Créer une categorie
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const cat = await Category.create({
      name,
      user: req.user.id,
    });
    res.status(201).json(cat);
  } catch (err) {
    res.status(400).json({ message: 'Erreur de création', error: err.message });
  }
};