
const helper = require("./helper");
const constTokens = require("./constants");

module.exports = function (code) {
  code = helper.replaceSpecialsChars(code);
  if(code.charAt(0) == ' ') code = code.slice(1, -1);
  var _tokens = code.split(/[\t\f\v ]+/);
  var tokens = []
  for (var i = 0; i < _tokens.length; i++) {
    var t = _tokens[i]
    if (t.length != '' || isNaN(t)) {
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
  return tokens
}