
/*
    Using the random number code below, 
    set up a generator function that will act as a producer of a random value. 
    It should return a random number whenever next is invoked. 
    Set the function up so it can be used to create a random number 
    between 1 and 100 or 1 and 10 or between 1 and any number; 
    
    basically the end number should be whatever is passed into the function. 
*/
const randomizer = function * (end) {

    // Failed
    // let randomNumber = Math.floor(Math.random() * end) + 1; 
    // yield randomNumber;

    while(true) {
        let randomNumber = Math.floor(Math.random() * end) + 1; 

        yield randomNumber
    }
}

var random100 = randomizer(100);