# AntoMoto — Netlify + Neon backend pack

## Contenu
- `netlify/functions/pingDb.js` — test de connexion DB
- `netlify/functions/submitMessage.js` — crée un message (anonyme ou lié au user)
- `netlify/functions/getMessages.js` — liste les messages du user (Netlify Identity)
- `package.json` — dépendances `@netlify/neon` + `zod`
- `netlify.toml` — dossier des fonctions
- `schema.sql` — à exécuter dans Neon (SQL Editor)

## Installation
1) Ajoute **tous** ces fichiers à la **racine** du repo (à côté de `index.html`). Commit & Push.
2) Dans Netlify, redeploie. L’add-on Neon fournit `NETLIFY_DATABASE_URL` automatiquement.
3) Teste : `/.netlify/functions/pingDb` → renvoie `{ ok: true, now: ... }`.
4) Dans le front, envoie le formulaire vers `/.netlify/functions/submitMessage` en POST (JSON).

## Optionnel
- Active **Netlify Identity** pour que `getMessages` retourne uniquement les messages du client connecté.
