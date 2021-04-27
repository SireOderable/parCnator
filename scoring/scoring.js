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
            numberLine: helper.numberLine(ast),
            indentation: helper.indentation(ast)
        };
        return {score: result.allDeclaredIsUsed+
                       result.allUsedIsDeclared+
                       result.allExpressionFinished+
                       result.indentation+
                       result.numberLine,
                details: result
                }
    }catch(e){
        throw e;
    }
};