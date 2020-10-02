let numEntries = 10;
let currTableCell = undefined;

let selectedCellText = "";
let currSelectedCell = 0;

function selectCell(cellNum){
    let currCell = document.getElementById(cellNum);

    if(cellNum != currSelectedCell){
        // Clear any last selection
        document.getElementById(currSelectedCell).className = "not-selected";
        document.getElementById("select-text").innerHTML = String.fromCharCode(160);
        currSelectedCell = cellNum;
    }

    selectedCellText = currCell.innerHTML;
    
    if(currCell.className === "is-selected"){
        currCell.className = "not-selected";
        // The String is a holder (&nbsp)
        document.getElementById("select-text").innerHTML = String.fromCharCode(160);
    } else{
        currCell.className = "is-selected";
        document.getElementById("select-text").innerHTML = selectedCellText;
    }

}

for(let i = 0; i < numEntries; i++){
    currTableCell = document.getElementById(i);
    // Use an anonymous function to call selectCell() in order to also be able to pass var 'i'
    currTableCell.addEventListener("click", function(){selectCell(i)}, false);
}