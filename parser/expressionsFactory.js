const constTokens = require("../tokenizer/constants");
const constParser = require("./constants");
const helper = require("./helper");


function skipBlank(tokens, start, step) {
    if(tokens[start].type == constTokens.symboleBlank) {
        return skipBlank(tokens, start + step, step);
    }
    return start;
}

exports.create = (type, tokens, start) => {
    switch (type) {
        case constParser.expressionMethodCall:
            return objectMethodCall(tokens, start);
        case constParser.expressionDeclaration:
            return variableDeclaration(tokens, start);
        case constParser.expressionAffectation:
            return variableAffectation(tokens, start);
    }
}

function objectMethodCall(tokens, start) {
    let objectName = tokens[start].value;
    let next = skipBlank(tokens, start + 2, 1); 
    if (tokens[next].type != constTokens.typeWord) throw constParser.errorMissingWord;
    // if (tokens[start + 2].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let methodName = tokens[next].value;
    next = skipBlank(tokens, next+1, 1)
    let arguments = helper.searchArgs(tokens, next);
    return { 
        type: constParser.expressionMethodCall, 
        objectName: objectName, 
        methodName: methodName, 
        arguments: arguments.args, 
        end: arguments.end 
    };
}

function variableDeclaration(tokens, start) {
    if (tokens[start + 1].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let variableName = tokens[start + 1].value;
    return { type: constParser.expressionDeclaration, variableName: variableName };
}

function variableAffectation(tokens, start) {
    if (tokens[start - 1].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let variableName = tokens[start - 1].value;
    let variableValue = null;
    if (tokens[start + 1].type == constTokens.typeNumber) {
        variableValue = tokens[start + 1];
    } else if (tokens[start + 1].type == constTokens.symboleQuotationMark) {
        variableValue = helper.searchString(tokens, start + 1);
    }
    return { type: constParser.expressionAffectation, variableName: variableName, variableValue: variableValue };
}