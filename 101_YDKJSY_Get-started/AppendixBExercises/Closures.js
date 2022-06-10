
/* 
    The range() function takes a number as its first argument, 
    representing the first number in a desired range of numbers.

    The second argument is also a number representing the end of 
    the desired range (inclusive).
    
    If the second argument is omitted, then another function 
    should be returned that expects that argument.

*/

function range(start, end) {
    // TODOO
    let range = []
    if(!isNaN(end)) {
        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        return range;
    } 

    return function (end) {
        let range = []
        if(!isNaN(end)) {
            for (let i = start; i <= end; i++) {
                range.push(i);
            }
    
            return range;
        } 
    }
}

function getRange(start,end) {
    let range = []

    for (let i = start; i <= end; i++) {
        range.push(i);
    }

    return range;
}

function rangeCorrect(start, end ) {
    start = Number(start) || 0;

    if(end === undefined) {
        return function getEnd(end) {
            return getRange(start,end);
        }
    } else {
        end = Number(end) || 0;
        return getRange(start,end);
    }

}

console.log('Range');
console.log(JSON.stringify(range(3,3))); // [3]
console.log(JSON.stringify(range(3,8))); // [3,4,5,6,7,8]
console.log(JSON.stringify(range(3,0))); // []

var start3 = range(3);
var start4 = range(4);
console.log('\n');
console.log(JSON.stringify(start3(3)));  // [3]
console.log(JSON.stringify(start3(8)));  // [3,4,5,6,7,8]
console.log(JSON.stringify(start3(0)));  // []
console.log('\n');
console.log(JSON.stringify(start4(6)));  // [4,5,6]

console.log('\n');
console.log('Range Corrected');

console.log(JSON.stringify(rangeCorrect(3,3))); // [3]
console.log(JSON.stringify(rangeCorrect(3,8))); // [3,4,5,6,7,8]
console.log(JSON.stringify(rangeCorrect(3,0))); // []

var start3 = rangeCorrect(3);
var start4 = rangeCorrect(4);
console.log('\n');
console.log(JSON.stringify(start3(3)));  // [3]
console.log(JSON.stringify(start3(8)));  // [3,4,5,6,7,8]
console.log(JSON.stringify(start3(0)));  // []
console.log('\n');
console.log(JSON.stringify(start4(6)));  // [4,5,6]