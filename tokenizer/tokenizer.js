
const helper = require("./helper");
const constTokens = require("./constants");

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = function (code) {
  code = helper.replaceSpecialsChars(code);

  if(code.charAt(0) == ' ') code = code.slice(1);
  if(code.charAt(code.length - 1) == ' ') code = code.slice(0, -1);
  
  var _tokens = code.split(/[\t\f\v ]+/);

  var tokens = []
  for (var i = 0; i < _tokens.length; i++) {
    var t = _tokens[i]
    if (!isNumeric(t)) {
      let typeChars = helper.checkChars(t);
      if (typeChars) {
        tokens.push({ type: typeChars })
      } else {
        tokens.push({ type: constTokens.typeWord, value: t })
      }
    } else {
      tokens.push({ type: constTokens.typeNumber, value: t })
    }
  }
  if (tokens.length < 1) {
    throw constTokens.errorNoTokenFound;
  }
  // console.dir(tokens, { depth: null });
  return tokens
}