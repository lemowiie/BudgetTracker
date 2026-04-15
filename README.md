# 💸 BudgetFlow — Application de gestion de budget

Projet fil rouge EFREI B2 — Avril 2026

##  Membres du groupe

| Membre | Rôle |
|---|---|
| Seydat BAMBA | Backend (Node.js/Express/MongoDB) + Dashboard Vue.js |
| Marie FIETTE| Frontend Vue.js (pages + design) + Routes objectifs d'épargne |

---

## Technologies utilisées

- **Backend** : Node.js, Express.js (architecture MVC)
- **Base de données** : MongoDB (via Mongoose)
- **Authentification** : JWT (JSON Web Tokens) + bcryptjs
- **Sécurité** : Helmet, express-rate-limit, express-validator, xss
- **Frontend** : Vue.js 3, Vue Router, Pinia, Axios, Chart.js

---

## Procédure d'installation

### Prérequis

- Node.js v18+
- MongoDB installé localement ou un compte MongoDB Atlas

### 1. Cloner le dépôt

```bash
https://github.com/lemowiie/BudgetTracker.git'
cd budget-app
```

### 2. Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` à partir du template :

```bash
cp .env.example .env
```

Remplir les variables dans `.env` :

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/budget_app
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Démarrer le serveur :

```bash
npm run dev      
npm start        
```

L'API sera disponible sur : `http://localhost:5000`

### 3. Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Le frontend sera disponible sur : `http://localhost:5173`

---

## Export de la base de données

La base de données MongoDB peut être exportée avec :

```bash
mongodump --db budget_app --out ./export
```

Et importée avec :

```bash
mongorestore --db budget_app ./export/budget_app
```

Un fichier d'export est disponible dans le dossier `/export` du projet.

---

## Routes API

### Auth
| Méthode | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion |
| GET | `/api/auth/me` | Profil utilisateur |

### Transactions
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/transactions` | Lister les transactions |
| POST | `/api/transactions` | Créer une transaction |
| GET | `/api/transactions/:id` | Détail d'une transaction |
| PUT | `/api/transactions/:id` | Modifier une transaction |
| DELETE | `/api/transactions/:id` | Supprimer une transaction |
| GET | `/api/transactions/stats` | Statistiques et KPIs |

### Objectifs d'épargne
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/savings` | Lister les objectifs |
| POST | `/api/savings` | Créer un objectif |
| PUT | `/api/savings/:id` | Modifier un objectif |
| DELETE | `/api/savings/:id` | Supprimer un objectif |

---

## Sécurité

- Mots de passe hashés avec **bcryptjs** (salt rounds: 10)
- Routes protégées par **JWT** (Bearer token)
- Protection **XSS** sur tous les inputs (librairie xss)
- **Rate limiting** : 100 req/15min global, 10 req/15min sur les routes auth
- Headers HTTP sécurisés via **Helmet**
- Validation des données côté serveur via **express-validator**
- Taille des payloads limitée à 10kb
