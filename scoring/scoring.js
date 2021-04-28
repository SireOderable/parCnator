const tokenizer= require("../tokenizer/tokenizer");
const parser= require("../parser/parser");
const helper= require("./helper");

exports.from= (code)=>{

    let tokens = tokenizer(code);

    try{
        let ast= parser(tokens);
        
        let result= {
            allDeclaredIsUsed: helper.allDeclaredIsUsed(ast),
            allUsedIsDeclared: helper.allUsedIsDeclared(ast),
            allExpressionFinished: helper.allExpressionFinished(ast),
            checkLinesInFile: helper.checkLinesInFile(ast),
            indentation: helper.indentation(ast),
            checkNewLineAfterEndInstruct: helper.checkNewLineAfterEndInstruct(ast)
        };
        return {score: result.allDeclaredIsUsed+
                       result.allUsedIsDeclared+
                       result.allExpressionFinished+
                       result.checkLinesInFile+
                       result.indentation+
                       result.checkNewLineAfterEndInstruct,
                details: result
                }
    }catch(e){
        throw e;
    }
};