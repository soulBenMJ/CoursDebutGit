// Tests avec vérifications de sortie pour le convertisseur emoji
const { convertTextToEmoji, wordToEmoji } = require('./main.js');

console.log('=== Tests du convertisseur emoji ===\n');

// Fonction d'aide pour les tests
function assertEquals(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ ${testName} : RÉUSSI`);
        return true;
    } else {
        console.log(`❌ ${testName} : ÉCHEC`);
        console.log(`   Attendu: "${expected}"`);
        console.log(`   Obtenu:  "${actual}"`);
        return false;
    }
}

function assertContains(text, word, testName) {
    if (text.includes(word)) {
        console.log(`✅ ${testName} : RÉUSSI`);
        return true;
    } else {
        console.log(`❌ ${testName} : ÉCHEC`);
        console.log(`   Le texte "${text}" ne contient pas "${word}"`);
        return false;
    }
}

let testsPassés = 0;
let testsTotal = 0;

// Test 1: Conversion basique
testsTotal++;
const test1 = "J'aime mon chat";
const result1 = convertTextToEmoji(test1);
const expected1 = "J'aime mon 🐱";

if (assertEquals(result1, expected1, "Test conversion chat")) {
    testsPassés++;
}

// Test 2: Plusieurs mots
testsTotal++;
const test2 = "Le soleil brille et mon coeur bat";
const result2 = convertTextToEmoji(test2);
const expected2 = "Le ☀️ brille et mon ❤️ bat";

if (assertEquals(result2, expected2, "Test conversion multiple")) {
    testsPassés++;
}

// Test 3: Aucun mot à convertir
testsTotal++;
const test3 = "Bonjour le monde";
const result3 = convertTextToEmoji(test3);
const expected3 = "Bonjour le monde";

if (assertEquals(result3, expected3, "Test sans conversion")) {
    testsPassés++;
}

// Test 4: Sensibilité à la casse
testsTotal += 2;
const test4a = "J'aime le SOLEIL";
const result4a = convertTextToEmoji(test4a);
const expected4a = "J'aime le ☀️";

const test4b = "Mon Chien est gentil";
const result4b = convertTextToEmoji(test4b);
const expected4b = "Mon 🐶 est gentil";

if (assertEquals(result4a, expected4a, "Test casse majuscule")) {
    testsPassés++;
}

if (assertEquals(result4b, expected4b, "Test casse mixte")) {
    testsPassés++;
}

// Test 5: Mots partiels (ne doivent pas être convertis)
testsTotal++;
const test5 = "J'ai du courage dans le coeur";
const result5 = convertTextToEmoji(test5);
const expected5 = "J'ai du courage dans le ❤️";

if (assertEquals(result5, expected5, "Test mots partiels")) {
    testsPassés++;
}

// Test 6: Tous les emojis du dictionnaire
testsTotal++;
const test6 = "coeur amour chat chien soleil lune eau feu terre";
const result6 = convertTextToEmoji(test6);
const expected6 = "❤️ 💕 🐱 🐶 ☀️ 🌙 💧 🔥 🌍";

if (assertEquals(result6, expected6, "Test tous les emojis")) {
    testsPassés++;
}

// Test 7: Dictionnaire (vérification structure)
testsTotal += 3;

const expectedKeys = ['coeur', 'amour', 'chat', 'chien', 'soleil', 'lune', 'eau', 'feu', 'terre'];
const actualKeys = Object.keys(wordToEmoji);

if (assertEquals(actualKeys.length, expectedKeys.length, "Nombre de mots")) {
    testsPassés++;
}

// Vérification des emojis spécifiques
if (assertEquals(wordToEmoji.chat, '🐱', "Emoji chat")) {
    testsPassés++;
}

if (assertEquals(wordToEmoji.soleil, '☀️', "Emoji soleil")) {
    testsPassés++;
}

// Test 8: Histoire complète avec vérifications
testsTotal += 4;
const histoire = `Il était une fois un aventurier qui aimait son chien fidèle. 
Sous le soleil brillant, ils exploraient des terres mystérieuses. 
Quand la lune se levait, ils allumaient un feu près de l'eau cristalline. 
Son coeur était rempli d'amour pour cette terre sauvage.`;

const histoireResult = convertTextToEmoji(histoire);

// Vérifications spécifiques
if (assertContains(histoireResult, '🐶', "Chien présent")) {
    testsPassés++;
}
if (assertContains(histoireResult, '☀️', "Soleil présent")) {
    testsPassés++;
}
if (assertContains(histoireResult, '🌙', "Lune présente")) {
    testsPassés++;
}
if (assertContains(histoireResult, '❤️', "Coeur présent")) {
    testsPassés++;
}

// Résumé des tests
console.log('=== RÉSUMÉ DES TESTS ===');
console.log(`Tests réussis: ${testsPassés}/${testsTotal}`);

if (testsPassés === testsTotal) {
    console.log('🎉 TOUS LES TESTS SONT RÉUSSIS ! 🎉');
} else {
    console.log('⚠️  Certains tests ont échoué. Vérifie le code.');
}

// Export pour les tests automatisés
module.exports = {
    testsPassés,
    testsTotal,
    allTestsPassed: testsPassés === testsTotal
};
