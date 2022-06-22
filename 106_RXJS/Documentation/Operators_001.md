## RxJS Notes
- [Chapter 001](Documentation/README.md) - RxJS Documents
    - [Summary](Documentation/README.md) 
        - [Observable](Documentation/README.md#observable) 
        - [RxJS Operators](Documentation/README.md#rxjs-operators) 
    - [Operators](Documentation/Operators_001.md) 
        - [Categories of Operators](Documentation/Operators_001.md#categories-of-operators) 
        - [Creation Operators](Documentation/Operators_001.md#creation-operators) 
        - [Join Creation Operators](Documentation/Operators_002.md#join-creation-operators) 
        - [Transformation Operators](Documentation/Operators_003.md#transformation-operators) 
        - [Filtering Operators](Documentation/Operators_004.md#filtering-operators) 
        - [Join Operators](Documentation/Operators_005.md#join-operators) 
        - [Multicasting Operators](Documentation/Operators_005.md#multicasting-operators) 
        - [Error Handling Operators](Documentation/Operators_005.md#error-handling-operators) 
        - [Utility Operators](Documentation/Operators_006.md#utility-operators) 
        - [Conditional and Boolean Operators](Documentation/Operators_006.md#conditional-and-boolean-operators) 
        - [Mathematical and Aggregate Operators](Documentation/Operators_006.md#mathematical-and-aggregate-operators) 
    - [Subscriptions](Documentation/subscriptions_and_subjets.md#subscription) 
    - [Subjets](Documentation/subscriptions_and_subjets.md#subjects) 
    - [Schedulers](Documentation/subscriptions_and_subjets.md#schedulers) 
# Categories of Operators 
- There are operators for different purposes, and they may be categorized as: creation, transformation, filtering, joining, multicasting, error handling, utility, conditional/Boolean and Mathematical/Aggregate Operators. 

## Creation Operators 
- `ajax`: creates an observable for an AJAX(JSON) request with either a request object with url, headers, etc. or a single string for a URL. 
- `defer`: creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer.  
    - Accepts a single parameter that it is an Observable factory. 
- `from`: creates an Observable from an Array, an array-like object, a Promise, an iterable object or an Observable-like object. 
- `fromEvent`: creates an Observable that emits events of a specific type coming from the given event target. ex Dom events, or Node.js EventEmitter events or others. 
    - Accepts as first argument event target, which is an object with method for registering event handler functions. 
    - As a second argument it takes string that indicates type of even, we want to listen for. 
    - if your even target does not match any of the ones listed, you should use fromEventPattern. 
    - If event target calls registered function with more than one argument, second and following arguments will not appear in resulting stream. 
    - In order to get access to them you can pass to fromEvent optional project function. 
    - If the API you use is more callback, then event handler oriented, you should use bindCallback or bindNodeCallback instead. 
    - **DOM EvenTarget**: an object with addEvenListener and removeEventListener methods. 
    - **Node.js EventEmitter**: an object with addListener and removeListener methods 
    - **JQuery-style even target**: an object with on and off method 
    - **DOM NodeList or DOM HtmlCollection**: List of DOM Nodes that fromEvent will iterate over all Nodes it contains and install event handler function in every of them. 
- `fromEventPattern`: Creates an Observable from an arbitrary API for registering event handlers. 
    - When that method for adding event handler was something `fromEvent` was not prepared for. 
    - Accepts as a first argument an addHandler function, which will be injected with handler parameter 
    - If API Allows to unregister event handlers, you can pass a removeHandler function as second parameter, which now you can use to unregister it from the API. 
- `generate`: allows you to create a stream of values generated with a loop very similar to a traditional for ...loop. 
    - `initialStateOrOptions`: it's the beginning value. 
    - `GenerateOptions`: it's a function that accepts this value and tests if some condition still holds, if it does, then the loop continues, if not, it stops. 
    - `Iterate`: it's also a function which takes the previously defined value and modifies it some way on each iteration. 
    - `resultSelectorOrScheduler`: it's a function which allows you to immediately map the value that would normally be emitted by an Observable. 
    - OOOORRRR you can pass all these parameters as an object:  
        ```javascript 
            generate({ 
                initialState: 0, 
                condition(value) { return value < 3; }, 
                iterate(value) { return value + 1; }, 
                resultSelector(value) { return value * 1000; } 
            }); 
        ``` 
- `interval`: creates an Observable that emits an infinite sequential number every specified interval of time on a specific SchedulerLike. 
- `of`: An Observable that emits the arguments described above and then completes. Each argument becomes a next notification.     - Unlike `from`, it does not do any flattening and emits each argument in whole as a separate next notification. 
- `range`: creates an Observable that emits a sequence of numbers within a specified range. Where you select the start of the range and its length. 
- `throwError`: creates an observable that will create an error instance and push it to the consumer as an error immediately upon subscription. "Just errors and does nothing else". 
    - Unnecessary usage: using this operator inside of another operator or creation function with a callback is usually not necessary. 
    - Instead throw the error as `throw new Error ('ERROR: Sabre blue Invalid something')` 
- `timer`: creates an observable that will wait for a specified time period, or exact date, before emitting the number 0. 
- `iif`: checks a Boolean at subscription time, and chooses between one or two observable sources. 
    - `Condition`: contains a condition function  
    - `trueStatement` and `falseStatement`: depending on the result of the parameter Condition one of these will be returned.
    - If you need to check more than two options to choose between more than one observable, have a look at the defer creation method. 
- Depreacted: `empty`,  
- Others less used: `bindCallback`, `bindNodeCallback` 
