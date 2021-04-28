const constTokens = require("../tokenizer/constants");
const constParser = require("./constants");
const helper = require("./helper");


function skipBlank(tokens, start, step) {
    if(tokens[start].type == constTokens.symboleBlank) {
        return skipBlank(tokens, start + step, step);
    }
    return start;
}

function getIndent(tokens, start) {
    if(tokens[start - 1].type == constTokens.symboleNewLine ) return start;
    let res = [];
    let i = 0;
    while(tokens[start - i].type != constTokens.symboleNewLine) {
        i++;
    }
    return start-i+1;
}

exports.create = (type, tokens, start) => {
    switch (type) {
        case constParser.expressionImport:
            return importLibrary(tokens, start);
        case constParser.expressionDeclaration:
            return declaration(tokens, start);
    }
}

function declaration(tokens, start) {
    let next = skipBlank(tokens, start + 1, 1);
    next = skipBlank(tokens, next + 1, 1);
    const separator = tokens[next];
    if (separator.type == constTokens.symboleOpenParenthese) {
        return declarationFunction(tokens, start);
    } else if(separator.type == constTokens.symboleEqual) {
        return declarationVariable(tokens, start);
    } else throw constParser.errorDeclaration;
}

// int main(int argc, char** argv)
// int main(int argc)

//  [ {*blank*}, {value_type : int}, {word : "argc"}, {*blank*} ]
function getArgs(tokens, openPar) {
    let args = [];
    let nextArg = skipBlank(tokens, openPar + 1, 1);
    if(tokens[nextArg].type == constTokens.symboleCloseParenthese) return args;

    while(tokens[nextArg].type != constTokens.symboleCloseParenthese) {
        const typeArg = tokens[nextArg].value;
        const match = typeArg.match(/(\b(char[*]*)|\b(int)\b|\bfloat\b)/gi);
        if(match != null && match.length > 0) {
            const nameArg = tokens[skipBlank(tokens, nextArg + 1, 1)].value;
        } else throw constParser.errorDeclaration;

        constParser.errorDeclaration;
        break;
    }
    

}

// int main(int argc, char** argv)
function declarationFunction(tokens, start) {
    const indent = getIndent(tokens, start);
    const nextType = skipBlank(tokens, start + 1, 1);
    const nameFunc = skipBlank(tokens, start + 1, 1);
    const openPar = skipBlank(tokens, nameFunc + 1, 1);
    getArgs(tokens, openPar);
    // console.dir({
    //     type: "",
    //     header: {
    //         return_type: tokens.slice(indent, nextType),
    //         name: tokens.slice(nextType, openPar),
    //         arguments: []
    //     },
    //     body: [],
    //     end: 0
    // }, { depth: null });
}

function declarationVariable(tokens, start) {

    return {};
}

function importLibrary(tokens, start) {
    let next = skipBlank(tokens, start + 1, 1);

    if (tokens[next].type != constTokens.typeWord) throw constParser.errorImport;
    const lib = tokens[next].value.match(/<[a-zA-z0-9]+.h>/g);
    if(lib.length == 0) throw constParser.errorImport;

    return {
        type: constParser.expressionImport,
        end: next,
        body: tokens.slice(start, next - start +1)
    }
   
}