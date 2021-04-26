const fs= require("fs");
const scoring= require("./scoring/scoring"); 

let code= fs.readFileSync("test.js", "utf8");
// console.log();
let score= scoring.from(code);


