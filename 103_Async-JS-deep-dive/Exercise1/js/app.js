var MAINAPP = MAINAPP || {};

(function(nsp) {
    "use strict";
    const WORDNIK_API = ""
    const WORDNIK_URL = "http://api.wordnik.com/v4/word.json"
    const WORDNIK_SCRABBLE = "scrabbleScore"
    const WORKNIK_QUERY = "api_key=";

    let field = document.querySelector('#word'),
        btn = document.querySelector('#submitBtn'),
        results = document.querySelector('#results'),
        word,
        scrabbleVal = 0;

    const getValue = function(word) {
        // code this function so it will query the wordnik site. 
        // Send a word that is entered in the field. 
        // Retrieve the scrabble score from the site. 
        // Extract the score from the response and then display it in the results span tag.
        const wordnikFullUrl = `${WORDNIK_URL}/${word}/${WORDNIK_SCRABBLE}?${WORKNIK_QUERY}${WORDNIK_API}`
        fetch(wordnikFullUrl)
            .then(response => response.json())
            .then(function(data) {
                scrabbleVal = data.value;
                results.innerHTML = scrabbleVal;
            })
            .catch(error => console.error(error))
    };

    btn.addEventListener('click', function(e) {
        word = field.value;
        getValue(word);
    });

    nsp.scrabbleVal = scrabbleVal;
})(MAINAPP);



