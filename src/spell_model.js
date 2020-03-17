// This file includes the JS Spelling Correction model which is based on Probability Theory and inspired by norvig:
// norvig.com. This JS model should be able to track a sentence with in a text box and correct typed in words live.
// Once there is a suggestion a list appears below the word with recommendations a user can choose from. Otherwise
// the word will be corrected automatically.


class SpellingCorrection {

    constructor(data_base){
        this.data_base = data_base;  // text corpus used for spelling correction
        this.singleModificationCollection = []; // array with single modification options
    }

    _splits(word){
        var i;
        for (i=0; i<word.length; i++){
            this.singleModificationCollection.push(word.slice(i));
            this.singleModificationCollection.push(word.slice(0, i));
        }
    }

    _inserts(word){
        var i;
        var l;
        let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

        for(l=0; l<letters.length; l++){
            for(i=0; i<word.length; i++){
                var arr = word.split('').slice(0);
                arr.splice(i, 0, letters[l]);
                this.singleModificationCollection.push(arr.join(''));
            }
        }
    }

    _replaces(word){
        var i;
        var l;
        let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

        for (l=0; l<letters.length; l++){ // for each letter
            for (i=0; i<word.length; i++){ // at each index of a word
                this.singleModificationCollection.push(word.replace(word.charAt(i), letters[l])); // replace and add
            }
        }

    }

    _delete(word){
        var c;
        var results = [];

         // remove once character at a time
        for(c=0; c<word.length; c++){
            this.singleModificationCollection.push(word.replace(word.charAt(c), ''));
        }
    }

    _transpose(word){
        var c;
        var word = word.split('');

        // sub function to move character at index one position ahead
        function swap(index, arr){
            // create a copy of given word array to ensure not modifying the main array
            var arr2 = arr.slice(0);

            // extract elements to swap
            const current = arr[index - 1];
            const toSwap = arr[index];

            // assign new values and return string value
            arr2[index - 1] = toSwap;
            arr2[index] = current;
            return arr2.join('');
        }


        // switch on character at a time on index ahead
        if (word.length > 1){
            for (c=1; c<word.length; c++){
                this.singleModificationCollection.push(swap(c, word));
                }
            }
        }

    _reduce_collection(){
        var i;
        var result = [];
        for (i=0; i<this.singleModificationCollection.length; i++){
            if(this.data_base.includes(this.singleModificationCollection[i])){
                result.push(this.singleModificationCollection[i]);
            }
        }
        this.singleModificationCollection = result;
    }

    _probability(word, total){
        // advanced -> take word in front also as argument, to build real bayes

        // calculate probability of word
        const wordProba = this.data_base[word]
        return  this.data_base[word] / total;
    }

    // function to count all possible modifications
    single_edit_counts(word){

        // delete a letter form word
        this._delete(word);

        // insert a letter
        this._inserts(word);

        // count transposes
        this._transpose(word);

        // replace each letter of a given word with a letter from the abc
        this._replaces(word)
    }

     // function to count all possible modifications with two steps
    double_edit_counts(){}

    correction(word){
        this.singleModificationCollection = [];

        // create candidates with one modification step
        this.single_edit_counts(word);
        this._reduce_collection;

        var r, t, totalFreq;
        var suggestions = {};

        totalFreq = 0;
        for (t=0; t<this.singleModificationCollection.length; t++){
            if(this.data_base[this.singleModificationCollection[t]]){
                totalFreq = totalFreq + t;
            }
        }

        // check probability value of each word within the list and only take it
        for(r=0; r<this.singleModificationCollection.length; r++){
            const _proba = this._probability(this.singleModificationCollection[r], totalFreq);
            if(typeof _proba != 'undefined'&&_proba != null&&isNaN(_proba) === false){
                suggestions[this.singleModificationCollection[r]] = _proba;
            }
        }

        // return only top 5

        // Create items array
        var items = Object.keys(suggestions).map(function(key) {
          return [key, suggestions[key]];
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
          return second[1] - first[1];
        });

        // Create a new array with only the first 5 items
        // console.log(items.slice(0, 5));
        return items.slice(0, 5);
    }


}


 // LOAD DATA TO CLIENT
async function data_load(word_base){
    const data = await fetch(word_base)
        .then(function(resp){ return resp.json()})
        .then(data => sc = new SpellingCorrection(data))
     return sc;
    }

var sc = data_load("word_proba.json");


function liveSuggestion(){
    var input, result, txtValue, suggest, i;
    input = document.getElementById('input-box').value;
    result = document.getElementById('result-list');


    result.innerHTML = '';
    if(input.length>2){
        suggest = sc.correction(input);

        for (i=0; i<suggest.length; i++){
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(suggest[i][0]));
            result.appendChild(li);
        }
    }
}

// add event listener for word in input box
document.getElementById('input-box').addEventListener("keyup", liveSuggestion);

// add event listener for select correction
document.getElementById("result").addEventListener("click", function(e){
    if(e.target.matches("li")){

        // replace current misspelling with selection
        document.getElementById("input-box").value = e.target.textContent;

        // clean list
        document.getElementById("result-list").innerHTML = '';
    }
})


