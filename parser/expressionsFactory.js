const constTokens = require("../tokenizer/constants");
const constParser = require("./constants");
const helper = require("./helper");
const parser = require("./parser")

exports.create = (type, tokens, start) => {
    switch (type) {
        case constParser.expressionImport:
            return importLibrary(tokens, start);
        case constParser.expressionDeclaration:
            return declaration(tokens, start);
        case constParser.expressionFunctionCall:
            return call(tokens, start);
    }
}

function call(tokens, start) {
    const nameCall = tokens[start];
    let nextIndex = next(tokens, start);
    if(tokens[nextIndex].type == constTokens.symboleOpenParenthese) {
        return callFunction(tokens, start);
    } else if (tokens[nextIndex].type == constTokens.symboleEqual) {
        return callVariable(tokens, start);
    } else throw constParser.errorCall
}

function callFunction(tokens, start) {
    const callTo = tokens[start].value;
    let indexParam = next(tokens, next(tokens, start));
    while(tokens[indexParam] != undefined && tokens[indexParam].type != constTokens.symboleCloseParenthese ) {
        if(tokens[indexParam].type != constTokens.symboleEndInstruct ) {
            indexParam++;
        } else throw constParser.errorCall
    }
    const end = next(tokens, next(tokens, indexParam)) + 1;
    return {
        type: constParser.expressionFunctionCall,
        name: callTo,
        body: tokens.slice(helper.getIndent(tokens, start), end),
        end: end
    };
}

function callVariable(tokens, start) {
    return {toot: "toto"};
}

function declaration(tokens, start) {
    // console.log(tokens[start]);
    let next = helper.skipBlank(tokens, start + 1, 1);
    // console.log(tokens[next]);
    next = helper.skipBlank(tokens, next + 1, 1);
    const separator = tokens[next];
    if (separator.type == constTokens.symboleOpenParenthese) {
        return declarationFunction(tokens, start);
    } else if(separator.type == constTokens.symboleEqual) {
        return declarationVariable(tokens, start);
    } else throw constParser.errorDeclaration;
}

// int main(int argc, char** argv)
// int main(int argc)
// int main()

// arguments : [
//     [ {*blank*}, {word : int}, {word : "argc"}, {*blank*} ],
//     [ {*blank * }, {word : char**}, {word : "argv"}, {*blank*} ]
// ]

function next(tokens, start) {
    return helper.skipBlank(tokens, start + 1, 1)
}

function getArgs(tokens, openPar) {
    let args = [];
    let nextArg = helper.skipBlank(tokens, openPar + 1, 1);
    
    if(tokens[nextArg].type == constTokens.symboleCloseParenthese) return {args: args, end: nextArg };

    while(tokens[nextArg].type != constTokens.symboleCloseParenthese) {
        const typeArg = tokens[nextArg].value;                  // le type
        const match = typeArg.match(/(\b(char[*]*)|\b(int)\b|\bfloat\b)/gi);
        if(match != null && match.length > 0) {
            const indexName = helper.skipBlank(tokens, nextArg + 1, 1); // !!!index!!!   du nom
            const separator = helper.skipBlank(tokens, indexName+1, 1);
            if(tokens[separator].type != constTokens.symboleVirgule) {
                args.push(tokens.slice(nextArg, separator));
                break;
            } 
            
            args.push(tokens.slice(nextArg, separator));
            nextArg = helper.skipBlank(tokens, separator + 1, 1);
            
        } else throw constParser.errorDeclaration;
    }
    
    return {
        args: args,
        end: next(tokens, next(tokens, next(tokens, nextArg)))
    };
}


// int main(int argc, char** argv)
function declarationFunction(tokens, start) {
    const indent = helper.getIndent(tokens, start);
    const nextType = helper.skipBlank(tokens, start + 1, 1);
    const nameFunc = helper.skipBlank(tokens, start + 1, 1);
    const openPar = helper.skipBlank(tokens, nameFunc + 1, 1);
    const args = getArgs(tokens, openPar);

    const closeBracket = tokens.findIndex(element => element.type == constTokens.symboleCloseBrackets);

    return {
        type: constParser.expressionDeclarationFunction,
        header: {
            return_type: tokens.slice(indent, nextType),
            name: tokens.slice(nextType, openPar),
            arguments: args.args,
        },
        body: [],
        start: args.end,
        end: next(tokens, closeBracket)
    }
}

function declarationVariable(tokens, start) {
    let indexName = next(tokens, start);
    let indexEqual = next(tokens, indexName);
    let indexValue = next(tokens, indexEqual);
    let value = null;
    let type = null;
    let end = null;


    const match = tokens[start].value.match(/(\b(char\*)|\b(int)\b|\bfloat\b)/gi);
    if(match == null)
    {
        throw constParser.errorDeclaration;
    }
    
    switch (match[0])
    {
        case "char*":
            if(tokens[indexValue].type == constTokens.symboleQuotationMark) {
                const objectString = helper.searchString(tokens, indexValue);
                value = objectString.value;
                type = constTokens.typeChar;
                end = next(tokens, objectString.end);
            }
            else 
            {
                throw constParser.errorMissingQuotationMark;    
            }
            break;
        
        case "int":
            console.log("INT");
            if(tokens[indexValue].type == constTokens.typeNumber) 
            {
                value = tokens[indexValue].value;
                type = constTokens.typeNumber;
                end = next(tokens, indexValue);
            }
            else
            {
                throw constParser.errorType;
            }
            break;

        // case "float":
        //     console.log("FLOAT");
        //     break;
        
        default:
            throw constParser.errorDeclaration;
    }


    // if(tokens[indexValue].type == constTokens.typeNumber) {
    //     value = tokens[indexValue].value;
    //     type = constTokens.typeNumber;
    //     end = next(tokens, indexValue);
    // } else if(tokens[indexValue].type == constTokens.symboleQuotationMark) {
    //     const objectString = helper.searchString(tokens, indexValue);
    //     value = objectString.value;
    //     type = constTokens.typeChar;
    //     end = next(tokens, objectString.end);
    // } else throw constParser.errorDeclaration;

    end = helper.nextNewLine(tokens,  next(tokens, end)) + 1;
    
    return {
        type: constParser.expressionDeclarationVariable,
        typeVariable: type,
        value: value,
        body: tokens.slice(start, end),
        end: end
    };
    // return {}

}                                  

function importLibrary(tokens, start) {
    let next = helper.skipBlank(tokens, start + 1, 1);
    if (tokens[next].type != constTokens.typeWord) throw constParser.errorImport;
    const lib = tokens[next].value.match(/<[a-zA-z0-9]+.h>/g);
    if(lib.length == 0) throw constParser.errorImport;

    return {
        type: constParser.expressionImport,
        end: next,
        body: tokens.slice(start, next - start +1)
    }
   
}