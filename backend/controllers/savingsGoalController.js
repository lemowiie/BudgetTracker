const SavingsGoal = require('../models/SavingsGoal');
const Transaction = require('../models/Transaction');

// Lister tous les objectifs de l'utilisateur
exports.list = async (req, res) => {
  try {
    const goals = await SavingsGoal.find({ user: req.user.id }).sort({ deadline: 1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Récupérer un objectif
exports.getOne = async (req, res) => {
  try {
    const goal = await SavingsGoal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Objectif introuvable' });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Créer un objectif
exports.create = async (req, res) => {
  try {
    const { title, targetAmount, deadline } = req.body;
    const goal = await SavingsGoal.create({
      user: req.user.id,
      title,
      targetAmount,
      deadline
    });
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ message: 'Erreur de création', error: err.message });
  }
};

// Mettre à jour un objectif
exports.update = async (req, res) => {
  try {
    const goal = await SavingsGoal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!goal) return res.status(404).json({ message: 'Objectif introuvable' });
    res.json(goal);
  } catch (err) {
    res.status(400).json({ message: 'Erreur de mise à jour', error: err.message });
  }
};

// Supprimer un objectif
exports.remove = async (req, res) => {
  try {
    const goal = await SavingsGoal.findByIdAndDelete(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Objectif introuvable' });
    res.json({ message: 'Objectif supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Calculer la progression d’un objectif
exports.progression = async (req, res) => {
  try {
    const goal = await SavingsGoal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Objectif introuvable' });

    // Exemple : calcul basé sur les transactions de type "income"
    const transactions = await Transaction.find({
      user: req.user.id,
      type: 'income'
    });

    const totalIncome = transactions.reduce((sum, t) => sum + t.amount, 0);
    const progression = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

    res.json({
      objectif: goal.targetAmount,
      actuel: goal.currentAmount,
      progression: progression.toFixed(2),
      restant: goal.remainingAmount,
      revenusTotaux: totalIncome
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
