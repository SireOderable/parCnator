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
    let objectName = tokens[start].value ;
    let goToPoint = skipBlank(tokens, start + 1, 1); 
    let next = skipBlank(tokens, goToPoint + 1 ,1);
    // console.log(tokens[next].type);
    if (tokens[next].type != constTokens.typeWord) throw constParser.errorMissingWord;
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
    // console.log(tokens[start]);
    next = skipBlank(tokens, start + 1, 1);
    // console.log(tokens[next]);
    if (tokens[next].type != constTokens.typeWord) throw constParser.errorMissingWord;

    let variableName = tokens[next].value;
    return { type: constParser.expressionDeclaration, variableName: variableName };
}

function variableAffectation(tokens, start) {
    // console.log(tokens[start]);
    const previous = skipBlank(tokens, start - 1, -1)
    // console.log(tokens[previous]);
    if (tokens[previous].type != constTokens.typeWord) throw constParser.errorMissingWord;
    
    let variableName = tokens[previous].value;

    let variableValue = null;
    let next = skipBlank(tokens, start + 1, 1)
//    console.log(tokens[next]);
    
    if (tokens[next].type == constTokens.typeNumber) {
        variableValue = tokens[next];
        // console.log(variableValue);
    } else if (tokens[next].type == constTokens.symboleQuotationMark) {
        variableValue = helper.searchString(tokens, next);
    }
    return { type: constParser.expressionAffectation, variableName: variableName, variableValue: variableValue };
}