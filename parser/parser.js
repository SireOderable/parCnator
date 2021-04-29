
const constTokens = require("../tokenizer/constants");
const constParser = require("./constants");
const factory = require("./expressionsFactory");
const helper = require("./helper");

function next(tokens, start) {
    return helper.skipBlank(tokens, start + 1, 1)
}

const parser = (tokens, returnType = "clarinette") => {
    let AST = [];

    for (let i = 0; i < tokens.length; i++) {
        let expression = null;
        // Si on trouve un token include
        if (tokens[i].type == constTokens.symboleInclude) {
            expression = factory.create(constParser.expressionImport, tokens, i);
            i = expression.end;
            // Si on trouve un token word
        } else if (tokens[i].type == constTokens.typeWord) {
            const match = tokens[i].value.match(/(\b(char[*]*)|\b(int)\b|\b(float)\b|\b(void)\b)/gi)
            // Si notre mot est un type c'est une déclaration
            if (match != null && match.length > 0) {
                let indexNext = next(tokens, i);
                indexNext = next(tokens, indexNext);
                const separator = tokens[indexNext];
                // Si on veux déclarer une fonction
                if (separator.type == constTokens.symboleOpenParenthese) {
                    expression = factory.create(constParser.expressionDeclarationFunction, tokens, i);
                    expression.body = parser(tokens.slice(expression.start, expression.end), expression.explicite_return);
                } else if (separator.type == constTokens.symboleEqual) {
                    // Si on veux déclarer une variable
                    expression = factory.create(constParser.expressionDeclarationVariable, tokens, i);
                } else throw constParser.errorDeclaration;

                i = expression.end;
            } else {
               
                let nextIndex = next(tokens, i);
                // Sinon notre mot est un appel et n'est pas un return
                if (tokens[i].value != constTokens.symboleReturn) {
                    if (tokens[nextIndex].type == constTokens.symboleOpenParenthese) {
                        // Si notre appel est une fonction
                        expression = factory.create(constParser.expressionFunctionCall, tokens, i);
                    } else if (tokens[nextIndex].type == constTokens.symboleEqual) {
                        // Si on fait une affectation de variable
                        expression = factory.create(constParser.expressionVariableCall, tokens, i);
                    } else throw constParser.errorCall;
                    i = expression.end;
                } else {
                    // Si on appel return on verifie le type de retour
                    switch (returnType) {
                        case 'int':
                            if (tokens[next(tokens, i)].type == returnType)
                                expression = tokens[i];
                            else throw constParser.errorReturnInt;
                            break;
                        case 'char*':
                            if (tokens[next(tokens, i)].type == constTokens.symboleQuotationMark) {
                                let word = helper.searchString(tokens, next(tokens, i));
                                console.log(word);
                                expression = word;
                                i = expression.end
                            } else throw constParser.errorReturnChar;
                            break;
                        case 'void':
                            if (tokens[next(tokens, i)].type == constTokens.symboleEndInstruct)
                                expression = tokens[i];
                            else throw constParser.errorReturnVoid;
                            break;

                        default:
                            throw constParser.errorReturn;
                    }

                }


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