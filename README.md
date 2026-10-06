# Le Coup de Feu

Site React/Vite d’un restaurant fictif inspiré de l’énergie de Hell’s Kitchen.

## Développement

```sh
npm install
npm run dev
npm run build
```

Le déploiement GitHub Pages conserve la base `/le-coup-de-feu/` avec `GITHUB_PAGES=true`.

## Refonte

- Accueil photographique, carte illustrée, sections éditoriales et présentation mobile.
- Brigades rouge/bleue : couleur d’accent, réplique du chef et ticket associés.
- Compteur interactif, filtres de carte, FAQ et navigation mobile accessibles au clavier.
- Réservation simulée : validation de date, capacité des tables et ticket local. Aucune donnée du formulaire n’est envoyée.
- Carte OpenStreetMap chargée à la demande ; lien externe disponible.
- Animations désactivées si la préférence de réduction des mouvements est active.

Les nouvelles images et leurs prompts sont documentés dans [IMAGE-PROMPTS.md](IMAGE-PROMPTS.md). Les anciens PNG sont conservés.

## Vérification navigateur

`scripts/verify.cjs` contrôle les interactions avec Playwright et Microsoft Edge. Il nécessite Playwright disponible localement (`playwright`) ou un chemin de module dans `PLAYWRIGHT_MODULE`. Le serveur doit être démarré sur le port 5178, ou son URL fournie via `TEST_URL`.

```sh
node scripts/verify.cjs
```

Les captures sont écrites dans `artifacts/`, exclu de Git. Le script teste les filtres, le choix de brigade, la capacité, le ticket, le compteur, la FAQ, les images, la navigation mobile, les débordements à 320/390/768 px et la réduction des mouvements.
