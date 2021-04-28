
const constTokens = require("../tokenizer/constants");
const constParser = require("./constants");
const factory = require("./expressionsFactory");

module.exports = (tokens) => {
    let AST = [];
   
    for (let i = 0; i < tokens.length; i++) {
        // console.log(tokens[i]);
        let expression = null;
        // Import
        if(tokens[i].type == constTokens.symboleInclude) {
            expression = factory.create(constParser.expressionImport, tokens, i);
            i = expression.end;
        } 
        // Words
        if (tokens[i].type == constTokens.typeWord) {
            
            const match = tokens[i].value.match(/(\b(char[*]*)|\b(int)\b|\bfloat\b)/gi)
            if(match != null && match.length > 0) {
                // Déclaration
                // a v b d a 
                expression = factory.create(constParser.expressionDeclaration, tokens, i);
           
                break;
            } else {
                // Utilisation de fonction ou variable
            }  
        }

        if (expression) {
            AST.push(expression);
        } else {
            AST.push(tokens[i]);
        }
    }
    // console.dir(AST, { depth: null });
    return AST;
}