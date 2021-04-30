# checkcode

### Instalation

```
npm i
```

### Lancement
```
node index.js
```

### scoring fonctionnel:
- checkLinesInFile: 200 lignes pour un fichier .c.
- checkLinesInFuncions: 25 lignes pour le body d'une fonction.
- checkNewLineAfterEndInstruct: Regarde si il y à rien après un `;`.
- checkCommas: Verifie les espaces avant et après la virgule.
- allExpressionFinished: Verifie si les `[]`, `()`, `{}`, `"` ne sont pas entrelacés.

### parsing:
- les commentaires monolignes du type `//` sont pris en charge.
- les commentaires multilignes du type `/* toto \n tata */` sont pris en charge.

### Branches
- `dev` : Permet d'avoir une vue d'ensemble sur les différentes étapes du parCnatoir dans le terminal.
- `main` : Uniquement pour le scoring.