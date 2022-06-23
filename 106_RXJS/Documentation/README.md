## RxJS Notes
- [Summary](README.md) 
    - [Observable](README.md#observable) 
    - [RxJS Operators](README.md#rxjs-operators) 
- [Operators](Operators_001.md) 
    - [Categories of Operators](Operators_001.md#categories-of-operators) 
    - [Creation Operators](Operators_001.md#creation-operators) 
    - [Join Creation Operators](Operators_002.md#join-creation-operators) 
    - [Transformation Operators](Operators_003.md#transformation-operators) 
    - [Filtering Operators](Operators_004.md#filtering-operators) 
    - [Join Operators](Operators_005.md#join-operators) 
    - [Multicasting Operators](Operators_005.md#multicasting-operators) 
    - [Error Handling Operators](Operators_005.md#error-handling-operators) 
    - [Utility Operators](Operators_006.md#utility-operators) 
    - [Conditional and Boolean Operators](Operators_006.md#conditional-and-boolean-operators) 
    - [Mathematical and Aggregate Operators](Operators_006.md#mathematical-and-aggregate-operators) 
- [Subscriptions](subscriptions_and_subjets.md#subscription) 
- [Subjets](subscriptions_and_subjets.md#subjects) 
- [Schedulers](subscriptions_and_subjets.md#schedulers) 

# RXJS Documentations 
- RXJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite type (Observer, Schedulers, Subjects) and operators inspired by Array Methods (map, filter, reduce, every) to allow handling asynchronous events as collections. 
- ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events. 
- The essential concepts in RXJS which solve async event management are: 
    - **Observable**: represents the idea of an invokable collection of future values or events. 
    - **Observer**: is a collection of callbacks that know how to listen to values delivered by the Observable. 
    - **Subscription**: represents the execution of an Observable, is primarily useful for cancelling the execution. 
    - **Operators**: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc. 
    - **Subject**: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers. 
    - **Schedulers**: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on ex. setTimeout or requestAnimationFrame or others. 

## Purity & Flow
- What makes RXJS powerful is its ability to produce values using pure functions. That means your code is less prone to errors. 
- RxJS has a whole range of operators that help you control how the events flow through your observables. 
- Other flow control operators are filter, delay, debounceTime, take, takeUntil, distinct, distinctUntilChanged, etc. 

## Values  
- You can transform the values passed through your observables 
- Other value producing operators are pluck, pairwise, sample etc. 

# Observable 
- Observables are lazy Push Collections of multiple values. They Fill the missing spot in the following table: 
    |       | SINGLE    | MULTIPLE        | 
    | ----- | --------- | --------------- | 
    | Pull  | Function  | Iterator        | 
    | Push  | Promise   | **Observable**  | 
- To invoke the Observable and see their values, we need to subscribe to it 
     ```javascript
        import { Observable } from 'rxjs'; 
        const observable$ = new Observable(subscriber => { 
            subscriber.next("A value"); 
            subscriber.complete(); 
        }) 
        observable$.subscribe( 
            next(x) { /** Handle new value**/}, 
            error(err) { /** Handle error **/}, 
            complete() { /** Handle complition **/}, 
        ) 
     ``` 

## Pull vs. Push 
- Are two different protocols that describe how a data producer can communicate with a data Consumer. 
- **What is Pull? ** In Pull systems, the Consumer determines when it receives data from the data Producer. The Producer itself is unaware of when the data will be delivered to the Consumer. 
- Every JS Function is a Pull system, The function is a Producer of data, and the code that calls the function is consuming it by "pulling" out a single return value from its call. 
- Es2015 introduced generator functions and iterators. Another type of Pull systems. Code that calls iterator.next() is the Consumer, "pulling" out multiple values from the iterator (The producer). 
    |       | Producer    | Consumer        | 
    | ----- | ----------- | --------------- | 
    | Pull  | Passive: produces data when requested. | Active: decides when data is requested. | 
    | Push  | Active: Produces data at its own pace. | Passive: reacts to received data. | 
- What is Push? In Push systems, the Producer determines when to send data to the Consumer. The Consumer is unaware of when it will receive that data. 
- RXJS introduces Observables, a new Push system for JS. An Observable is a Producer of multiple values, "pushing" them to Observers (Consumers). 
    - A Function is a lazily evaluated computation that synchronously returns a single value on invocation. 
    - A generator is a lazily evaluated computation that synchronously returns zero to infinite values on iteration. 
    - A promise is a computation that may (or may not) eventually return a single value. 
    - An Observable is a lazy evaluated computation that can synchronously or asynchronously return zero to infinite values from the time it's invoked onwards. 

## Anatomy of an Observable 
- Observables are created using `new Observable` or a creation operation, are subscribed to with an Observer, execute to deliver notifications to the Observer and their execution may be disposed (next, error, complete). 
- Core Observable concerns:  
    - Creating Observables 
    - Subscribing to Observables 
    - Executing the Observable 
    - Disposing Observables 

### Creating Observables 
- The Observable constructor takes one argument: the subscribe button. 
- Observable can be created with new Observable or Most commonly, observables are created using creation functions like of, from, interval, etc. 

### Subscribing to Observables 
- Subscription is like `Observable$.subscribe(x => console.log(x)) `. 
- **Important** a Subscribe call starts an "Observable execution" and delivers values or events to an Observer of that execution. 
- Each call to `Observable$.subscribe` triggers its own independent setup for that given subscriber. 
- It's like calling a function, providing callbacks where the data will be delivered to. 

### Executing Observables 
- There are three types of values an Observable Execution can deliver:  
    - **Next notification**: sends a value such as a Number, a String, an Object, etc. 
    - **Error notification**: sends a JS Error or Exception. 
    - **Complete notification**: does not send a value. 
- If either an Error or Complete notification is delivered, then nothing else can be delivered afterwards. 

### Disposing Observable Executions 
- It's common for an Observer to want to abort execution in finite time, we need an API for canceling an execution. In order to avoid wasting computation power or memory resources. 
- When you subscribe, you get back a Subscription, which represents the ongoing execution, containing a method called unsubscribe() to cancel the execution. 

## Observer 
- An Observer is a consumer of values delivered by an Observable. Observers are simply a set of callbacks, one for each type of notification delivered by the Observable: next, error, and complete.  

# RxJS Operators 
- They are the essential pieces that allow complex asynchronous code to be easily composed in a declarative manner. 

## Piping 
- Pipeable operators are functions, so they could be used like ordinary functions: `operator(observable$) `, but they tend to be many of them convolved together and quickly become unreadable.  
- For that reason, Observable has a method called `.pipe()` that accomplishes the same thing while being easier to read `observable$.pipe(operator001(), operator002())`. 

## High-order Observables 
- Observables Commonly emits primitive values but sometimes it is necessary to handle Observables of Observables, so called higher-order Observables. 
- How do you work with a High order Observable? (By flattening) converting a higher order Observable into an ordinary Observable. 
    - `concatAll()` operator subscribes to each inner Observable that comes out of the outer Observable , and copies all the emitted values until those observables completes, and goes on the next one. All of the values are in that way concatenated. 
    - Other useful flattening operator (called join Operators): 
        - `mergeAll()` - subscribe to each inner observable as it arrives, then emits each value as it arrives 
        - `switchAll()` - subscribe to the first inner Observable when it arrives, and emits each value as it arrives, but when the next inner observable arrives, unsubscribes to the previous one, and subscribes to the next one. 
        - `exhautAll()`subscribes to the first inner Observable when it arrives, and emits each value as it arrives, discarding all newly arriving inner Observables until that first one completes then waits for the next inner Observable. 
- Just as many array libraries combine `map()` and `flat()` or (`flatten()`) into a single `flatMap()`, there are mapping equivalents of all the RXJS flattening operators `concatMap()`, `mergeMap()`, `switchMap()` and `exhaustMap()`. 

## Kind of Operators 
- Operators are functions. There are two kinds of operators: Pipeable Operators and Creation Operators. 
- Pipeable Operators are the kind that can be piped to Observables using the syntax `observable$.pipe(operator())`. 
    - They do not change the existing Observable instance. Instead, they return a new Observable, whose subscription logic is based on the first Observable. 
    - It is a function that takes an Observable as its input and returns another Observable. It is a pure operation: the previous Observable stays unmodified. 
- Creation Operators can be called as a standalone function to create a new Observable. 
    - They are functions that can be used to create an Observable with some common predefined behavior or by joining other Observables. 

 
 

 