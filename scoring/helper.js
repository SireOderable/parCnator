const _ = require('lodash')

//==============================================================================
Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function printAST(ast) {
    console.log("----- AST -----");
    console.dir(ast, { depth: null });
    console.log("---------------");

}

//==============================================================================
// check du nombre de lignes que contient le fichier
exports.checkLinesInFile = (tokens) => {
    const authorizedLineNumber = 200;

    var linesCounter = _.filter(tokens, { type: 'newLine' }).length + 1;

    if (linesCounter > authorizedLineNumber) {
        console.log("checkLinesInFile -> dépassement :", linesCounter - authorizedLineNumber);
        return 1;
    }
    console.log("checkLinesInFile -> OK");
    return 0;
}

//==============================================================================
// check du nombre de lignes que contienent les fonctions
exports.checkLinesInFuncions = (ast) => {
    const maxLignesAuthorise = 25;

    for (const [key, value] of Object.entries(ast)) {
        if (value.type === "declarationFunction") {
            var linesCounter = _.filter(value.body, { type: 'newLine' }).length - 1;    // -1 pour l'accolade ouvrante
            if (linesCounter > maxLignesAuthorise) {
                console.log("checkLinesInFuncions -> dépassement");
                return 1;
            }
        }

    }

    console.log("checkLinesInFuncions -> OK");
    return 0;
}

//==============================================================================
// check que chaque `;` est suivi par un retour à la ligne
exports.checkNewLineAfterEndInstruct = (tokens) => {
    // TODO : exclure 'for (var i=0; i<10; i++){'
    var cptFalse = 0;
    
    for (var i = 0; i < tokens.length - 1; i++) {
        if (tokens[i].type === "endInstruct") {
            if (tokens[i + 1].type !== "newLine") {
                cptFalse++;
            }
        }
    }

    if (cptFalse > 0) {
        console.log("checkNewLineAfterEndInstruct -> ", cptFalse, " errors");
        return 0;
    }

    console.log("checkNewLineAfterEndInstruct -> OK");
    return 1;
}


exports.checkBlanks = (tokens) => {
    return 1;
}

exports.allDeclaredIsUsed = (ast) => {
    return 1;
}

exports.allUsedIsDeclared = (ast) => {
    return 1;
}

exports.allExpressionFinished = (ast) => {
    return 1;
}

const tabline = 4;
exports.indentation = (ast, proff=0) => {
    let score = 0;
    for (let i = 0; i < ast.length; i++) {
        const token = ast[i];
        if(token.type == "declarationFunction") {
            score = this.indentation(ast[i].body ,proff+1)
        } else {

        }
    }
    return score;
}
