let letterArray = [];
onmessage = function (input){
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

postMessage(letterArray);