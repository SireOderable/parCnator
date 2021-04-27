const fs= require("fs");
const scoring= require("./scoring/scoring"); 

let code= fs.readFileSync("test.js", "utf8");
let score= scoring.from(code);


