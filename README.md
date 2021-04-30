# checkcode

### Instalation

```
npm i
```

### Lancement
```
node index.js
```

### Scoring:

Le score parfait est de 0 et chaque manquement aux règles ci-dessous entrainera une pénaliter de 1 points.

- checkLinesInFile: 200 lignes pour un fichier .c.
- checkLinesInFuncions: 25 lignes pour le body d'une fonction.
- checkNewLineAfterEndInstruct: Regarde si il y à rien après un `;`.
- checkCommas: Verifie les espaces avant et après la virgule.
- allExpressionFinished: Verifie si les `[]`, `()`, `{}`, `"` ne sont pas entrelacés.

### Parsing:
- les commentaires monolignes du type `//` sont pris en charge.
- les commentaires multilignes du type `/* toto \n tata */` sont pris en charge.

### Branches
- `dev` : Permet d'avoir une vue d'ensemble sur les différentes étapes du parCnatoir dans le terminal.
- `main` : Uniquement pour le scoring.