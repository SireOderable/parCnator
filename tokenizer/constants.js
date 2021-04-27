exports.specialChars = {
    blank:            { regRule: / /g,    value:' ' },
    newLine:          { regRule: /\r\n/g, value:'\n' },
    endInstruct:      { regRule: /;/g,    value:';' },
    equal:            { regRule: /=/g,    value:'=' },
    // point:            { regRule: /\./g,   value:'.' },
    virgule:          { regRule: /\,/g,   value:',' },
    quotationMark:    { regRule: /\"/g,   value:'"' },
    openParenthese:   { regRule: /\(/g,   value:'"' },
    closeParenthese:  { regRule: /\)/g,   value:'"' },
    openBrackets:     { regRule: /{/g,    value:'{' },
    closeBrackets:    { regRule: /}/g,    value:'}' },
    library:          { regRule: /#[a-zA-z0-9]+/g,    value:'#include' },
};

exports.symboleEqual            = "equal";
// exports.symbolePoint            = "point";
exports.symboleVirgule          = "virgule";
exports.symboleQuotationMark    = "quotationMark";
exports.symboleOpenParenthese   = "openParenthese";
exports.symboleCloseParenthese  = "closeParenthese";
exports.symboleOpenBrackets     = "openBrackets";
exports.symboleCloseBrackets    = "closeBrackets";
exports.symboleBlank            = "blank";
exports.symboleLibrary          = "library";

exports.typeNumber  = "number";
exports.typeWord    = "word";

exports.errorNoTokenFound = 'No Tokens Found.';

// *include* <stdio.h> *newLine*
