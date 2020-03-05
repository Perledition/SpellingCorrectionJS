// This file includes the JS Spelling Correction model which is based on Probability Theory and inspired by norvig:
// norvig.com. This JS model should be able to track a sentence with in a text box and correct typed in words live.
// Once there is a suggestion a list appears below the word with recommendations a user can choose from. Otherwise
// the word will be corrected automatically.

const btn = document.getElementById('call-to-action-button');


// TODO: WRITE THE CORRECTION ALGORITHM
class SpellingCorrection {

    constructor(data_base){
        this.data_base = data_base;
    }

    // function to count all possible modifications
    single_edit_counts(){
        console.log('click');
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        console.log(JSON.stringify(this.data_base));
        document.getElementById("result").innerHTML = JSON.stringify(this.data_base);
    }

    // function to count all possible modifications with two steps
    double_edit_counts(){

    }


}





 // TODO: LOAD DATA TO CLIENT
var sc = '';
async function data_load(word_base){
    const response = await fetch(word_base)
        .then(response => response.json())
        .then(json => sc = new SpellingCorrection(json))
        .then(document.getElementById("result").innerHTML = "ready")
        .then(btn.addEventListener('click', sc.single_edit_counts))
    }
data_load("word_data/word_proba.json");
// console.log(data);

// TODO: CREATE EVENT TRIGGER FOR ALL TEXT OR INPUT BOXES
// var sc = new SpellingCorrection(data);
// btn.addEventListener('click', sc.single_edit_counts);

