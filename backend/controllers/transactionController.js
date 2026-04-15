const Transaction = require('../models/Transaction');
const Category = require('../models/Category'); 

const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date, customCategoryName } = req.body;

    let finalCategoryId = category; 
    if (category === 'personnalisee') {
      if (!customCategoryName) {
        return res.status(400).json({ success: false, message: "Le nom de la catégorie personnalisée est requis." });
      }
      let existingCategory = await Category.findOne({ name: customCategoryName, user: req.user._id });
      
      if (!existingCategory) {
        // Sinon on la crée
        existingCategory = await Category.create({
          name: customCategoryName,
          user: req.user._id
        });
      }
      finalCategoryId = existingCategory._id;
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category: finalCategoryId, 
      description,
      date: date || Date.now()
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la création', error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate, page = 1, limit = 20 } = req.query;

    const filter = { user: req.user._id };
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Transaction.countDocuments(filter);
    const transactions = await Transaction.find(filter)
      .populate('category') 
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: transactions
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération', error: error.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('category'); 

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction introuvable' });
    }

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date, customCategoryName } = req.body;

    let finalCategoryId = category; 

    if (category === 'personnalisee') {
      if (!customCategoryName) {
        return res.status(400).json({ success: false, message: "Le nom de la catégorie personnalisée est requis." });
      }

      let existingCategory = await Category.findOne({ name: customCategoryName, user: req.user._id });
      
      if (!existingCategory) {
        existingCategory = await Category.create({
          name: customCategoryName,
          user: req.user._id
        });
      }
      finalCategoryId = existingCategory._id;
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { type, amount, category: finalCategoryId, description, date }, // <-- MODIFICATION : On utilise finalCategoryId
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction introuvable' });
    }

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la modification', error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction introuvable' });
    }

    res.status(200).json({ success: true, message: 'Transaction supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression', error: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const yearTransactions = await Transaction.find({
      user: userId,
      date: { $gte: startOfYear }
    }).populate('category'); 
    const monthTransactions = yearTransactions.filter(t => t.date >= startOfMonth);

    const totalIncomeYear = yearTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenseYear = yearTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balanceYear = totalIncomeYear - totalExpenseYear;

    const totalIncomeMonth = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenseMonth = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenseByCategory = {};
    monthTransactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const catName = t.category && t.category.name ? t.category.name : t.category;
        expenseByCategory[catName] = (expenseByCategory[catName] || 0) + t.amount;
      });

    const monthlyEvolution = [];
    for (let m = 0; m <= now.getMonth(); m++) {
      const mStart = new Date(now.getFullYear(), m, 1);
      const mEnd = new Date(now.getFullYear(), m + 1, 0);
      const mTransactions = yearTransactions.filter(t => t.date >= mStart && t.date <= mEnd);

      const income = mTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
      const expense = mTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

      monthlyEvolution.push({
        month: mStart.toLocaleString('fr-FR', { month: 'short' }),
        income: Math.round(income * 100) / 100,
        expense: Math.round(expense * 100) / 100,
        balance: Math.round((income - expense) * 100) / 100
      });
    }

    res.status(200).json({
      success: true,
      data: {
        year: {
          totalIncome: Math.round(totalIncomeYear * 100) / 100,
          totalExpense: Math.round(totalExpenseYear * 100) / 100,
          balance: Math.round(balanceYear * 100) / 100
        },
        month: {
          totalIncome: Math.round(totalIncomeMonth * 100) / 100,
          totalExpense: Math.round(totalExpenseMonth * 100) / 100,
          balance: Math.round((totalIncomeMonth - totalExpenseMonth) * 100) / 100
        },
        expenseByCategory,
        monthlyEvolution
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors des statistiques', error: error.message });
  }
};

module.exports = 
{
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getStats
};