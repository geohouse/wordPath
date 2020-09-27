// Currently gives error:
// Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user’s experience. For more help http://xhr.spec.whatwg.org/


// Prob need to use a Worker to get around this
// The worker seems to only be able to work properly when the website and Worker.js code are
// hosted on a website (ie not locally - gives security error).
// Will need to set this up on GitHub sites to test it.

let letterArray = [];

if(window.Worker) {
    const downloadWorker = new Worker("listDownloadWorker.js");
    downloadWorker.postMessage("a");
    downloadWorker.onmessage = function(returnedArray){
        letterArray = returnedArray.data;
        console.log("return from worker");
        console.log(letterArray);
    }
} else{
    console.log("The browser doesn't support web workers");
}


// No idea exactly how this works, just that it does! Gets the word list in an array called data.
// from here:
// https://forum.freecodecamp.org/t/javascript-version-of-jquery-getjson/20365

function getWordList(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/words/an-array-of-english-words/master/index.json', false);

    request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
        // Success!
        letterArray = JSON.parse(this.response);
        //console.log(letterArray);
    } else {
        // We reached our target server, but it returned an error

    }
    };

    request.onerror = function() {
    // There was a connection error of some sort
    };

    request.send();
}

getWordList();

function getArrayIndex(firstLetterToMatch){
    let currEntry = "";
    for(let i=0; i < letterArray.length; i++){
        currEntry = letterArray[i];
        if(currEntry[0] === firstLetterToMatch){
            return(i);
            
        }
    }
}

let splitByFirstLetter_obj = {};
function splitArrayByFirstLetter(){
    let currLetter = "";
    let nextLetter = "";
    let currLetterStartIndex = 0;
    let nextLetterStartIndex = 0;
    for(i=1; i<27; i++){

        // From https://stackoverflow.com/questions/3145030/convert-integer-into-its-character-equivalent-where-0-a-1-b-etc/3145054#3145054
        currLetter = String.fromCharCode(96 + i); // where n is 0, 1, 2 ...
        currLetterStartIndex = getArrayIndex(currLetter);
        console.log("The curr letter is: " + currLetter + " with list index: " + currLetterStartIndex);

        nextLetter = String.fromCharCode(96 + i + 1); // where n is 0, 1, 2 ...
        nextLetterStartIndex = getArrayIndex(nextLetter);
        console.log("The next letter is: " + nextLetter + " with list index: " + nextLetterStartIndex);
    }
}

splitArrayByFirstLetter();

