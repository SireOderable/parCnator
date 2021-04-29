
const { slice } = require("lodash");
const constTokens = require("../tokenizer/constants");
const constParser = require("./constants");
const factory = require("./expressionsFactory");

const parser = (tokens) => {
    let AST = [];
   
    for (let i = 0; i < tokens.length; i++) {
        let expression = null;
        // Import
        if(tokens[i].type == constTokens.symboleInclude) {
            expression = factory.create(constParser.expressionImport, tokens, i);
            i = expression.end;
        } else if (tokens[i].type == constTokens.typeWord) {
            
            const match = tokens[i].value.match(/(\b(char[*]*)|\b(int)\b|\bfloat\b)/gi)
            if(match != null && match.length > 0) {
                expression = factory.create(constParser.expressionDeclaration, tokens, i);    
                if(expression.type == constParser.expressionDeclarationFunction) {
                    expression.body = parser(tokens.slice(expression.start, expression.end));
                } 
                i = expression.end;
            } else {
                expression = factory.create(constParser.expressionFunctionCall, tokens, i);
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

module.exports = parser;