function bubbleSort(inputArray){
  let isSwapped = false;
  let currEntry = undefined;
  let nextEntry = undefined;
  let temp = undefined;
do {
  isSwapped = false;
  console.log("in do.");
  for(let i = 0; i < inputArray.length; i++){
      console.log("in for");
    if(i < (inputArray.length - 1)){
        console.log("in if");
        // If the first character is a string, make lowercase before converting to char code, else don't
        if(isNaN(inputArray[i])){
            currEntry = inputArray[i].toLowerCase().charCodeAt(0);
        } else{
            currEntry = inputArray[i].charCodeAt(0);
        }

        if(isNaN(inputArray[i + 1])){
            nextEntry = inputArray[i + 1].toLowerCase().charCodeAt(0);
        } else{
            nextEntry = inputArray[i + 1].charCodeAt(0);
        }
        console.log("The current entry is: " + currEntry + " and the next entry is: " + nextEntry);
        if(nextEntry < currEntry){
            console.log("in if 2");
          temp = inputArray[i];
          inputArray[i] = inputArray[i + 1];
          inputArray[i+1] = temp;
          isSwapped = true;
        }
     }
  }

} while (isSwapped);

  return inputArray;
}

let arrayTest = ['Gussy','apple','taco','Nicki','Blue', 'natto', 'Wild','ocean','moss','stump','75'];
console.log(arrayTest);
let sortedArray = bubbleSort(arrayTest);

console.log(sortedArray.join(' '));
