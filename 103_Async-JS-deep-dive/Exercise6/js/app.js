"use strict";

// Refactor the promise code to create an async function that will 
// take a todo object as a parameter and add the todo to the jsonplaceholder site. 
// Make sure you account for possible errors.

let todo = {
    completed: false,
    userId: 1,
    title: "Learn Promises"
};

const AddTodos = async (todo) => {

    try {
        const created = await fetch('https://jsonplaceholder.typicode.com/todos/', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(todo)
            })
            .then(resp => resp.json());
        
        return created;
    } catch(error) {
        return error;
    }
}

// fetch('https://jsonplaceholder.typicode.com/todos/', {
//     method: 'POST',
//     headers: {
//         "Content-type": "application/json"
//     },
//     body: JSON.stringify(todo)
// })
// .then(resp => resp.json())

AddTodos(todo)
.then(obj => console.log(obj))
.catch(reject => console.log(`Unable to create todo ${reject}`));

console.log('Other code');