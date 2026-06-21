# Contributing

Merci de votre intérêt pour **content-card-linky** !

## Signaler un bug

Utilisez le [template de bug report](.github/ISSUE_TEMPLATE/bug_report.yml).

## Proposer une fonctionnalité

Utilisez le [template de feature request](.github/ISSUE_TEMPLATE/feature_request.yml).

## Pull requests

1. Forkez le dépôt et créez une branche dédiée : `git checkout -b feat/ma-feature`
2. Installez les dépendances : `npm install`
3. Développez dans `src/` — **jamais** dans `dist/`, qui est généré
4. Vérifiez votre travail :

   ```bash
   npm run lint          # ESLint
   npm run format:check  # Prettier
   npm run test          # Vitest
   npm run build         # régénère dist/
   ```

5. Commitez `src/` **et** le `dist/` régénéré (la CI échoue si `dist/` n'est pas à jour)
6. Utilisez des [Conventional Commits](https://www.conventionalcommits.org/) : `feat:`, `fix:`, `chore:`, `docs:`…
7. Ouvrez la pull request vers `main`

## Gestion des dépendances

Ce dépôt utilise **Renovate** (et non Dependabot). Les mises à jour de dépendances
sont ouvertes par `@renovate[bot]` ; suivez-les via le
[Dependency Dashboard](../../issues?q=is%3Aissue+is%3Aopen+Dependency+Dashboard).

## Pre-commit (optionnel)

```bash
pipx install pre-commit   # ou : pipx install prek
pre-commit install
```

Les hooks (`eslint`, `prettier`, vérifications de base) tournent alors avant chaque commit.
