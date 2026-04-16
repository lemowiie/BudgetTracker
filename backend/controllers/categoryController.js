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