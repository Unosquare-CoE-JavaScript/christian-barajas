"use strict";

// First, add the setTimeout code as shown in the intro to this exercise. 
// Then modify the code by creating a promise so that the code can run asynchronously.

const massiveProcess = function(num) {
    let result = 0; 
    setTimeout(function() {
        for (let i = num ** 7; i >= 0; i--) {        
            result += Math.atan(i) * Math.tan(i);
        };
        return result;
    }, 0);
    
};

const massiveProcess$ = function(num) {
    let result = 0; 
    return new Promise(function(resolve, reject) {
        for (let i = num ** 7; i >= 0; i--) {        
            result += Math.atan(i) * Math.tan(i);
        };
        return resolve(result);
    })
}

massiveProcess$(10)
    .then(response =>{
        let amount = response;
        console.log("The number is: " + amount);
    })
    .catch(error => console.error(error));



//More processing later on
console.log(5 * 5 + 100);
