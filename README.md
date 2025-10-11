# NIIA - Diagnostic des 7 Batteries de Vie

Une application web moderne pour évaluer les 7 batteries de vie (Physique, Mentale, Émotionnelle, Identitaire, Relationnelle, Professionnelle, Spirituelle) et générer un rapport personnalisé en PDF.

## 🚀 Fonctionnalités

- **Questionnaire interactif** : 70 questions réparties sur 7 batteries
- **Interface moderne et intuitive** : Design responsive avec animations fluides
- **Calcul de score personnalisé** : Évaluation sur 210 points avec 3 niveaux (Critique, Instable, Optimal)
- **Visualisations claires** : Graphiques et barres de progression
- **Rapport PDF personnalisé** : Génération automatique avec :
  - Analyse détaillée de chaque batterie
  - Exercices concrets adaptés à chaque niveau
  - Recommandations personnalisées
  - Plan d'action complet
- **Profils dynamiques** : 5 profils basés sur le score global

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build
```

## 🎯 Structure du projet

```
src/
├── components/           # Composants React
│   ├── Questionnaire.tsx # Formulaire de questions
│   ├── Results.tsx       # Page de résultats
│   ├── Questionnaire.css
│   └── Results.css
├── data/                 # Données statiques
│   ├── batteries.ts      # Informations sur les batteries
│   └── questions.ts      # Questions du questionnaire
├── utils/                # Utilitaires
│   ├── scoring.ts        # Logique de calcul des scores
│   └── pdfGenerator.ts   # Génération des PDFs
├── types.ts              # Types TypeScript
├── App.tsx               # Composant principal
└── main.tsx              # Point d'entrée

```

## 🔋 Les 7 Batteries

1. **🔋 Physique** : Énergie, sommeil, tensions corporelles, digestion
2. **🧠 Mentale** : Clarté mentale, concentration, mémoire, décisions
3. **💙 Émotionnelle** : Gestion des émotions, expression, fluidité
4. **👤 Identitaire** : Valeurs, authenticité, légitimité, affirmation de soi
5. **🤝 Relationnelle** : Relations, limites, communication, équilibre
6. **💼 Professionnelle** : Sens du travail, engagement, reconnaissance, talents
7. **🕊 Spirituelle** : Connexion spirituelle, sens de vie, pratique, guidance

## 📊 Système de scoring

- **30 points maximum par batterie**
- **210 points au total**
- **3 niveaux** :
  - 🔴 CRITIQUE (0-10 pts / 0-33%)
  - 🟡 INSTABLE (11-20 pts / 34-66%)
  - 🟢 OPTIMAL (21-30 pts / 67-100%)

## 🎨 Technologies utilisées

- React 18 + TypeScript
- Vite
- jsPDF (génération PDF)
- Recharts (visualisations)
- Lucide React (icônes)
- CSS3 (animations et responsive)

## 📝 Licence

Propriétaire - NIIA Coaching © 2025

## 👨‍💼 Contact

Ayoub - NIIA Coaching

