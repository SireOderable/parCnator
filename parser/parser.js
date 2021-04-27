const constTokens = require("../tokenizer/constants");
const constParser = require("./constants");
const factory = require("./expressionsFactory");

function skipBlank(tokens, start, step) {
    if (tokens[start].type == constTokens.symboleBlank) {
        return skipBlank(tokens, start + step, step);
    }
    return start;
}


module.exports = (tokens) => {
    let AST = [];
    // console.log(tokens);
    for (let i = 0; i < tokens.length; i++) {
        let expression = null;
        if(tokens[i].type == constTokens.symboleLibrary) {
            console.log("ècektubaise");
        } else if (tokens[i].type == constTokens.typeWord && constParser.declarationVariable.indexOf(tokens[i].value) != -1) {
            expression = factory.create(constParser.expressionDeclaration, tokens, i);
            i++;
        } else if (tokens[i].type == constTokens.symboleEqual) {
            expression = factory.create(constParser.expressionAffectation, tokens, i);
            if (expression.variableValue.type == constTokens.typeNumber) {
                i++;
            } else {
                i = expression.variableValue.end;
            }
        } else if (i < tokens.length - 1 && tokens[i].type == constTokens.typeWord) {
            const getPoint = skipBlank(tokens, i + 1, 1);
            if (tokens[getPoint].type == constTokens.symboleOpenParenthese) {
                expression = factory.create(constParser.expressionFuncCall, tokens, i);
                i = expression.end;
            }
        }
        if (expression) {
            AST.push(expression);
        } else {
            AST.push(tokens[i]);
        }
    }
    // console.dir(AST, { depth: null });
    return AST;
}