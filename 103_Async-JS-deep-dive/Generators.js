"use strict";

// Making a Itiretor 

const arr = ['a', 'b', 'c', 'd']

// Works wooo
let it = arr[Symbol.iterator]();

// Manual Generator/Iterator
let arrIt = function *(arr) {
    for (let i = 0; i < arr.length; i++) {
        yield arr[i];
    }
}

let itGen = arrIt(arr);

console.log("Remaining Code")

// Create a Iterator for a Object

let obj = {
    1: "a",
    2: "b",
    3: "c"
}

obj[Symbol.iterator] = function * () {
    for (let i = 1; i < 4; i++) {
        yield this[i];
    }
}

for (let v of obj) {
    console.log(v);
}

// TWO WAY COMMUNICATION WITH Generators

function * YieldConsole() {
    let value = yield;
    console.log(value);
}

let itTwoWay = YieldConsole();

// Can be done by doing this
// itTwoWay.next("Content TEXT Hello")

// Reading value recenlty sended
// itTwoWay.next().value