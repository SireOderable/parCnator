const _ = require('lodash')

//==============================================================================
Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

//==============================================================================
// check du nombre de lignes que contient le fichier
exports.checkLinesInFile = (tokens) => {
    const authorizedLineNumber = 200;

    var linesCounter = _.filter(tokens, { type: 'newLine' }).length + 1;

    if (linesCounter > authorizedLineNumber) {
        console.log("checkLinesInFile -> dépassement :", linesCounter - authorizedLineNumber);
        return -1;
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
                console.log("checkLinesInFuncions -> Err");
                return -1;
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
        return -1;
    }

    console.log("checkNewLineAfterEndInstruct -> OK");
    return 0;
}

//==============================================================================
// check que toute variable dédclarée est utilisée
exports.checkCommas = (tokens) => {
    var cptErr = 0;

    for (var i = 0; i < tokens.length - 1; i++) {
        if (tokens[i].type === "blank") {
            if (tokens[i + 1].type === "virgule") {
                cptErr++;
            }
        }
        else if (tokens[i].type === "virgule") {
            if (tokens[i + 1].type !== "blank") {
                cptErr++;
            }
        }
    }

    if (cptErr > 0) {
        console.log("checkCommas -> ", cptErr, " errors");
        return -1;
    }

    console.log("checkCommas -> OK");
    return 0;
}

//==============================================================================
// check que toute variable dédclarée est utilisée
exports.allDeclaredIsUsed = (ast) => {
    return 0;
}

//==============================================================================
// check que toute variable utilisée est dédclarée
exports.allUsedIsDeclared = (ast, tabUsed = []) => {
    return 0;
}


//==============================================================================
// check si `( [ { "` sont par paires et dans le bon ordre (ex: [{]} = Error)
exports.allExpressionFinished = (tokens) => {
    const pair = {
        'openParenthese': 'closeParenthese',
        'closeParenthese': 'openParenthese',

        'openHook': 'closeHook',
        'closeHook': 'openHook',

        'openBrackets': 'closeBrackets',
        'closeBrackets': 'openBrackets',

        'quotationMark':'quotationMark'
    }
    const search = [
        'openParenthese', 'closeParenthese',
        'openHook', 'closeHook',
        'openBrackets', 'closeBrackets',
        'quotationMark'
    ]
    const tmp = []

    for (var i = 0; i < tokens.length - 1; i++) {
        if (search.includes(tokens[i].type)) {
            tmp.push(tokens[i].type);
        }
    }

    const len = tmp.length/2 +1;
    for (var j = 0; j < len; j++) {
        for (var i = 0; i < tmp.length - 1; i++) {
            if (tmp[i] == pair[tmp[i + 1]]) {
                tmp.splice(i, 2);                
                break;
            }
        }
    }
    
    if (tmp.length > 0) {
        console.log("allExpressionFinished -> Err");
        return -1;
    }

    console.log("allExpressionFinished -> OK");
    return 0;
}



const tabline = 4;
exports.indentation = (ast, proff = 0) => {
    let score = 0;
    for (let i = 0; i < ast.length; i++) {
        const token = ast[i];
        if (token.type == "declarationFunction") {
            score = this.indentation(ast[i].body, proff + 1)
        } else {

        }
    }
    // return score;

    return 0;
}
