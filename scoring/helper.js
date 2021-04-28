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

function printAST(ast){
    console.log("----- AST -----");
    for (const [key, value] of Object.entries(ast)) {
        console.log(Object.size( value ), value);
    }
    console.log("---------------");

}

//==============================================================================
// check du nombre de lignes que contient le fichier
exports.checkLinesInFile = (ast) => {
    // TODO : recherche sur les fils

    const authorizedLineNumber = 200;

    const linesCounter = _.filter(ast, { type: 'newLine' }).length +1;
    if (linesCounter>authorizedLineNumber){
        console.log( "checkLinesInFile -> dépassement :", linesCounter-authorizedLineNumber );
    } else {
        console.log( "checkLinesInFile -> OK");
    }
    return linesCounter<=authorizedLineNumber;
}

//==============================================================================
// check que chaque `;` est suivi par un retour à la ligne
exports.checkNewLineAfterEndInstruct = (ast) => {
    // TODO : recherche sur les fils
    // TODO : exclure 'for (var i=0; i<10; i++){'
    
    var cptFalse = 0;

    const astLength = Object.size( ast );
    for (var i=0; i<astLength-1; i++) {
        if ( ast[i].type === "endInstruct" ){
            if (ast[i+1].type!=="newLine" ){
                cptFalse++;
            }
        }
    }

    if (cptFalse>0){
        console.log( "checkNewLineAfterEndInstruct -> ", cptFalse, " errors" );
    } else {
        console.log( "checkNewLineAfterEndInstruct -> OK");
    }
    
    return cptFalse==0;
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

exports.indentation = (ast) => {
    return 1;
}

exports.numberLine = (ast) => {
    return 1;
}