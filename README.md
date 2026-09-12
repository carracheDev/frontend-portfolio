# Frontend portfolio

Application Next.js qui présente les deux APIs PHP du portfolio.

## Développement local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Les APIs doivent être disponibles sur `http://localhost:8080` et `http://localhost:8000`.

## Déploiement Vercel

Dans les variables d’environnement du projet Vercel, définir les URLs publiques :

```env
NEXT_PUBLIC_TASKS_API_URL=https://api-taches.example.com
NEXT_PUBLIC_LIBRARY_API_URL=https://api-bibliotheque.example.com/api
```

Le build utilisé par Vercel est `npm run build`.
# frontend-portfolio
