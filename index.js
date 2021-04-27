const fs= require("fs");
const scoring= require("./scoring/scoring"); 

let code= fs.readFileSync("test.c", "utf8");
let score= scoring.from(code);


