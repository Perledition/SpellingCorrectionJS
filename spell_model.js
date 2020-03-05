// This file includes the JS Spelling Correction model which is based on Probability Theory and inspired by norvig:
// norvig.com. This JS model should be able to track a sentence with in a text box and correct typed in words live.
// Once there is a suggestion a list appears below the word with recommendations a user can choose from. Otherwise
// the word will be corrected automatically.

const btn = document.getElementById('call-to-action-button');


// TODO: WRITE THE CORRECTION ALGORITHM
class SpellingCorrection {

    constructor(data_base){
        this.data_base = data_base;  // text corpus used for spelling correction
        this.element = document.getElementById('result'); // element in which the result is displayed
        this.singleModificationCollection = []; // array with single modification options
    }

    _splits(word){

    }

    _delete(word){
        var c;
        var results = [];

         // remove once character at a time
        for(c=0; c<word.length; c++){
            console.log(c);
            this.singleModificationCollection.push(word.replace(word.charAt(c), ''));
        }
    }

    _transpose(word){
        var c;
        var word = word.split('');
        console.log(word);
        // arr.join('');

        // sub function to move character at index one position ahead
        function swap(index, arr){
            // swap element of arr at index to index - 1
            const current = arr[index - 1];
            const toSwap = arr[index];

            arr[index - 1] = toSwap;
            arr[index] = current;

            console.log(arr.join(''));
            return arr.join('');
        }


        // switch on character at a time on index ahead
        if (word.length > 1){
            for (c=1; c<word.length; c++){
                console.log(c);
                this.singleModificationCollection.push(swap(c, word));
                }
            }
        }

    // function to count all possible modifications
    single_edit_counts(word){
        const letters = 'abcdefghijklmnopqrstuvwxyz';

        // print result
        console.log(this.data_base[word]);
        this.element.innerHTML = this.data_base[word];

        // count splits of the word
        this._delete(word);

        //


    }

    // function to count all possible modifications with two steps
    double_edit_counts(){

    }


}





 // TODO: LOAD DATA TO CLIENT
async function data_load(word_base){
    const data = await fetch(word_base)
        .then(function(resp){ return resp.json()})
        .then(data => sc = new SpellingCorrection(data))
     return sc;
    }

var sc = data_load("word_proba.json");


// TODO: CREATE EVENT TRIGGER FOR ALL TEXT OR INPUT BOXES


