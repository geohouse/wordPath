function fibonacci(num){

    if(num<0){
        console.log("Can't calculate. Input num < 0");
    } else if(num === 0){
        return(0);
    } else if(num === 1){
        return(1);
    } else{
        return(fibonacci(num -1) + fibonacci(num - 2));
    }
}


function startFibonacci(){
    let numFib = document.getElementById("num-entries").value;

    console.log("numFib is: " + numFib);

    let result = fibonacci(numFib);

    document.getElementById("result").innerHTML = "Result is: " + result;
}


let calc = document.getElementById("calc");
calc.addEventListener("click", startFibonacci);