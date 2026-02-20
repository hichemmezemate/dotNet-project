# 📁 Système de Gestion de Demandes (Azure AD & Admin Local)

Une application Web Full-Stack permettant aux utilisateurs de soumettre des dossiers via leur compte Microsoft (Azure Entra ID) et aux administrateurs de valider ou refuser ces demandes via un accès local sécurisé.

---

## 🚀 Fonctionnalités

### 👤 Côté Utilisateur (Authentification Microsoft / Azure AD)

- **SSO Microsoft** : Connexion sécurisée via le portail Microsoft.
- **Synchronisation JIT** : Enregistrement automatique (Just-In-Time) de l'utilisateur dans la base de données lors de la première connexion.
- **Dépôt de dossiers** : Formulaire de création de demandes (Nom, Prénom, Objet, Description).
- **Suivi en temps réel** : Tableau de bord personnel affichant l'état des demandes soumises (En attente, Validé, Refusé).

### 🛡️ Côté Administrateur (Authentification Locale par Cookie)

- **Portail dédié** : Accès via la route `/admin-login` avec des identifiants locaux (séparé d'Azure AD).
- **Gestion centralisée** : Tableau de bord listant toutes les demandes de tous les utilisateurs.
- **Actions de validation** : Boutons d'acceptation ou de refus des dossiers (se désactivent automatiquement une fois l'action effectuée).
- **Sécurité renforcée** : Protection des routes API via un schéma de Cookies (`AdminScheme`).

---

## 🏗️ Architecture du Projet

Le projet est divisé en deux parties principales : un backend **.NET 9** et un frontend **React/Vite**.

### Backend (Architecture Hexagonale)

Le backend respecte les principes de l'**Architecture Hexagonale** (Ports et Adaptateurs), garantissant un code fortement découplé et testable :

- **Domain** : Entités métier (`Demande`, `Utilisateur`) et interfaces (Ports) des repositories. Indépendant de tout framework.
- **Application** : Logique métier (`DemandeService`, `UserService`) et interfaces des services.
- **Infrastructure** : Implémentations techniques (Adaptateurs) : Entity Framework Core (PostgreSQL) et extraction des Claims JWT.
- **Web (API)** : Contrôleurs REST et configuration hybride de l'authentification (JWT pour Azure, Cookies pour l'Admin).

### Frontend (SPA React)

- **Framework** : React.js via Vite pour des performances optimales.
- **Styling** : Tailwind CSS pour un design moderne et responsive.
- **Routing** : React Router DOM avec séparation stricte des routes (User vs Admin).
- **Authentification** : `@azure/msal-react` pour la gestion des tokens Microsoft.

---

## ⚙️ Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [Docker](https://www.docker.com/) (pour lancer la base de données facilement)
- Une application enregistrée sur le portail **Azure Entra ID** (avec accès `User.Read` et un scope API défini).

---

## 🚀 Installation & Configuration

### 1. Cloner le dépôt

### 2. Lancement de la Base de données (Docker)

Démarrez une instance PostgreSQL prête à l'emploi via Docker sur le port `5432` :

```bash
docker run --name postgresdb -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=root -e POSTGRES_DB=demandesdb -p 5432:5432 -d postgres:latest
```

### 3. Configuration & Lancement du Backend

Naviguez dans le dossier `backend/` et créez un fichier `.env` à la racine de ce dossier :

```env
# Connexion à la base de données PostgreSQL (Correspond au Docker ci-dessus)
DB_CONNECTION_STRING=Host=localhost;Port=5432;Database=demandesdb;Username=admin;Password=root

# Configuration Azure AD
AZURE_INSTANCE=[https://login.microsoftonline.com/](https://login.microsoftonline.com/)
AZURE_DOMAIN=votre_domaine.onmicrosoft.com
AZURE_TENANT_ID=votre_tenant_id_azure
AZURE_CLIENT_ID=votre_client_id_azure

# Identifiants de l'administrateur local
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

Appliquez les migrations pour créer les tables puis lancez le serveur :

```bash
cd backend
dotnet ef database update
dotnet run
```

_Le backend sera accessible sur `http://localhost:5067`._

### 4. Configuration & Lancement du Frontend

Ouvrez un nouveau terminal, naviguez dans le dossier `frontend/` et créez un fichier `.env` à la racine :

```env
# Identifiants Azure AD pour le Front
VITE_MSAL_CLIENT_ID=votre_client_id_azure
VITE_MSAL_AUTHORITY=[https://login.microsoftonline.com/votre_tenant_id_azure](https://login.microsoftonline.com/votre_tenant_id_azure)
VITE_MSAL_REDIRECT_URI=http://localhost:5173

# Scopes
VITE_MSAL_SCOPE_USER_READ=User.Read
VITE_MSAL_SCOPE_API=api://votre_client_id_azure/access_as_user
```

Installez les dépendances et lancez le serveur de développement :

```bash
cd frontend
npm install
npm run dev
```

_Le frontend sera accessible sur `http://localhost:5173`._

---

## 🗺️ Navigation & Routes Frontend

| Route Frontend | Accès Requis           | Description                                                    |
| :------------- | :--------------------- | :------------------------------------------------------------- |
| `/`            | Utilisateur (Azure AD) | Accueil / Tableau de bord personnel avec l'état des dossiers.  |
| `/nouveau`     | Utilisateur (Azure AD) | Formulaire de dépôt d'une nouvelle demande.                    |
| `/admin-login` | Public                 | Page de connexion pour l'administrateur (identifiants `.env`). |
| `/admin`       | Administrateur         | Console de gestion pour valider ou refuser les demandes.       |

---

## 🛡️ Sécurité & Authentification Hybride

Ce projet implémente une sécurité avancée avec deux schémas fonctionnant en parallèle sur le même serveur API :

1. **Azure AD (JWT Bearer)** : Protège les routes de soumission (`/api/Demande`). Le frontend React récupère silencieusement un token d'accès Microsoft et l'envoie dans le header `Authorization`.
2. **Authentification Locale (Cookies)** : Protège les routes administratives (`/api/Demande/all`, `/api/Demande/{id}/status`). Utilise des cookies sécurisés (`SameSite=None`, `Secure=Always`) générés via l'endpoint `/api/AdminAuth/login`.
