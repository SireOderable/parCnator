const fs = require("fs");
const scoring = require("./scoring/scoring");

let code = fs.readFileSync("test.c", "utf8");
let score = scoring.from(code);

if (score.score == 0) {
    console.log("\nAucune erreur détectée !");
} else {
    console.log("\nAnomalie(s) détectée(s) :", score.score);
    for (const [k, v] of Object.entries(score.details)) {
        if (v > 0) {
            console.log("   L", k);
        }
    }
}


