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
        console.log(tokens[i]);
        let expression = null;

        if (tokens[i].type == constTokens.typeWord && constParser.declarationVariable.indexOf(tokens[i].value) != -1) {
            expression = factory.create(constParser.expressionDeclaration, tokens, i);
            i++;
 
        } else if (tokens[i].type == constTokens.symboleEqual) {
            expression = factory.create(constParser.expressionAffectation, tokens, i);
            console.log(expression);
            if (expression.variableValue.type == constTokens.typeNumber) {
                i++;
            } else {
                i = expression.variableValue.end;
            }

        } else if (i < tokens.length - 1 && tokens[i].type == constTokens.typeWord) {
            const getPoint = skipBlank(tokens, i + 1, 1);
            if (tokens[getPoint].type == constTokens.symbolePoint) {
                expression = factory.create(constParser.expressionMethodCall, tokens, i);
                console.log(expression);
                i = expression.end;
            }
            
        }
        if (expression) {
            AST.push(expression);
        } else {
            AST.push(tokens[i]);
        }
    }
    return AST;
}