# content-card-linky

[![HACS Supported](https://img.shields.io/badge/HACS-Supported-green.svg)](https://github.com/hacs/integration)
[![CI](https://github.com/foXaCe/content-card-linky/actions/workflows/ci.yml/badge.svg)](https://github.com/foXaCe/content-card-linky/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/foXaCe/content-card-linky)](https://github.com/foXaCe/content-card-linky/releases)
[![License](https://img.shields.io/github/license/foXaCe/content-card-linky)](LICENSE)

> **Compatible uniquement avec l'intégration [MyElectricalData](https://github.com/MyElectricalData/myelectricaldata_import).**

Une question ? Un problème ? Une demande ? Le [forum HACF](https://forum.hacf.fr/) est le bon endroit.

---

## Pré-requis

- Home Assistant **2024.7+** (la carte expose `getGridOptions` pour la *section view*).
- L'intégration [MyElectricalData](https://github.com/MyElectricalData/myelectricaldata_import) installée et fonctionnelle.

## Installation

### Via HACS (recommandé)

1. Ouvre **HACS**.
2. Menu trois-points en haut à droite → **Custom repositories**.
3. Ajoute le dépôt `https://github.com/foXaCe/content-card-linky`, catégorie **Dashboard**.
4. Recherche *Linky Content Card* dans HACS, puis **Download**.
5. Recharge la page Lovelace (ou redémarre HA si l'asset n'est pas servi).

> ℹ️ Depuis HACS 2.0, l'onglet « Frontend » a disparu : tout passe par la liste unifiée et la catégorie **Dashboard**.

### Manuelle

1. Télécharge `content-card-linky.js`, `content-card-linky-editor.js` **et le dossier `icons/`** depuis la dernière [release](https://github.com/foXaCe/content-card-linky/releases).
2. Place-les dans `<config>/www/community/content-card-linky/` (ce chemin `community/` est requis : l'icône Linky est servie depuis `/local/community/content-card-linky/icons/linky.svg`).
3. Déclare la ressource dans **Paramètres → Tableaux de bord → Ressources** (ou en YAML) :

```yaml
resources:
  - url: /local/community/content-card-linky/content-card-linky.js
    type: module
```

## Ajouter la carte

### Via l'interface graphique

Ajoute une carte → recherche *Carte Enedis* → l'éditeur visuel propose toutes les options.

### En YAML

```yaml
type: custom:content-card-linky
entity: sensor.linky_<pdl>_consumption
```

## Options principales

| Clé                       | Type    | Défaut                              | Description                                                          |
| ------------------------- | ------- | ----------------------------------- | -------------------------------------------------------------------- |
| `entity`                  | string  | —                                   | Sensor MyElectricalData (obligatoire).                               |
| `titleName`               | string  | `LINKY`                             | Titre de la carte.                                                   |
| `nbJoursAffichage`        | string  | `7`                                 | Nombre de jours affichés dans l'historique.                          |
| `showIcon`                | boolean | `false`                             | Affiche l'icône Linky.                                               |
| `showHistory`             | boolean | `true`                              | Affiche l'historique journalier.                                     |
| `showPrice`               | boolean | `true`                              | Affiche le prix.                                                     |
| `showDayPrice`            | boolean | `false`                             | Affiche le prix par jour dans l'historique.                          |
| `showCurrentMonthRatio`   | boolean | `true`                              | Affiche l'évolution du mois en cours.                                |
| `showWeekRatio`           | boolean | `false`                             | Affiche l'évolution hebdomadaire.                                    |
| `showDayName`             | string  | `long`                              | Format des jours : `narrow`, `short`, `long`.                        |
| `showDayMaxPower`         | boolean | `false`                             | Affiche la puissance max et l'éventuel dépassement.                  |
| `showDayMaxPowerTime`     | boolean | `true`                              | Affiche l'heure de la puissance max (avec `showDayMaxPower`).        |
| `showEcoWatt`             | boolean | `false`                             | Indicateur EcoWatt J0.                                               |
| `showEcoWattJ12`          | boolean | `false`                             | EcoWatt J+1 et J+2.                                                  |
| `showTempo`               | boolean | `false`                             | Bandeau Tempo.                                                       |
| `showTempoColor`          | boolean | `true`                              | Colore les jours de l'historique selon Tempo.                        |
| `ewEntity`                | string  | —                                   | Sensor EcoWatt J0 (MED ≥ 0.9.1).                                     |
| `ewEntityJ1` / `ewEntityJ2` | string | —                                  | EcoWatt J+1 / J+2.                                                   |
| `tempoEntityInfo`         | string  | —                                   | Sensor Tempo (jours restants par couleur, MED ≥ 0.9.2).              |
| `tempoEntityJ0` / `tempoEntityJ1` | string | —                          | Tempo aujourd'hui / demain.                                          |
| `detailedComparisonEntity` | string | `sensor.linky_consumption_last5day` | Sensor pour la comparaison détaillée.                                |

## Internationalisation

La carte utilise désormais `hass.locale` pour choisir la langue (FR/EN inclus). Pour ajouter une langue : créez `src/translations/<lang>.json` (parité de clés avec `en.json`), puis importez-le et ajoutez-le à la map `TRANSLATIONS` dans `src/lib/localize.ts`.

## Développement

```bash
npm install
npm run build        # bundle dist/*.js (Lit inclus, version injectée)
npm run build:watch  # rebuild à chaque sauvegarde
npm run lint
npm run format
```

> Le dossier `dist/` est généré. Ne le modifie jamais à la main : édite `src/`, lance `npm run build`, puis commit `dist/`. La CI vérifie que `dist/` est bien à jour.

### Architecture

- `src/content-card-linky.ts` — la carte (Lit element).
- `src/content-card-linky-editor.ts` — éditeur visuel.
- `src/lib/` — helpers (`fireEvent`, `localize`).
- `src/translations/{en,fr}.json` — chaînes traduites.
- `rollup.config.mjs` — bundle ES, terser en prod, version injectée depuis `package.json`.

## Compatibilité Home Assistant

| Feature                                | Statut          |
| -------------------------------------- | --------------- |
| Lit bundlé (pas de hack `ha-panel-lovelace`) | ✅ |
| `shouldUpdate` qui observe toutes les entités configurées | ✅ |
| `getCardSize()` dynamique              | ✅              |
| `getGridOptions()` (section view 2024.7+) | ✅           |
| `getLayoutOptions()` (legacy)          | ✅              |
| `getStubConfig()` async + auto-détection | ✅            |
| i18n via `hass.locale`                 | ✅              |

## Crédits

Cette carte est basée sur le travail de [@saniho](https://github.com/saniho/content-card-linky).

---

N'hésite pas à passer sur le forum : <https://forum.hacf.fr/t/hacs-ajoutez-des-modules-et-des-cartes-personnalisees/359>
