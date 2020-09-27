let mainTable = document.createElement('table');
let tableRow = undefined;
let tableCell = undefined;

document.body.appendChild(mainTable);

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









