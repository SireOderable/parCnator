exports.specialChars = {
    blank:            { regRule: / /g,    value:' ' },
    newLine:          { regRule: /\r\n/g, value:'\n' },
    endInstruct:      { regRule: /;/g,    value:';' },
    equal:            { regRule: /=/g,    value:'=' },
    virgule:          { regRule: /\,/g,   value:',' },
    quotationMark:    { regRule: /\"/g,   value:'"' },
    openParenthese:   { regRule: /\(/g,   value:'"' },
    closeParenthese:  { regRule: /\)/g,   value:'"' },
    openBrackets:     { regRule: /{/g,    value:'{' },
    closeBrackets:    { regRule: /}/g,    value:'}' },
    openHook:         { regRule: /\[/g,    value:'[' },
    closeHook:        { regRule: /\]/g,    value:']' },
    include:          { regRule: /#[a-zA-z0-9]+/g,    value:'include' },
};

exports.symboleEqual            = "equal";
exports.symboleVirgule          = "virgule";
exports.symboleQuotationMark    = "quotationMark";
exports.symboleOpenParenthese   = "openParenthese";
exports.symboleCloseParenthese  = "closeParenthese";
exports.symboleOpenBrackets     = "openBrackets";
exports.symboleCloseBrackets    = "closeBrackets";
exports.symboleBlank            = "blank";
exports.symboleInclude          = "include";
exports.symboleNewLine          = "newLine";
exports.symboleEndInstruct      = "endInstruct";
exports.symboleReturn           = "return";

exports.typeNumber  = "int";
exports.typeWord    = "word";
exports.typeInt     = "int";
exports.typeChar    = "char";


exports.errorNoTokenFound = 'No Tokens Found.';