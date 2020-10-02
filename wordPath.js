let mainTable = document.createElement('table');
let tableRow = undefined;
let tableCell = undefined;

document.body.appendChild(mainTable);

// Use a worker process to load the .json file with the word list and return it to the main
// process. Need to do this to avoid deprecation warnings of file loading in the main
// process slowing down content rendering.
let letterArray = [];

if(window.Worker) {
    const downloadWorker = new Worker("listDownloadWorker.js");
    // Need to post a message to get the worker to activate. The message can be anything and its values 
    // isn't used inside the worker.
    downloadWorker.postMessage("a");
    downloadWorker.onmessage = function(returnedArray){
        letterArray = returnedArray.data;
        console.log("return from worker.3");
        console.log(letterArray);
    }
} else{
    console.log("The browser doesn't support web workers");
}

// Split the full word list array into sub-arrays labeled by their starting letter within a larger object
// e.g. splitByFirstLetter_obj['a'] = [<list of words starting with 'a'>]
function getArrayIndex(firstLetterToMatch){
    let currEntry = "";
    for(let i=0; i < letterArray.length; i++){
        currEntry = letterArray[i];
        if(currEntry[0] === firstLetterToMatch){
            return(i);
            
        }
    }
}

function setUpGrid(){
    for(let currRow = 0; currRow < 4; currRow ++){
        tableRow = document.createElement('tr');
        mainTable.appendChild(tableRow);

        for(let currCol = 0; currCol < 4; currCol ++){
            tableCell = document.createElement('td');
            tableCell.id = currRow + "-" + currCol;
            tableRow.appendChild(tableCell);
        }

    }

}

function clearGrid(){
    let currCell = undefined;
    for(let currRow = 0; currRow < 4; currRow ++){
        for(let currCol = 0; currCol < 4; currCol ++){
            currCell = document.getElementById(currRow + "-" + currCol);
            currCell.innerHTML = ""  
        }
    } 
}

let diceHolder = [];

// dice 1
let dice1 = ['m','u','o','c','i','t'];
let dice2 = ['a','g','a','e','n','e'];
let dice3 = ['b','o','o','j','a','b'];
let dice4 = ['p','s','h','a','c','o'];
let dice5 = ['o','t','w','a','t','o'];
let dice6 = ['d','r','y','v','l','e'];
let dice7 = ['e','u','s','e','i','n'];
let dice8 = ['t','t','r','e','y','l'];
let dice9 = ['v','e','h','w','r','t'];
let dice10 = ['h','g','e','w','n','e'];
let dice11 = ['a','k','p','f','f','s'];
let dice12 = ['qu','i','m','n','h','u'];
let dice13 = ['e','i','t','s','o','s'];
let dice14 = ['d','t','y','t','i','s'];
let dice15 = ['x','r','d','i','l','e'];
// The only die without any vowels
let dice16 = ['n','h','n','l','r','z'];

diceHolder[0] = dice1;
diceHolder[1] = dice2;
diceHolder[2] = dice3;
diceHolder[3] = dice4;
diceHolder[4] = dice5;
diceHolder[5] = dice6;
diceHolder[6] = dice7;
diceHolder[7] = dice8;
diceHolder[8] = dice9;
diceHolder[9] = dice10;
diceHolder[10] = dice11;
diceHolder[11] = dice12;
diceHolder[12] = dice13;
diceHolder[13] = dice14;
diceHolder[14] = dice15;
diceHolder[15] = dice16;

/*
let letterHolder = {'a':0, 'b':0, 'c':0, 'd':0, 'e':0, 'f':0, 'g':0,
                    'h':0, 'i':0, 'j':0, 'k':0, 'l':0, 'm':0, 'n':0,
                    'o':0, 'p':0, 'qu':0, 'r':0, 's':0, 't':0, 'u':0,
                    'v':0, 'w':0, 'x':0, 'y':0, 'z':0};
*/

//Math.floor(Math.random() * diceHolder.length)

let vowels = ['a','e','i','o','u'];
let numVowels = document.getElementById("slider").value;
let selectedVowels = [];
let selectedConsanants = [];
let selectedLetters = [];
let vowelCounter = 0;

function rollDice(){
    let dieFace = 0;
    let dieLetter = '';
    let dieNum = 0;
    let currDie = [];
    let isVowel = 0;
    let isConsanant = 0;
    selectedVowels = [];
    selectedConsanants = [];
    // Deep copy of the nested array from here:
    // https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig
    let diceHolderCopy = JSON.parse(JSON.stringify(diceHolder)); 
    console.log("In rollDice");
    // Draw for the vowels
    for(let i = 0; i < numVowels; i++){
        console.log("In vowel for loop");
        isVowel = 0;
        // Randomly draw a die that has vowels (all die except the last one)
        dieNum = Math.floor(Math.random() * (diceHolderCopy.length - 1));
        // Pop the dice entry from the array
        currDie = diceHolderCopy.splice(dieNum, 1);
        console.log("CurrDie is: " + currDie);
        while(isVowel === 0){
            console.log("In vowel while loop");
            dieFace = Math.floor(Math.random() * 6);
            //currDie is still a nested array, so need the dual indexing here to get the letter.
            dieLetter = currDie[0][dieFace];
            console.log("Curr dieFace is: " + dieFace + " curr dieLetter is: " + dieLetter);
            if(vowels.includes(dieLetter)){
                selectedVowels.push(dieLetter);
                isVowel = 1;
            }
        }
    }

    // Draw for the consonants
    for(let i = 0; i < (16 - numVowels); i++){
        isConsanant = 0;
        // Randomly draw any die (including the last one)
        dieNum = Math.floor(Math.random() * diceHolderCopy.length);
        // Pop the dice entry from the array
        currDie = diceHolderCopy.splice(dieNum, 1);
        while(isConsanant === 0){
            dieFace = Math.floor(Math.random() * 6);
            //currDie is still a nested array, so need the dual indexing here to get the letter.
            dieLetter = currDie[0][dieFace];
            if(!vowels.includes(dieLetter)){
                selectedConsanants.push(dieLetter);
                isConsanant = 1;
            }
        }
    }

    console.log("The selected vowels are: " + selectedVowels);
    console.log("The selected consonants are: " + selectedConsanants);
    // Concatenate the two arrays together, resulting in another array.
    selectedLetters = selectedVowels.concat(selectedConsanants);
    console.log("The selected letters are: " + selectedLetters);

}

// Fisher-Yates shuffling algorithm from here:
// https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
function shuffleArray(){
    let startTime = new Date().getTime();
    console.log(startTime);
    for(let i = selectedLetters.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const tempEntry = selectedLetters[i];
        selectedLetters[i] = selectedLetters[j]
        selectedLetters[j] = tempEntry;
    }
    console.log("The selected letters are: " + selectedLetters);
    let endTime = new Date().getTime();
    console.log(endTime);

    console.log("The shuffling took: " + endTime - startTime + " ms");
    return selectedLetters;
}




function displayBoard(shuffledArray){
    let currRow = 0;
    let currCol = 0;
    let currEntry = "";
    for(let i = 0; i < 16; i++){
        currRow = Math.floor(i / 4);
        currCol = i - (4 * currRow);

        console.log("i is: " + i + " currRow is: " + currRow + " currCol is: " + currCol);
        currEntry = shuffledArray[i];
        if(currEntry.length === 1){
            currEntry = currEntry.toUpperCase();
        } else{
            // For Qu
            currEntry = currEntry[0].toUpperCase() + currEntry[1];
        }


        // Assign in the letter to the correct grid position
        document.getElementById(currRow + "-" + currCol).innerHTML = currEntry;

    }
}

setUpGrid();
function makeGame(){
    
    clearGrid();

    rollDice();

    let shuffledArray = shuffleArray();

    console.log("The shuffled letters are: " + shuffledArray);

    displayBoard(shuffledArray);
}

makeGame();

let newGameButton = document.getElementById("new-game");
newGameButton.addEventListener("click", makeGame); 

let countDown = undefined;
let timeFromNow = undefined;
let timeRemaining = undefined;
// Length of the timer in minutes
let timerLength = 2.0;

function startCountdown(){

    console.log("The time remaining in the start is: " + timeRemaining);
    if(timeRemaining === undefined){
        // need to multiply minutes by 60000 to get the number of miliseconds 
        timeFromNow = new Date().getTime() + (timerLength * 60000);
    } else{
        timeFromNow = new Date().getTime() + (timeRemaining * 60000);
    }

    countDown = setInterval(countdownTimer, 1000);
    
}

function endCountdown(){
    console.log("ending: " + countDown);
    // Add the value from the html inner element to the timeFromNow var
    // so that if the countdown's started again, it picks up from where the previous
    // countdown ended
    let htmlText = document.getElementById("countdown-timer").innerHTML;
    let minuteEntry = Number(htmlText.split(" min")[0]);
    let secondEntry = Number(htmlText.split(", ")[1].split(" sec")[0]);
    let secondsAsFracMin = secondEntry / 60;
    timeRemaining = minuteEntry + secondsAsFracMin;
    console.log("Setting the time remaining to be: " + timeRemaining);

    // Change the text in the start button to be re-start
    document.getElementById("countdown-start").innerHTML = "Re-start the countdown!";
    clearInterval(countDown);
}

function restartCountdown(){
    timeRemaining = timerLength;
    document.getElementById("countdown-timer").innerHTML = timeRemaining + " min, 0 sec";
    document.getElementById("countdown-start").innerHTML = "Start the countdown!";
}

function countdownTimer(){
    let now = new Date().getTime();
    let diff = timeFromNow - now;
    console.log("diff is: " + diff);
    console.log(countDown);
    console.log("in countdown timer");
    console.log(" Time from now is: " + timeFromNow);
    console.log("Now is: " + now);
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60) / 1000));

    document.getElementById("countdown-timer").innerHTML = minutes + " min, " + seconds + " sec";

    if(diff < 0){
        clearInterval(countDown);
        document.getElementById("countdown-timer").innerHTML = "Out of time!";
    }
}

let countdownStart = document.getElementById("countdown-start");
countdownStart.addEventListener("click", startCountdown);

let countdownStop = document.getElementById("countdown-stop");
countdownStop.addEventListener("click", endCountdown);

let countdownRestart = document.getElementById("countdown-restart");
countdownRestart.addEventListener("click", restartCountdown);

function updateSlider(){
    numVowels = document.getElementById("slider").value;
    console.log("Number of vowels to include is: " + numVowels);
    document.getElementById("num-vowel").innerHTML = numVowels;
    makeGame();
}
    
//document.getElementById("num-vowel").innerHTML = 
let slider = document.getElementById("slider")
slider.addEventListener("change", updateSlider);

// Toggling whether to calculate and show found words or not
let isToggled = false;


// Make a list of all the 2-letter stems that ARE represented in the splitByFirstLetter_obj
let representedTwoLetterStems = [];
function calculateTwoLetterStems(){
    let currLetterList = [];
    let currTwoLetterEntry = "";
    for(i=1; i<27; i++){
        // From https://stackoverflow.com/questions/3145030/convert-integer-into-its-character-equivalent-where-0-a-1-b-etc/3145054#3145054
        currLetter = String.fromCharCode(96 + i); // where n is 0, 1, 2 ...
        currLetterList = splitByFirstLetter_obj[currLetter];
        for(let j = 0; j < currLetterList.length; j++){
            // Retain 3 letters if word starts with 'q' because 'qu' is a single die entry,
            // else just retain the normal 2.
            if(currLetterList[j][0] === "q"){
                currTwoLetterEntry = currLetterList[j].slice(0,3);
            } else{
                currTwoLetterEntry = currLetterList[j].slice(0,2);
            }
            if(representedTwoLetterStems.includes(currTwoLetterEntry)){
                continue;
            } else{
                representedTwoLetterStems.push(currTwoLetterEntry);
            }
        }
    }
}

let splitByFirstLetter_obj = {};
let listLengthEachLetter = {};
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
        // Only look for the next letter if this is at most the second to the last letter in the alphabet.  
        if(i<26){
            nextLetter = String.fromCharCode(96 + i + 1); // where n is 0, 1, 2 ...
            nextLetterStartIndex = getArrayIndex(nextLetter);
            console.log("The next letter is: " + nextLetter + " with list index: " + nextLetterStartIndex);
        } else{
            nextLetterStartIndex = letterArray.length - 1;
        }

        // Need to use [] when using a var to provide the name for the key in an object.
        // Here assigning in (shallow) copied entries of the original list that start with 
        // each letter of the alphabet
        splitByFirstLetter_obj[currLetter] = letterArray.slice(currLetterStartIndex, nextLetterStartIndex);
        listLengthEachLetter[currLetter] = nextLetterStartIndex - currLetterStartIndex; 
    }
}

function checkIfWordStartInList(wordStart){
    // Will act as 3-level boolean with 
    // 0 = wordStart not in the list (stop this direction of searching),
    // 1 = wordStart in the list as a subset of a longer word (so keep the search going)
    // 2 = wordStart is a word in the list, and should be counted as another word found (and keep search going)
    let wordStartInList = 0;
    let firstLetter = wordStart[0];
    let wordStartLength = wordStart.length;
    let currLetterWordList = splitByFirstLetter_obj[firstLetter];
    let currWordFromList = "";
    for(let i = 0; i < currLetterWordList.length; i++){
        currWordFromList = currLetterWordList[i];
        if(currWordFromList === wordStart){
            console.log("Word match found for word: " + wordStart);
            wordStartInList = 2;
            return wordStartInList;
        }else if(currWordFromList.length < wordStartLength){
            continue;
        } else{
            if(currWordFromList.slice(0,wordStartLength) === wordStart){
                // Set to 1 but don't return, because this may be a full word as well as the stem of another
                // (search path will continue in both cases)
                wordStartInList = 1
            }
        }
    }
    return wordStartInList;
}



function convertRowColToIndex(row, col){
    let index = undefined;
    index = (row * 4) + col
    console.log("In convertRowColToIndex. Conversion from row: " + row + " col: " + col + " to index: " + index);
    return index;
}

function convertIndexToRowCol(index){
    row = Math.floor(index / 4);
    col = index - (4 * row);
    return [row,col];
}

// Converts from index (0-15) to row/column, gets the possible moves given the index,
// then converts those back to index values for return.

// Given a list of the previous moves (index values visited previously)
// this finds the last move, and checks for possible moves based on it
// (making sure the same index isn't visited twice)
function getPossibleMoves(prevMoveList){
    //console.log("In get poss. moves, the prev move list is: " + prevMoveList);
    // This works correctly regardless of whether the prevMoveList has a single entry (in which case this 
    // selects that) or multiple entries (in which case it selects the last one)
    let lastMove = prevMoveList[prevMoveList.length - 1];
    let possMoves = [];
    let rowColConversion = convertIndexToRowCol(lastMove);
    let possIndex = undefined;
    let currRow = rowColConversion[0];
    let currCol = rowColConversion[1];
    //console.log("In get poss. moves, the conversion from index: " + lastMove + " is row: " + currRow + " col: " + currCol);
    // North-based checks
    if(currRow > 0){
        // Check North
        possIndex = convertRowColToIndex(currRow -1, currCol);
        if(!prevMoveList.includes(possIndex)){
            possMoves.push(possIndex);
        }
        

        // Check Northwest
        if(currCol > 0){
            possIndex = convertRowColToIndex(currRow - 1, currCol - 1);
            if(!prevMoveList.includes(possIndex)){
                possMoves.push(possIndex);
            }
        }

        // Check Northeast
        if(currCol < 3){
            possIndex = convertRowColToIndex(currRow - 1, currCol + 1);
            if(!prevMoveList.includes(possIndex)){
                possMoves.push(possIndex);
            }
        }
    }

    // South-based checks
    if(currRow < 3){
        // Check South
        possIndex = convertRowColToIndex(currRow +1, currCol);
        if(!prevMoveList.includes(possIndex)){
            possMoves.push(possIndex);
        }
        // Check Southwest
        if(currCol > 0){
            possIndex = convertRowColToIndex(currRow + 1, currCol - 1);
            if(!prevMoveList.includes(possIndex)){
                possMoves.push(possIndex);
            }
        }

        // Check Southeast
        if(currCol < 3){
            possIndex = convertRowColToIndex(currRow + 1, currCol + 1)
            if(!prevMoveList.includes(possIndex)){
                possMoves.push(possIndex);
            }
        }
    }

    // Check West
    if(currCol > 0){
        possIndex = convertRowColToIndex(currRow, currCol - 1);
        if(!prevMoveList.includes(possIndex)){
            possMoves.push(possIndex);
        }
    }

    // Check East
    if(currCol < 3){
        possIndex = convertRowColToIndex(currRow, currCol + 1);
        if(!prevMoveList.includes(possIndex)){
            possMoves.push(possIndex);
        }
    }

    return possMoves;

}

// Will be an object of objects, where the keys of the main object are the generations (0-15) that are possible
// (largest possible word is 16 letters), and the entries for each object are themselves objects with the 
// key of those objects being each letter string produced so far for that generation and the entry being
// an array of the dice numbers visited in order to produce that string.
let visitTracker_obj = {};
let completedWordObject = {};
function calculateAnswers(index, currRow, currCol){
    let currLetter = document.getElementById(currRow + "-" + currCol).innerHTML.toLowerCase();
    // Will hold the object representing the word stems and traversal paths going into the 
    // current genNum
    let prevGenObject = {};
    let prevGenKeys = [];
    let prevPath = [];
    let lastIndex = undefined;
    let lastEntry = "";
    let possLetter = "";
    let possIndex = undefined;
    let possRow = undefined;
    let possCol = undefined;
    let rowColConversion = undefined;
    let possWord = "";
    let possibleMoves = undefined;
    let possWordReturnCode = 0;
    let nextPath = [];
    
    // Reset the global object
    visitTracker_obj = {};
    for(let genNum = 0; genNum < 16; genNum++){
        // Initialize the tracker object with e.g. visitTracker_obj[0] = {'H':2} if the third die has 'H'
        if(genNum === 0){
            visitTracker_obj[genNum] = {};
            // in example above, genNum = 0, currLetter = 'H', index = 2
            visitTracker_obj[genNum][currLetter] = index;
            console.log("For genNum: " + genNum + " first letter is: " + currLetter);
            console.log(visitTracker_obj);
            lastEntry = currLetter;
        } else if(genNum === 1){
            visitTracker_obj[genNum] = {};
            lastIndex = visitTracker_obj[genNum - 1][lastEntry];
            // The lastIndex here forms the prevMoveList to the getPossibleMoves function, 
            // and needs to be in list form.
            // This is an edge case
            possibleMoves = getPossibleMoves([lastIndex]);
            console.log("For genNum: " + genNum + " The possible moves are: " + possibleMoves);
            // Loop through the array of possible moves. 
            // The elements of the array are the index values of the possible moves.
            // Use the index to get the corresponding row/col and look up the letter 
            // on the die at that position
            for(let i = 0; i < possibleMoves.length; i++){
                possIndex = possibleMoves[i];
                rowColConversion = convertIndexToRowCol(possIndex);
                possRow = rowColConversion[0];
                possCol = rowColConversion[1];
                console.log("For poss move num: " + i + " The row is: " + possRow + " and the col is: " + possCol);
                // Get the letter represented by the current possible move
                possLetter = document.getElementById(possRow + "-" + possCol).innerHTML.toLowerCase();
                // If the first letter and the letter represented by the possible move
                // represent a two-letter start combo that's in the word list, then add
                // it to the visitTracker_obj, 
                console.log("The last entry is: " + lastEntry + " the poss. letter is: " + possLetter + " and the combo is: " + lastEntry + possLetter);
                if(representedTwoLetterStems.includes(lastEntry + possLetter)){
                    // Assign the lastIndex and possIndex to a list 
                    visitTracker_obj[genNum][lastEntry + possLetter] = [lastIndex, possIndex];
                    console.log("For gen: " + genNum + " adding entry: " + lastEntry + possLetter + " with index track: " + lastIndex + "," + possIndex);
                } else{
                    console.log("For gen: " + genNum + " SKIPPING entry: " + lastEntry + possLetter + " with index track: " + lastIndex + "," + possIndex);
                    continue;
                }
            }

        } else if(genNum > 1){
            visitTracker_obj[genNum] = {};
            console.log("the genNum is: " + genNum);
            //console.log(" the prev. gen num is: " + (genNum - 1));
            prevGenObject = visitTracker_obj[(genNum - 1)];
            console.log("visitTracker_obj keys are: " + Object.keys(visitTracker_obj));
            console.log("last genNum is: " + (genNum - 1));
            console.log("prevGenObject is: " + prevGenObject);
            // These are the strings generated from the previous generation
            prevGenKeys = Object.keys(prevGenObject);
            console.log("For genNum: " + genNum + " the keys are: " + prevGenKeys);
            console.log("And the values are: " + Object.values(prevGenObject));
            for(let i = 0; i < prevGenKeys.length; i++){
                // This is the string
                lastEntry = prevGenKeys[i];
                // This is the path to get to the string
                prevPath = prevGenObject[lastEntry];
                // HERE DEBUG
                console.log
                possibleMoves = getPossibleMoves(prevPath);
                console.log("In for. The lastEntry is: " + lastEntry + " the prevPath is: " + prevPath);
                //console.log("Is the prevPath an array? " + Array.isArray(prevPath));
                console.log("The possible moves are: " + possibleMoves);

                // For each of the possible moves, see whether it provides a finished word or not.
                for(let i = 0; i < possibleMoves.length; i++){
                    possIndex = possibleMoves[i];
                    rowColConversion = convertIndexToRowCol(possIndex);
                    possRow = rowColConversion[0];
                    possCol = rowColConversion[1];
                    //console.log("For poss move num: " + i + " The row is: " + possRow + " and the col is: " + possCol);
                    // Get the letter represented by the current possible move
                    possLetter = document.getElementById(possRow + "-" + possCol).innerHTML.toLowerCase();
                    possWord = lastEntry + possLetter;
                    //possWordReturnCode acts as 3-level boolean with 
                    // 0 = wordStart not in the list (stop this direction of searching by not including the 
                    // word and its path in the visitTracker_obj object for the current genNum),
                    // 1 = wordStart in the list as a subset of a longer word (so keep the search going by
                    // adding the word and its path to the visitTracker_obj object for the current genNum)
                    // 2 = wordStart is a word in the list, and should be counted as another word found,
                    // and the word and its path are added to the completedWordObj as well as the visitTracker_obj
                    // in case the current complete word is also part of a longer word to be found as well.

                    possWordReturnCode = checkIfWordStartInList(possWord);

                    if(possWordReturnCode == 0){
                        console.log("In return code 0");
                        continue;
                    }

                    if(possWordReturnCode == 1){
                        console.log("In return code 1");
                        console.log("The prevPath is: " + prevPath + " and the poss. index is: " + possIndex);
                        // Makes a clone of the prevPath array so the following push doesn't affect the 
                        // values in the prevPath
                        nextPath = [...prevPath];
                        nextPath.push(possIndex);
                        visitTracker_obj[genNum][possWord] = nextPath;
                    }

                    if(possWordReturnCode == 2){
                        console.log("In return code 2");
                        console.log("The prevPath is: " + prevPath + " and the poss. index is: " + possIndex);
                        // Makes a clone of the prevPath array so the following push doesn't affect the 
                        // values in the prevPath
                        nextPath = [...prevPath]
                        nextPath.push(possIndex);
                        // If this word was already found, then add the new path found to make the
                        // word to the previous path(s)
                        if(Object.keys(completedWordObject).includes(possWord)){
                            // push as an array
                            completedWordObject[possWord].push([nextPath]);
                        } else{
                            completedWordObject[possWord] = [];
                            completedWordObject[possWord].push([nextPath]);
                        }
                        visitTracker_obj[genNum][possWord] = nextPath;
                    }
                }  
            }
        }

        console.log(visitTracker_obj);

    }
}


let wordTable = document.createElement('table');
let wordTableRow = undefined;
let createdWordCell = undefined;
let createdPathCell = undefined;

document.body.appendChild(wordTable);

// Initialize the table by looping through the desired number of rows first, creating those
// then looping through the desired number of columns, adding a cell in each row for 
// each desired column. Set the ID of each table cell to be the <rowNum>-<colNum> (0-based)
function makeWordTable(){

    for(let i = 0; i < completedWordObject.length; i++){
        wordTableRow = document.createElement('tr');
        wordTable.appendChild(wordTableRow);
        
        createdWordCell = document.createElement('td');
        //createdWordCell.id = currRow + "-" + currCol;
        createdWordCell.className = 'word-cell';
        createdWordCell.innerHTML = Object.keys(completedWordObject)[i]

        createdPathCell = document.createElement('td');
        createdPathCell.className = 'path-cell';
        createdPathCell.innerHTML = completedWordObject[Object.keys(completedWordObject)[i]];

        // Add the path order number to the cell
        //createdCell.innerHTML = rowHolder[currRow][currCol];
        // initialize as non-path (will find the path in a later function)
        //createdCell.className = 'non-path';
        
        wordTableRow.appendChild(createdWordCell);
        wordTableRow.appendChild(createdPathCell);
    }
}

// Due to the tracking of multiple potential paths for each word,
// when indexing into completedWordObject, need to provide 2 indices (works regardless of 
// whether the current word has multiple paths or only 1 path) e.g.
// 1 path
// completedWordObject['list'][0][0]
// returns Array(4) [ 8, 9, 10, 5 ]
// 2 paths
// completedWordObject['sea'][0][0]
// returns Array(3) [ 10, 14, 15 ]
//completedWordObject['sea'][0][0]
// returns Array(3) [ 13, 14, 15 ]  

function showWordAnswers(){
    isToggled = toggle.checked;
    if(isToggled){
        let completedWordObject = {};
        console.log("Showing answers");
        console.log(letterArray);
        // Provides object of arrays, with keys for each letter, and values for all words
        // starting with that letter in the var splitByFirstLetter_obj
        splitArrayByFirstLetter();


        // let testOut1 = checkIfWordStartInList("aardvark");
        // console.log("testOut1 is: " + testOut1);

        // let testOut2 = checkIfWordStartInList("cat");
        // console.log("testOut2 is: " + testOut2);

        // let testOut3 = checkIfWordStartInList("axz");
        // console.log("testOut3 is: " + testOut3);

        calculateTwoLetterStems();
        // There are 365 2-letter stems represented from words (of 676 of the possible combos [26 * 26])
        console.log("The two letter stems are: ");
        console.log(representedTwoLetterStems);

        // Start with each die in the 16 grid, and try to build words out from there.
        for(let i = 0; i < 16; i++){
            currRow = Math.floor(i / 4);
            currCol = i - (4 * currRow);
            console.log("calculateAnswers called.");
            calculateAnswers(i, currRow, currCol);
        }

    }
    
}

let toggle = document.getElementById("toggle");
toggle.addEventListener("click", showWordAnswers);

// <!-- Display the countdown timer in an element -->
// <p id="demo"></p>

// <script>
// // Set the date we're counting down to
// var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

// // Get today's date and time
// var now = new Date().getTime();

// // Find the distance between now and the count down date
// var distance = countDownDate - now;

// // Time calculations for days, hours, minutes and seconds
// var days = Math.floor(distance / (1000 * 60 * 60 * 24));
// var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// var seconds = Math.floor((distance % (1000 * 60)) / 1000);

// // Display the result in the element with id="demo"
// document.getElementById("demo").innerHTML = days + "d " + hours + "h "
// + minutes + "m " + seconds + "s ";

// // If the count down is finished, write some text
// if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
// }
// }, 1000);
// </script>









