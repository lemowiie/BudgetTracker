# 💰 BudgetTracker — Application de gestion de budget personnel

Projet fil rouge EFREI B2 — Avril 2026

---

## Membres du groupe

| Membre | Rôle |
|--------|------|
| Seydat BAMBA | Backend (Node.js / Express / MongoDB) + Routes |
| Marie FIETTE | Frontend Vue.js (pages + design) + Routes objectifs d'épargne |

---

## Technologies utilisées

**Backend :** Node.js, Express.js (architecture MVC)

**Base de données :** MongoDB (via Mongoose)

**Authentification :** JWT (JSON Web Tokens) + bcryptjs

**Sécurité :** Helmet, express-rate-limit, express-validator, xss

**Frontend :** Vue.js 3, Vue Router, Vite

---

## Fonctionnalités principales

- Inscription et connexion avec authentification JWT
- Gestion des transactions (revenus et dépenses) avec catégories personnalisables
- Statistiques financières : bilan mensuel, annuel, évolution mois par mois, répartition des dépenses par catégorie
- Objectifs d'épargne avec suivi de progression (montant actuel, montant cible, date limite)
- Filtrage et pagination des transactions (par type, catégorie, période)
- Endpoint de santé de l'API (`GET /api/health`)

---

## Structure du projet

```
BudgetTracker/
├── backend/
│   ├── config/
│   │   └── db.js                  # Connexion MongoDB
│   ├── controllers/
│   │   ├── authController.js      # Inscription, connexion, profil
│   │   ├── transactionController.js
│   │   ├── savingsGoalController.js
│   │   └── categoryController.js
│   ├── middleware/
│   │   ├── auth.js                # Vérification JWT
│   │   └── validation.js          # Validation + sanitisation XSS
│   ├── models/
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   ├── SavingsGoal.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── savingsGoalRoutes.js
│   │   └── categoryRoutes.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── LoginPage.vue
    │   │   ├── RegisterPage.vue
    │   │   ├── DashboardPage.vue
    │   │   ├── TransactionsPage.vue
    │   │   └── ObjectifsPage.vue
    │   ├── router/
    │   │   └── index.js
    │   ├── App.vue
    │   └── main.js
    └── package.json
```

---

## Procédure d'installation

### Prérequis

- Node.js v20+
- MongoDB installé localement ou un compte MongoDB Atlas

### 1. Cloner le dépôt

```bash
git clone https://github.com/lemowiie/BudgetTracker.git
cd BudgetTracker
```

### 2. Backend

```seed
node seed.js
```


```bash
cd backend
npm install
```

Créer un fichier `.env` à la racine du dossier `backend/` :

```bash
cp .env.example .env
```

Remplir les variables dans `.env` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/budget_tracker
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Démarrer le serveur :

```bash
npm run dev   # mode développement (nodemon)
npm start     # mode production
```

L'API sera disponible sur : `http://localhost:5000`

Vérification : `GET http://localhost:5000/api/health` doit retourner `{ success: true, message: "API opérationnelle" }`

### 3. Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Le frontend sera disponible sur : `http://localhost:5173`

---

## Export de la base de données

Exporter la base :

```bash
mongodump --db budget_tracker --out ./export
```

Importer la base :

```bash
mongorestore --db budget_tracker ./export/budget_tracker
```

Un fichier d'export est disponible dans le dossier `/export` du projet.

---

## Routes API

### Authentification

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|:---:|
| POST | `/api/auth/register` | Inscription | ✗ |
| POST | `/api/auth/login` | Connexion | ✗ |
| GET | `/api/auth/me` | Profil de l'utilisateur connecté | ✓ |

### Transactions

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|:---:|
| GET | `/api/transactions` | Lister les transactions (filtres + pagination) | ✓ |
| POST | `/api/transactions` | Créer une transaction | ✓ |
| GET | `/api/transactions/stats` | Statistiques et KPIs financiers | ✓ |
| GET | `/api/transactions/:id` | Détail d'une transaction | ✓ |
| PUT | `/api/transactions/:id` | Modifier une transaction | ✓ |
| DELETE | `/api/transactions/:id` | Supprimer une transaction | ✓ |

**Paramètres de filtrage disponibles sur `GET /api/transactions` :**

| Paramètre | Type | Description |
|-----------|------|-------------|
| `type` | `income` \| `expense` | Filtrer par type |
| `category` | ObjectId | Filtrer par catégorie |
| `startDate` | ISO 8601 | Date de début |
| `endDate` | ISO 8601 | Date de fin |
| `page` | Nombre | Page (défaut : 1) |
| `limit` | Nombre | Résultats par page (défaut : 20) |

### Objectifs d'épargne

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|:---:|
| GET | `/api/savings` | Lister les objectifs | ✓ |
| POST | `/api/savings` | Créer un objectif | ✓ |
| GET | `/api/savings/:id` | Détail d'un objectif | ✓ |
| PUT | `/api/savings/:id` | Modifier un objectif | ✓ |
| DELETE | `/api/savings/:id` | Supprimer un objectif | ✓ |
| GET | `/api/savings/:id/progression` | Progression d'un objectif (%, montant restant) | ✓ |

### Catégories

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|:---:|
| GET | `/api/categories` | Lister les catégories | ✓ |
| POST | `/api/categories` | Créer une catégorie personnalisée | ✓ |

> **Note :** Une catégorie personnalisée peut également être créée à la volée lors de la création d'une transaction en passant `category: "personnalisee"` et `customCategoryName: "Nom"`.

---

## Modèles de données

### User

| Champ | Type | Contraintes |
|-------|------|-------------|
| `name` | String | Requis, max 50 caractères |
| `email` | String | Requis, unique, format email valide |
| `password` | String | Requis, min 6 caractères (hashé bcrypt) |
| `createdAt` | Date | Automatique |

### Transaction

| Champ | Type | Contraintes |
|-------|------|-------------|
| `user` | ObjectId | Référence User, requis |
| `type` | String | `income` ou `expense`, requis |
| `amount` | Number | Requis, min 0.01 |
| `category` | ObjectId | Référence Category, requis |
| `description` | String | Optionnel, max 200 caractères |
| `date` | Date | Requis, défaut : maintenant |

### SavingsGoal

| Champ | Type | Contraintes |
|-------|------|-------------|
| `user` | ObjectId | Référence User, requis |
| `title` | String | Requis, max 100 caractères |
| `targetAmount` | Number | Requis, min 1 |
| `currentAmount` | Number | Défaut : 0 |
| `deadline` | Date | Requis |
| `isCompleted` | Boolean | Défaut : false |

> Les champs virtuels `progressPercent` et `remainingAmount` sont calculés automatiquement.

### Category

| Champ | Type | Contraintes |
|-------|------|-------------|
| `name` | String | Requis, max 50 caractères |
| `user` | ObjectId | Référence User (null = catégorie globale) |

---

## Sécurité

- Mots de passe hashés avec **bcryptjs** (salt rounds : 10)
- Routes protégées par **JWT** (Bearer token dans le header `Authorization`)
- Protection **XSS** sur tous les inputs texte (librairie `xss`)
- **Rate limiting** : 100 req/15min (global) — 10 req/15min (routes auth)
- Headers HTTP sécurisés via **Helmet**
- Validation des données côté serveur via **express-validator**
- Taille des payloads limitée à **10kb**
- Les erreurs internes ne sont exposées qu'en mode `development`
