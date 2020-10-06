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
        currEntry = inputArray[i];
        nextEntry = inputArray[i+1];
        if(nextEntry < currEntry){
            console.log("in if 2");
          temp = currEntry;
          inputArray[i] = nextEntry;
          inputArray[i+1] = temp;
          isSwapped = true;
        }
     }
  }

} while (isSwapped);

  return inputArray;
}

let arrayTest = [87,1,23,12,67,102,23,42,2];
console.log(arrayTest);
let sortedArray = bubbleSort(arrayTest);

console.log(sortedArray.join(' '));
