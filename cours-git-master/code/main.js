// Convertisseur de texte vers emoji
// Ce programme remplace certains mots par des emojis

const wordToEmoji = {
    'coeur': '❤️',
    'amour': '💕',
    'chat': '🐱',
    'chien': '🐶',
    'soleil': '☀️',
    'lune': '🌙',
    'eau': '💧',
    'feu': '🔥',
    'terre': '🌍',
    // Ajoute tes propres emojis ici !
};

function convertTextToEmoji(text) {
    let result = text;
    
    // Remplace chaque mot par son emoji correspondant
    for (const [word, emoji] of Object.entries(wordToEmoji)) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        result = result.replace(regex, emoji);
    }
    
    return result;
}

// Exemple d'utilisation - Histoire d'aventure
const storyText = `Il était une fois un aventurier qui aimait son chien fidèle. 
Sous le soleil brillant, ils exploraient des terres mystérieuses. 
Quand la lune se levait, ils allumaient un feu près de l'eau cristalline. 
Son coeur était rempli d'amour pour cette terre sauvage.`;

console.log("=== Histoire originale ===");
console.log(storyText);
console.log("\n=== Histoire avec emojis ===");
console.log(convertTextToEmoji(storyText));

// Fonction interactive pour tester
function testEmoji() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Entrez votre texte : ', (answer) => {
        console.log('Résultat :', convertTextToEmoji(answer));
        rl.close();
    });
}

// Décommente la ligne suivante pour tester de manière interactive
// testEmoji();

module.exports = { convertTextToEmoji, wordToEmoji };
