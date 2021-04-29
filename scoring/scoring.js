const tokenizer = require("../tokenizer/tokenizer");
const parser = require("../parser/parser");
const helper = require("./helper");

exports.from = (code) => {

    let tokens = tokenizer(code);

    try {
        let ast = parser(tokens);
        console.dir(ast, { depth: null });
        let result = {
            allDeclaredIsUsed: helper.allDeclaredIsUsed(ast),
            allUsedIsDeclared: helper.allUsedIsDeclared(ast),
            allExpressionFinished: helper.allExpressionFinished(ast),
            checkLinesInFile: helper.checkLinesInFile(ast),
            checkLinesInFuncions: helper.checkLinesInFuncions(ast),
            indentation: helper.indentation(ast),
            checkNewLineAfterEndInstruct: helper.checkNewLineAfterEndInstruct(ast),
            checkBlanks: helper.checkBlanks(tokens)
        };
        return {
            score: result.allDeclaredIsUsed +
                result.allUsedIsDeclared +
                result.allExpressionFinished +
                result.checkLinesInFile +
                result.checkLinesInFuncions +
                result.indentation +
                result.checkNewLineAfterEndInstruct +
                result.checkBlanks,
            details: result
        }
    } catch (e) {
        throw e;
    }
};