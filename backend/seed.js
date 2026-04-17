const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); 
const Category = require('./models/Category');
const Transaction = require('./models/Transaction');
const SavingsGoal = require('./models/SavingsGoal');
dotenv.config();
 
const seedDatabase = async () => {
  try {
    const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/budget_tracker';
    await mongoose.connect(dbUri);
    console.log('Connecté à MongoDB');

    await User.deleteMany();
    await Category.deleteMany();
    await Transaction.deleteMany();
    await SavingsGoal.deleteMany();
    console.log('Anciennes données supprimées');

    const user = await User.create({
      name: 'violette sarah',
      email: 'violette@example.com',
      password: 'password123' 
    });
    console.log(`👤 Utilisateur créé: ${user.email} (mdp: password123)`);

    const catSalaire = await Category.create({ name: 'Salaire', user: null }); // null = catégorie globale
    const catCourses = await Category.create({ name: 'Alimentation', user: user._id });
    const catLoisirs = await Category.create({ name: 'Loisirs', user: user._id });
    const catLogement = await Category.create({ name: 'Logement & Charges', user: user._id });
    console.log('Catégories créées');

    const transactions = [
      {
        user: user._id,
        type: 'income',
        amount: 2500,
        category: catSalaire._id,
        description: 'Salaire du mois',
        date: new Date(new Date().setDate(new Date().getDate() - 15)) // Il y a 15 jours
      },
      {
        user: user._id,
        type: 'expense',
        amount: 800,
        category: catLogement._id,
        description: 'Loyer',
        date: new Date(new Date().setDate(new Date().getDate() - 10)) // Il y a 10 jours
      },
      {
        user: user._id,
        type: 'expense',
        amount: 150,
        category: catCourses._id,
        description: 'Courses supermarché',
        date: new Date(new Date().setDate(new Date().getDate() - 2)) // Il y a 2 jours
      },
      {
        user: user._id,
        type: 'expense',
        amount: 60,
        category: catLoisirs._id,
        description: 'Soirée cinéma',
        date: new Date() // Aujourd'hui
      }
    ];
    await Transaction.insertMany(transactions);
    console.log('Transactions créées

    const goals = [
      {
        user: user._id,
        title: 'Voyage d\'été',
        targetAmount: 2000,
        currentAmount: 800,
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)), // Dans 3 mois
        isCompleted: false
      },
      {
        user: user._id,
        title: 'Nouveau téléphone',
        targetAmount: 800,
        currentAmount: 800,
        deadline: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Terminé le mois dernier
        isCompleted: true
      }
    ];
    await SavingsGoal.insertMany(goals);
    console.log('Objectifs d\'épargne créés');
 
    console.log('Base de données remplie avec succès !');
    process.exit(); /
 
  } catch (error) {
    console.error( Erreur lors du peuplement de la DB:', error);
    process.exit(1);
  }
};
seedDatabase();
