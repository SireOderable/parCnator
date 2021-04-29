const constTokens= require("../tokenizer/constants");
const constParser= require("./constants");

const searchString= (tokens, start)=>{
    var string=[];
    let findend= false;
    let end= 0;
    for(let i= start+1; i< tokens.length;i++){
        if(tokens[i].type==constTokens.symboleQuotationMark){
            findend= true;
            end= i;
            break;
        }else{
            string.push(tokens[i].value);
        }
    }
    if(!findend) throw constParser.errorMissingQuotationMark;
    return {
        value: string.filter(c => c != undefined).join(" "),
        end: end
    };
}
exports.searchString = searchString;

exports.searchArgs= (tokens, start)=>{
    if(tokens[start].type!=constTokens.symboleOpenParenthese) throw constParser.errorMissingOpenParenthesis;
    let findEnd= false;
    let end= null;
    let args= [];
    for(let i= start+1; i< tokens.length; i++){
        if(tokens[i].type==constTokens.symboleCloseParenthese){
            findEnd= true;
            end=i;
            break;
        }else if(tokens[i].type==constTokens.typeWord){
            args.push({type:constParser.typeVariable, variableName:tokens[i].value});
        }else if(tokens[i].type==constTokens.typeNumber){
            args.push(tokens[i]);
        }else if(tokens[i].type==constTokens.symboleQuotationMark){
            let temp= searchString(tokens, i);
            args.push(temp);
            i=temp.end;
        }else if(tokens[i].type==constTokens.symboleBlank) {
            args.push(tokens[i])
        }else if(tokens[i].type==constTokens.symboleVirgule){
            args.push(tokens[i])
        }
    }
    if(!findEnd) throw constParser.errorMissingCloseParenthesis;
    return {args: args, end: end};
}

exports.skipBlank = (tokens, start, step) => {
    if(tokens[start + step] == undefined) return start;
    if(tokens[start].type == constTokens.symboleBlank) {
        return this.skipBlank(tokens, start + step, step);
    }
    return start;
}

exports.getIndent = (tokens, start) => {
    if(tokens[start - 1].type == constTokens.symboleNewLine ) return start;
    let i = 0;
    while(tokens[start - i].type != constTokens.symboleNewLine) {
        i++;
    }
    return start-i+1;
}


exports.nextNewLine = (tokens, start) => {
    let i = start;
    while(tokens[start].type != constTokens.symboleNewLine && i < tokens.length) {
        i++;
    }
    return i;
}

exports.next = (tokens, start) => {
    return this.skipBlank(tokens, start + 1, 1)
}

exports.getArgs = (tokens, openPar) => {
    let args = [];
    let nextArg = this.next(tokens, openPar);

    if (tokens[nextArg].type == constTokens.symboleCloseParenthese) return { args: args, end: nextArg };

    while (tokens[nextArg].type != constTokens.symboleCloseParenthese) {
        const typeArg = tokens[nextArg].value;
        const match = typeArg.match(/(\b(char[*]*)|\b(int)\b|\bfloat\b)/gi);
        if (match != null && match.length > 0) {
            const indexName = this.next(tokens, nextArg);
            const separator = this.next(tokens, indexName);
            if (tokens[separator].type != constTokens.symboleVirgule) {
                args.push(tokens.slice(nextArg, separator));
                break;
            }

            args.push(tokens.slice(nextArg, separator));
            nextArg = this.next(tokens, separator);

        } else throw constParser.errorDeclaration;
    }

    return {
        args: args,
        end: this.next(tokens, this.next(tokens, this.next(tokens, nextArg)))
    };
}