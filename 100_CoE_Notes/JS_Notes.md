
## JAVASCRIPT IN GENERAL

### Asynchronicity

- Engine Concurrency Model

  - V8 open source JS Engine, inside Chrome
  - Use of Web APIs like DOM, AJAX, and timeout, are provided by the browser
  - If you are running JS on back end, then instead of Web APIs you have NodeJS APIs
  - Javascript is a single threaded programming language, which means it has a single call stack and can do one thing at the time.
  - The call stack is a mechanism so the interpreter know its place in a script, when a script calls a function the interpreter adds it on the top of the call stack FIFO
  - When the current function is finished, the interpreter takes it off the stack (Last In, First Out);
  - When an Async call is completed, the callback function is pushed to the Task Queue.
  - The event loop has one simple job: it looks at the call stack and the task queue, and if the stack is empty, it takes the first item in the queue and sends it back to the call stack.

- JS Event Loop

  - It's responsabible for executing the code, collecting and processing event and executing queued sub-tasks.
  - Call Stack
    - Each entry in the Call Stack is called a Stack Frame.
    - It's a data structure which records basically where in the program we are.
    - And it's exactly how stack traces are being constructed when an exception is being thrown.
    - Blowing the stack - This happens when your each the maximum Call Stack size. specially if you're using recursion.
  - Memory Heap
    - Objects are allocated in a heap which is just a name to denote a large (mostly unstrctured) region of memory.
  - Callback Queue
    - A JS runtime uses a message queue, which is a list of messages to be processed. Each message has an associated function that gets called to handle the message.
    - At some point during the event loop, the runtime starts handling the messages on the queue, starting with the oldest one.
    - After the message is removed from the queue and its corresponding function is called wit the message as an input parameter. As always, calling a function creates a new call stack fram for that function's use.
    - The processing of functions contines until the stack is once again empty. Then, the even loop will process the next message in the queue, if there is one.
  - Event Loop
    - Usually resembles something like:
      ```javascript
      while (queue.waitForMessage()) {
        queue.processNextMessage();
      }
      ```
    - Each message is processed completely before any other message is processed.
    - A downside of this model is that if a message takes too long to complete, the Web App is unable to process user interactions like click or scroll(Talking about a browser JS engine).
    - In web browsers, messages are added anytime an event occurs and there is an event listener attached to it. If there is no listener, the event is lost.
    - Breaks down async code into ticks. A tick is a single iteration of the event loop that consist of phases that handle very specific things.
    - Event loop phases:
      1. Run die timers - Specify threshold after which callback may be executed.(setTimeout and setInterval)
      2. Call pending callbacks - Executes System Operator or I/O Callbacks.
      3. Run Idle/Prepare handles - Interal use only.
      4. Poll for I/O - Retrieves new events, executes I/O callbacks and timers. (For NodeJS, includes incoming, connections, data, etc)
      5. Run Check handles - setImmediate() callback invoked.
      6. Close callbacks - Any specific 'close' callbacks. (Like Sockets).
  - A web Worker or a cross-origin iframe has its won stack, heap, and message queue.
  - Two runtimes can only communicates though sending messages via the postMessage MEthod.
  - This method adds a message to the other runtime if the latter listens to message events.
  - Handlind I/O is typically performed via events and callbacks, so when the app is waiting for a query to return or an XHR request, it can still process other things like user input.

- Promises Sequential Execution

  - Chaining - each .then returns a new promise, so that we can call the next .then on it. Also you can load several script in sequence with loadScript. Also avoid nesting promises.
  - Error Handling, when a promise rejects, the control jumps to the closest rejection handler. The code of a promise executor and promise handlers has an "invisible try..catch" around it. It also happens in its handlers as well, if we throw inside a .then handler, that means a rejected promise.
    ```javascript
        new Promise((resolve, rejected) => {
            throw new Error("ERROR");
        });
        new Promise((resolve, reject) => {
            reject(new Error("ERROR));
        })
    ```

- Promises Execution

  - Promise.All([]) - It will run all promises until one of the following conditions are met:
    - All of them resolve, in turn, resolve the promise returned by the method.
    - One of them fails, will immediately reject the promise returned.
  - Promise.AllSettled([]) - Similar to Promise.All([]), but this metho wil not fail once the first promises is rejected. Istead it'll return a list of values, these values will be objects with two properties:
    1. The status of the returned promise (either rejected or fulfilled)
    2. The value of the fulfulled promise or the reason why a promise was rejected
  - Promise.Any([]) - Takes an array of promises and returns a single promise that resolves as soon as any of the promises in the input array fulfills. (The one that succeded first, in case none succeded, returns rejected)
  - Promise.race([]) - Similar to Promise.Any([]) except tha it returns a promise that resovles or rejects based on the fastest promises that resolves or reject. (expect the fastest promise that either succeds or fails).

- Async / Await

  - An async function is a function declared with the async keyword, and the await keyword is permitted within.
  - Enables Async Promise-based behavior to be written in a cleaner style, avoiding the need to explictly configure promise chains.
  - Also an Async function always returns a promise. Values will be wrapped in a resolved promise automatically.
  - The function execution pauses at the line and resumes when the promise settles. Doesn't cost any CPU resources.
  - Moderm Browsers allow top-level await in modules or IIFEs functions.

- Async / Await Error Handling try/catch best practices
  - We can catch that error rejection using try...catch
  ```javascript
  async function testThree() {
    try {
      const data = Promise.reject(new Error("Try again later"));
      await data;
    } catch (error) {
      console.log(error.message); // 'Try again later'
    }
  }
  ```

### OPP/FP

- JS Desing Patterns

  - There are several types of patterns, some are divided by:

    - Creational Patterns - consist of differente mechanisms used to create objects.
    - Structural Patterns - refer to how to assemble objects and classes into larger structures.
    - Behavioral Patters - Control communication and the assigment of responsibilities between different objects.

    - Module Pattern
        - Most common design patterns used in JS.
        - It's easy to use and creates encapsulation of our code
        - Modules are commonly used as singleton style objects where only one instance exists.
        - It's great for services and testing/TDD.
        - We can create a module by creating an IIFEs function an assigning it to a variable.
        - This Module will return what we know as it's PublicAPI, and leaving private data for interal use.
        
  - Creational Design Patters

    - Singleton

      - Design patterns that ensures that a class has only one immutable instance.
      - Can be instantiated once, and can be accessed globally.
      - Consist of an object that can't be copied or modified.
      - Often useful when we want to have some immutable single point of truth for our application.
      - One way to make sure that only one instance can be created, is by creating a variable to store the isntace and in a constructor set it only one.
      - We can use Object.freeze method to make sure that consuming code cannot modify the Singleton.

      ```javascript
      var instance;
      let item;
      class Singleton {
        contructor() {
          if (instance) {
            throw error("Instance already");
          }
          instance = this;
        }
        getItem() {
          return item;
        }
      }

      const SingletonInstance = Object.freeze(new Singleton());
      export default SingletonInstance;
      ```

      - Singletons are actually considered an anti-pattern and should be avoided in JS. (WHAT???)

    - Factory Method Pattern

      - Provides an interface for creating object that can be modified after creation.
      - The logic for creating our objects is centralized in a single place, simplifying and better organizing the code.
      - Can be implemented in two different ways, via classes or factory functions.
      - A function is a factory function when it returns a new object without the use of the new keyword.
      - With the factory pattern, we can easily create new objects that contains the custom keys and values.

      ```javascript
      const createObjectFromArray = ([key, value]) => ({ [key]: value });
      ```

      ```javascript
      class ItemObjectFactory {
        constructor(name, value) {
          this.name = name;
          this.value = value;
        }
        getItem() {
          return `${this.name} = ${this.value}`;
        }
      }
      const ItemObject = new ItemObjectFactory("ItemName", "ItemValue");
      console.log(ItemObject.name); // "ItemName"
      console.log(ItemObject.getItem()); // "ItemName = ItemValue"
      ```

      - In JS The factroy pattern isn't much more than a function tha returns a object without using the new keyword.

    - Abstract Factory Pattern

      - Calls the corresponding concrete factory fiven the corresponding logic. And that concrete factory is the one that returns the end object.
      - Basically it just adds an abstraction layer over the factory method pattern. so we can create many differente types of objects, but still interact with a single factory function or class.

      ```javascript
          class Car {
              constructor(){
                  this.name = "Card";
              }
          }
          class Driver {
              constructor(){
                  this.name = "Driver";
              }
          }

          const EntityAbstractFactory = () => {
              createEntity: function(type) {
                  switch(type){
                      case "Car": return new Car();
                      case "Driver": return new Driver();
                      default: return null;
                  }
              }
          }
          const Car = EntityAbstractFactory.createEntity("Car");
          const Driver = EntityAbstractFactory.createEntity("Driver");
      ```

    - Builder

      - Creates objects in steps. It separates the creation of the properties and methods into differente entities.
      - We can create an object and apply to it only the stes we need which is more flexible approach.

      ```javascript
      const AddMethodFormat = (obj) => {
        obj.format = () => console.log("Hello Formatted");
      };

      const Item = {
        name: "Name",
      };

      AddMethodFormat(Item);

      Item.format(); // Hello Formatted
      ```

    - Prototye
      - It's a useful way to share properties among many objects of the same type.
      - The prototye is an object that's native to JS, and can be accessed by objects through the prototype chain.
      - When using ES6 classes, all properties that are defined on the class itself, methods on constructor are automatically added to the the prototype.
      - The term prototype chain idicates that there could be more than one step. (extends).

  - Structural Design Patterns

    - Adapter

      - Allows two objects with incompatible itnerfaces to itnereact with each other.

      ```javascript
      const ItemList = [{ name: "Name", value: 1.3 }];
      const newItem = { name: "Name,LastName", value: 234234432 };

      const ItemListAdapter = (item) => ({
        name: item.name.split(",")[0],
        value: parseFloat((item.value / 1000).toFixed(1)),
      });
      const ItemAdapted = ItemListAdapter(newItem);

      ItemList.push(ItemAdapted);
      ```

    - Decorator
      - Lets you attach new behaviors to bojects by placing them inside wrapper objects that contain the behavior.
      - Allows to reuse logic throughout our application.
    - Facade
      - Provides a simplified interface to a library, a framework, or any other complex set of classes.
      - Its a creational design pattern that provides a generic interface for creating objects.
      - We can specify the tpye of object being created and we do not need to explicitly require a constructor.
      - A simple example coul be JS's map, sort, reduce and filter function.
      - Shines if the object creation process involves dynamic factors or application config.
    - Proxy
      - Provides a substitute or placeholder for another object.
      - The idea is to control access to the original object, performing some kind of action before or after the request gets to the actual original object.
      - `const ItemProxy = new Proxy(Item, {});`, the secon argument of a Proxy is an object that represents the handler, in the handler object, we can define specific behavior based on the type of interaction. The methods used :
        - get: Gets invojed when trying to access a property.
        - set: Gets invoked when trying to modify a property.

  - Behaviroral Design Patterns
    - Observer
      - Lets you define a subscription mechanism to notify multipl e objects about any eents that happen to the objec the'yre observing.
      - Like having a event listener on a given object, and when that object performs the action we're listening for, we do something.
      - React's useEffect hook might be a good example.
    - State
      - Provides state-specific logic to a limited set of objects in which each object represents a particular state.

- JS Object Oriented Programing

  - Classes
    - JS introduced the class keyword in ES15.
    - The are abstract definitions representing the types of objects we want to have in our system.
    - It's just syntatic sugar over the existing prototyping technique. It continues its prototyping in the BG but makes the outer body look like OOP.
  - Inheritance
    - Inherits features from a parent class but possesses extra features which the parent doesn't.
  - Encapsulation
    - Objects provide an interface to other code that wants to use them but maintain their own internal state.
    - The object's internal state is keep private, meaning that it can only be accessed by the object's own methods, not from other objects.
  - Abstraction
    - An abstract keyword, are maintly for inheritance where other classes may derive from them.
    - In JS is to hide the implementation details and highlight an object's essential features to the users.
    - An Abstract class typically includes one or more abstract methods or property declarations.
    - An Abstract method is only declared and has no implementation or function body. It must be declared an Abstract class. And it's definitions can be added in the inherited classes.
  - super
    - This keyword is used to access properties on an object literal or class's `[[Prototype]]`, or invoke a superclass's constructor.
    ```javascript
    class Container {
      constructor(name) {
        this.name = name;
      }
    }
    class ChildItem extends Item {
      constructor(container, name, value) {
        super(container);
        this.name = name;
        this.value = value;
      }
    }
    ```
  - Typescript(superset)
    - It's JS with added syntax for types
    - Allowing to add data types
    - Allows specifying the types of data being passed around within the code and has the ability to report errors when the types don't match.

- JS Functional Programming

  - It's a paradignm of building computer programs using expressions and functions without mutating state and data.
  - Aims to write code that is clearer to understand and more bug resistant.
  - Requires us to write pure, deterministic functions which are less likely to be buggy.
  - For Functional programming, only uses pure functions.
  - Pure vs Impure Functions
    - Pure functions take some input and give a fixed output, they cause no side effects in the outside world.
    - Having an external variable for computing the output, this makes the function impure.
      ```javascript
      const add = (a, b) => a + b;
      const remove = (a, b) => (a + externalVar) / b;
      ```
  - The Tenets of Functional Programming
    - Functional programming depends on some rules:
      1. Don't mutate data
      2. Use pure functions: fixed output for fixed inputs, and no side effects.
      3. Use expressions and declarations.
  - Ex of Functional programming: String.slice, Array.filter, Array.join
  - Ex of Impure functions: Array.forEach, Array, push.
  - Object.assign - copies values from the provided object to a new object. Since functional programming is predicated on immutable data, we use it to make new objects based on existing objects.
  - High-order Fuctions
    - Functions that accept a function as an argument and return a function, often, they are used to add to the functionalty of a function.
    - HOF can be used with other functions as well and it works without any conflict or writing extra code.
    ```javascript
    const withLog = (fn) => {
      return (...args) => {
        console.log(`Calling ${fn.name}`);
        return fn(...args);
      };
    };
    function fnName(colour) {
      console.log(`Print colour ${colour}`);
    }
    withLog(fnName)("Green");
    ```
  - Currying

    - Breaking down a function that takes multiple arguments into one or multiple leves of higher-order functions.
    - When we are to curry it, we rewrite it distributing arguments into multiple levels as follows.
    - The benefit of currying is memoization. We can now memoize certain arguments in a function call so that they can be reused later without duplication and re-computation.

    ```javascript
    const add = (a, b) => a + b;
    // Curry
    const add = (a) => {
      return (b) => {
        return a + b;
      };
    };
    const simpleAdd = (a) => (b) => a + b;

    add(3)(5);
    simpleAdd(3)(5);
    ```

  - Composition
    - Passing the output of one function into input of another so as to create a combined output.
    ```javascript
    const range = (a, b) => (a > b ? [] : [a, ...range(a + 1, b)]);
    const multiply = (arr) => arr.reduce((p, a) => p * a);
    // Composition
    const factorial = (n) => multiply(range(1, n));
    ```
  - Immutability
    - In the Functional Programming world, we create values or objects by initializing them. Then we use them, but we do not change their values or their state. If we need, we create a new one, but we do not modify the existing object's state.

### Context & Scope

- JS Context

  - In JS, context refers to an object. Within an object the keyword this refers to that object (self) and provides an interface to the properties and method that are member of that object.
  - Rules ??
  - Explicit context

    - You can use call, apply and bind methods to tie a function into an object and call the function as if it belonged to that object.
    - Allow You to Dynamically Change the Context In Which a Function is Executed
    - Call() - Invokes a function with a specified context. In other words you can tie a function into an object as if it belonged to the object. You can also use call with functions that accept multiple values. Use call() when:

      - to chain object Constructors.
      - Run a function with an object.
      - invoke anonymous functions.

      ```javascript
          cont obj = { num: 2};

          function add(a){ return this.num + a};

          add.call(obj, 3);
          // The function gets its this from obj where it's bound to

          function addMultiple (a,b) {return this.num + a + b};

          addMultiple.call(obj, 3, 5);

          (function(a) {
              console.log(this.num + a);
          }).call(obj, a);

      ```

    - Apply() - Does the exact same as call(), The difference is that call() accepts an argument list, but apply() accepts an array of arguments.Use Apply() when:

      - Append an Array to Another Array.
      - To chain Object constructors.

      ```javascript
          cont obj = { num: 2};

          function addMultiple (a,b) {return this.num + a + b};

          addMultiple.apply(obj, [3, 5]);

          const numbers = [1,2]
          const otherNumbers = [3,4];

          numbers.push.apply(numbers, otherNumbers);

      ```

    - Bind() - It's reminiscent of call and apply, But instead of executing a function immediately, bind() returns a function that can be executed later on. Use Bind() when:

      - Create Bound Functions with Bind().
      - To make setTimeout Work.

      ```javascript
          cont obj = { num: 2};

          function addMultiple (a,b) {return this.num + a + b};

          const fnBinded = addMultiple.bind(obj, 3, 5)
          fnBinded();
      ```

- JS Scope 
    - Global Scope - it's the whole document and all the other functions and variables are contained in this global scope 
    - Local Scope, ariables declared inside the functions are considered to be of the loca scope and its further divided into function scoped and block scoped 
    - Function Scope, when a varaible is declared inside a function, it is only accessible within that function and cannot be used outside that function. 
    - Block Scope, A variable when declared inside the if or switch conditions or loop. To be consie the variables declared inside the curly braces are called as within block scope.

- Var vs let variable delcaration
  - var is called as function scope that is if a variable is declared using var keyword it will be accessible throughout the function.
  - let & const are also called as block scopes that is they are accessible within that particular block.

- Arrow Function vs regular functions
  - this value
    - Inside of a regular JS function this is dynamic.
    - Dynamic context means that the value of this depends on how the function is called
    - Inside of an Arrow function, differs considerably, resolving this lexically.
    - You are sure the arrow function doesn't define its own this.
  - Lexical Scoping, defines how variables names are resolved in nested functions: inner functions contain the scope of parent functions even if the parent function has returned.
  - Constructors
    - The regular function can easily construct objects. An for Arrow fucntion, a consequence of this resolved leixcally is that an arrow function cannot be used as a constructor.
  - Arguments object
    - For regular function, are special array-like object containing the list of arguments which the function has been invoked.
    - For Arrow function, no arguments special keyword is defined inside an arrow function.
  - Implicit return
    - For Regular function, if the statement is missing, or there's no expression afte rreturn statement, the function returns undefined.
    - For Arrow function, similar to regular function, only exception is, if the arrow function contains one expression, and you omit the function's curly braces, then the expression is implicitly returned.(called Inline arror functions).
  - Methods
    - Regular functions are the way to define methods on classes
    - Arrow functions, thanks to class field proposal, you can use the arrow function as methods inside classes.
- JS Hoisting

  - Hoisting is a JS mechanism where variables an function delcarations are moved to the top of their scope before code execution.
  - Inevitably this means that no matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or loca.
  - Function delcarations

  ```javascript
  // This function has been hoisted
  hoisted();

  function hoisted() {
    console.log("Hello");
  }
  ```

  - Function expression

  ```javascript
  //  function expression arent hoisted
  notHoisted();

  var notHoisted = function hoisted() {
    console.log("Hello");
  };
  ```

### Features

- Object and Array Destructing
  - Destructuring is a JS expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
  - Computed Property Name, Another object literal feature that also works for destructuring
    ```javascript
    const prop = "name";
    const { [prop]: value } = { name: "Hello", greetings: "Hi" };
    ```
- Spread Operator
  - Allows an iterable such as an array expression or string to be expanded in places where zero or more arguments(for function calls) or elements(for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.
- Rest parameters
  - Rest looks exactly like spread syntax. In a way, rest syntax is the opposite of spread syntax. Spread syntax "expands" an array into its elements, while rest syntax collects multiple elements and "condenses" them into a single element.
    - the main difference between rest and spread is that the rest operator puts the rest of some specific user-supplied values into a JavaScript array. But the spread syntax expands iterables into individual elements.
- Data Structures
  - Array - stores data in memory for later use, each array has a fixed number of cells decided on its creation, and each cell has a corresponding numeric index used to select its data.
  - Stacks/Queues - are conceptually simmilar, both are sequential structures, but queues process elements in the order they were entered rather than the most recent element. An FIFO
  - Linked List - Does not use physical placement of data in memory. Use a referencing system: elements are stored in nodes that contain a pointer to the next node, repeating until all nodes are linked.
  - Trees - Relation-based data structure, which specialize in representing heirarchical structures. Like a linked list, nodes contain both elements of data and pointers marking its relation to immediate nodes. Each tree has a root node, off of which all other nodes branch.
  - Graphs - Relation-based data structure helpful for storing web-like relationship, each node or vertex, as the'yre called in graphs has a title a value contined within and a list links (called edges) it has with other vertices
  - HastTAble / map - relies on the concept of key/value pairs, where the key is a searching string and th evalue is the data paired with that key.
- Array Functions
  - Reduce - Reduces te array to a single value with a reducer function, that takes the accumulated value and the next item in the array and returns the new value, It is called like this for all values in the array, one after another.
  - Filter - Filters an array with a condition, the condition here is a function that gets each item of the array, and it should decide whether to keep the item or not and return the truthy value for that.
  - Map - Maps each item of array to a function and creates a new array bbased on the return values of the function calls.
  - Concat -Adds new items to an existing array to create a new array, it's different from push() in the sense that push() mitaites data, which makes it impure.

- Linting and formatting tools
    - Herramienta de desarrollo
    - ayuda a evitar malas practicas
    - 
  - CSSLint
  - ESLint
  - JSHint
  - JSLint
