# AntoMoto Site

Site vitrine moderne pour réservations moto/motocross. Les messages envoyés via le formulaire de contact sont stockés dans un petit fichier JSON faisant office de base de données et consultables via un panneau d'administration.

## Lancer le serveur API

```bash
npm start
```

Le serveur écoute sur `http://localhost:3000` et expose :

- `POST /api/messages` – enregistre un message `{name,email,message}`.
- `GET /api/messages` – liste les messages (nécessite l'en-tête `x-admin-token: secret123`).

## Interface

- `index.html` : page publique avec le formulaire de contact.
- `admin.html` : panneau d'administration affichant les messages (utilise le jeton d'exemple `secret123`).

> Pour un déploiement sur Netlify, adapter l'API en fonction des fonctions serverless ou d'une base de données gérée par un plugin.

