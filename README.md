# AntoMoto — Pack backend corrigé (Netlify + Neon, transactions)

## Ce que contient le ZIP
- `netlify/functions/pingDb.js` — test de connexion DB
- `netlify/functions/submitMessage.js` — INSERT message (transaction + SET LOCAL)
- `netlify/functions/getMessages.js` — SELECT messages user (transaction + SET LOCAL)
- `package.json` — deps `@netlify/neon` + `zod`
- `netlify.toml` — indique `netlify/functions`
- `schema.sql` — à exécuter dans Neon (tables + RLS + policies)

## Étapes (sans terminal)
1) **Dézippe** sur ton PC.
2) Copie **tout le contenu** à la **racine** de ton repo GitHub (à côté de `index.html`), via GitHub Desktop :
   - `Repository > Show in Explorer` → colle les fichiers → **Commit** → **Push**.
3) Sur **Netlify**, redeploie. (L’add‑on **Neon** fournit `NETLIFY_DATABASE_URL` automatiquement.)
4) Dans **Neon > SQL Editor**, ouvre `schema.sql` (depuis ton PC), **copie/colle**, puis **Run**.
5) Teste : `https://TON-DOMAINE/.netlify/functions/pingDb` → doit renvoyer `{ ok: true, now: ... }`.
6) Depuis ton site, envoie le formulaire **Contact** (ça appelle `/.netlify/functions/submitMessage`).  
   Vérifie en DB :  
   ```sql
   select id, user_id, name, email, body, created_at
   from public.messages
   order by created_at desc limit 10;
   ```

### Notes
- `SET LOCAL` nécessite une **transaction**, d’où l’usage de `await sql.begin(...)`.
- Pour lister les messages côté client, active **Netlify Identity** puis appelle `/.netlify/functions/getMessages`.
