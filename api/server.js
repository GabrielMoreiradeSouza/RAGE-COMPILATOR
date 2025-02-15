const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

function interpretRage(code) {
    const lines = code.trim().split("\n");
    let variables = [];
    let output = "";

    for (let line of lines) {
        line = line.trim();

        let match = line.match(/^GIMME A NUMBER!!! (\d+)$/);
        if (match) {
            variables.push(parseInt(match[1]));
            continue;
        }

        if (line === "NOW ADD THEM!!!") {
            if (variables.length >= 2) {
                let result = variables[variables.length - 2] + variables[variables.length - 1];
                variables.push(result);
            } else {
                output += "🔥 ERROR: NOT ENOUGH NUMBERS TO ADD!!! 🔥\n";
            }
            continue;
        }

        if (line === "SHOW ME THE RESULT!!!") {
            if (variables.length > 0) {
                output += `💥 RESULT: ${variables[variables.length - 1]} 💥\n`;
            } else {
                output += "🔥 ERROR: NO RESULT AVAILABLE!!! 🔥\n";
            }
            continue;
        }

        output += `🤬 UNKNOWN COMMAND: ${line}\n`;
    }

    return output;
}

// Criar a API Serverless no Vercel
module.exports = (req, res) => {
    if (req.method === "POST") {
        const { code } = req.body;
        const result = interpretRage(code);
        res.json({ output: result });
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
};
