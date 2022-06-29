


# Chapter 001: The power of the reactive paradigm

- Reactive patterns are reusable solutions to a commonly ocurring problem using reactive programming.

## Exploring the pillars of reactive programming
- By definition, reactive programming is programming with asynchronous data streams and is based on observer patterns.

### Data Sreams
- Data streams is everything that might change or happen over time and it's represented as a stream, such as data, events, notifications, and messages.
- Reactive programming is about reaction to changes as soon as they are emmited.
- An example of data streams is UI events. In order to react, let's say that an event click, we register an **EventListener** event. Then every time a click occurs, the callback method is called to execute a side effect.

### Observer patterns
- The observer pattern is based on two main roles: a **publisher** and a **subscriber**.
- A publisher maintains a list of subscribers and notifies them or progates a change every time there is an update.
- A subscriber peromos an update or executes a side effect every time they receive a notification from the publisher. To get notifier about any updates, you need to subscribe to the publisher.
- This leads us to the building blocks of RxJS, They include  the following:
    - **Observables**: these are representation o f the data streams that notifiy the observers of any change.
    - **Observers**: these are the consumers of the data streams emitted by observables.
- RxJS combines the observer pattern with the iterator pattern and functional programming to process and handle asynchronous events.
- In general, whenever you have to handle asynchronous tasks in your Angular app, always think RxJS.
    - RxJS makes dealing with event-based programs, asynchronous data calls, and callbacks an easy task.
    - Observables guarantee consistency. They emit multiple values over time so that you can consume continuous data streams.
    - OBservables are lazy: they are not executed until you subscribe to them.  Hepls writing declarative code that is clean, efficient, and easy to understand and maintain.
    - Observables can be canceled, completed, and retrieved at any moment.
    - RxJS provides many operators with a functional style to manipulate collections and optimize side effects.
    - Observables push errors to the subscribers and provide a clean way to handle errors.
    - RxJs allos you to write clean and efficient code to handle asynchronous data in your application.

## Using RxJS in Angular and is advantages
- RxJS is part of the Angular ecosystem and is used in may features to handle async operations.
    - **HTTP Client module**
    - **Router module**
    - **Reactive forms**
    - **Event emitter**
    - **Async pipe**

### The HTTP Client modle
- The **HttpClient** service is based on observables to manage all transactions. All result of calling the API Methods tirns into an observable.
- Let's list some of the advantages:
    - Observables are cancellable, so you can cancel the HTTP request whenever you want by calling the unsubscribe method.
    - You can retry HTTP request when an error occurs or an exception is thrown.
    - The server's response cannot be mutated by observables, although this can be the case when chaining `then()` to promises.

### The Router module
- This module uses observables in router events and activated routes.

#### Router events
- The Router exposes events as observables. The router events allow you to intercept the nativation life cycle, here are some router events: 
    - `NavigationStart`, `RouteConfigLoadStart`, `RouteConfigLoadEnd`, `RoutesRecognized`, `GuardsCheckStart`, `ChildActionStart`, `ActivationStart`, `GuardsCheckEnd`, `ResolveStart`, `ResolveEnd`, `ActivationEnd`, `ChildActivationEnd`, `NavigationEnd`, `NavigationCancel`, `NavigationError`, `Scroll`
- To intercept all the events that the router goes through, first, you should inject the Router service, which provides navigation and URL manipulation capabilites
- Then, subscribe to the events observable available in the Router Object, and filter the events of the RouterEvent type using the RxJS filter operator.
```javascript
    this.router.events
        .pipe(filter(event => event instanceof RouterEvent))
        .subscribe((event:RouterEvent) => console.log(`${event.id} | ${event.url}`))
```
#### The activated route
- It's a router service thay you can inject into your components to retrieve information about a route's path and parameters.
- And many properties of this service are based on observables. let's highlight the ones that are observables:
    - **url**: Holds the URL, of the active route.
    - **params**: Holds the parameters of the active route.
    - **queryParams**: Holds the query parameters shared by all of the routes.
    - **fragment**: Holds the URL gragment shared by all the routes.
    - **data**: Holds the static and resolved data of the active route.
    - **paramMap**: Holds a map of the requred paramters and the optional parameters of the active route.
    - **queryParamMap**: Holds a map of the query parameters available to all the routes.
- All these parameters might change over time and it makes perfect sense to listen to those changes to register side effects or update the list of parameters.

### Reactive forms
- Available under the **@angular/forms** pacakge are based on observables to trach form control changes.
- GENERAL NOTE!!: On Typescript when declaring a variable and setting it's type/interface adding `!:` is called **Non-null assertion operator** and it tells the compiler that that variable is not a null.

#### The event emitter
- It's part of the **@angular/core** package, is used to emit data from a child component to a parent component through the `@Output()` decorator.
- The **EventEmitter** class extends the RxJS Subject and registers handlers for events emitted.

#### The async pipe
- This pipe automatically subscribes to an observable when used in a component's template and emits the latest value each time.
- This avoid subscribing logic in the component and helps with binding and updating your async streams data in the template.


## Learning about the marble diagram 
- When it comes to explaining operators, it is better to refer to a visual representation. That are the marble diagrams.
- Marble diagrams are a visual representation of the operator's execution. So, every diagram will include the following: 
    - **Input Observable(s)**: This represents one or monay observables given as input to the operator
    - **Operator**: This represents the operator to the executed wit its parameters
    - **Output Observables**: This represents the observable producer after the operator's execution.
- let's zoom in on the representation of the input/output observalbles:
    - **The timeline**: Time is represented as an arrow flowing from left to right.
    - **The marble values**: These are the values emitted by the observables over time.
    - **The completion status**: The vertical line represents the successful completion.
    - **The error status**: An X represents an error emitted by the observable.
 
 
 
 
# Chapter 001: The power of the reactive paradigm 
- Reactive patterns are reusable solutions to a commonly occurring problem using reactive programming. 

## Exploring the pillars of reactive programming 
- By definition, reactive programming is programming with asynchronous data streams and is based on observer patterns. 

### Data Streams 
- Data streams is everything that might change or happen over time and it's represented as a stream, such as data, events, notifications, and messages. 
- Reactive programming is about reaction to changes as soon as they are emitted. 
- An example of data streams is UI events. In order to react, let's say that an event click, we register an **EventListener** event. Then every time a click occurs, the callback method is called to execute a side effect. 

### Observer patterns 
- The observer pattern is based on two main roles: a **publisher** and a **subscriber**. 
- A publisher maintains a list of subscribers and notifies them or propagates a change every time there is an update. 
- A subscriber performs an update or executes a side effect every time they receive a notification from the publisher. To get notified about any updates, you need to subscribe to the publisher. 
- This leads us to the building blocks of RxJS, they include the following: 
    - **Observables**: these are representations of the data streams that notify the observers of any change. 
    - **Observers**: these are the consumers of the data streams emitted by observables. 
- RxJS combines the observer pattern with the iterator pattern and functional programming to process and handle asynchronous events. 
- In general, whenever you have to handle asynchronous tasks in your Angular app, always think RxJS. 
    - RxJS makes dealing with event-based programs, asynchronous data calls, and callbacks an easy task. 
    - Observables guarantee consistency. They emit multiple values over time so that you can consume continuous data streams. 
    - Observables are lazy: they are not executed until you subscribe to them.  Helps writing declarative code that is clean, efficient, and easy to understand and maintain. 
    - Observables can be canceled, completed, and retrieved at any moment. 
    - RxJS provides many operators with a functional style to manipulate collections and optimize side effects. 
    - Observables push errors to the subscribers and provide a clean way to handle errors. 
    - RxJs allows you to write clean and efficient code to handle asynchronous data in your application. 

## Using RxJS in Angular and its advantages 
- RxJS is part of the Angular ecosystem and is used in many features to handle async operations. 
    - **HTTP Client module** 
    - **Router module** 
    - **Reactive forms** 
    - **Event emitter** 
    - **Async pipe** 

### The HTTP Client module 
- The **HttpClient** service is based on observables to manage all transactions. All results of calling the API Methods turns into an observable. 
- Let's list some of the advantages: 
    - Observables are cancellable, so you can cancel the HTTP request whenever you want by calling the unsubscribe method. 
    - You can retry HTTP request when an error occurs or an exception is thrown. 
    - The server's response cannot be mutated by observables, although this can be the case when chaining `then()` to promises. 

### The Router module 
- This module uses observables in router events and activated routes. 

#### Router events 
- The Router exposes events as observables. The router events allow you to intercept the navigation life cycle, here are some router events:  
    - `NavigationStart`, `RouteConfigLoadStart`, `RouteConfigLoadEnd`, `RoutesRecognized`, `GuardsCheckStart`, `ChildActionStart`, `ActivationStart`, `GuardsCheckEnd`, `ResolveStart`, `ResolveEnd`, `ActivationEnd`, `ChildActivationEnd`, `NavigationEnd`, `NavigationCancel`, `NavigationError`, `Scroll` 
- To intercept all the events that the router goes through, first, you should inject the Router service, which provides navigation and URL manipulation capabilities 
- Then, subscribe to the events observable available in the Router Object, and filter the events of the RouterEvent type using the RxJS filter operator. 
    ```javascript 
        this.router.events 
            .pipe(filter(event => event instanceof RouterEvent)) 
            .subscribe((event: RouterEvent) => console.log(`${event.id} | ${event.url}`)) 
    ``` 

#### The activated route 
- It's a router service that you can inject into your components to retrieve information about a route's path and parameters. 
- And many properties of this service are based on observables. let's highlight the ones that are observables: 
    - **url**: Holds the URL, of the active route. 
    - **params**: Holds the parameters of the active route. 
    - **queryParams**: Holds the query parameters shared by all of the routes. 
    - **fragment**: Holds the URL fragment shared by all the routes. 
    - **data**: Holds the static and resolved data of the active route. 
    - **paramMap**: Holds a map of the required parameters and the optional parameters of the active route. 
    - **queryParamMap**: Holds a map of the query parameters available to all the routes. 
- All these parameters might change over time and it makes perfect sense to listen to those changes to register side effects or update the list of parameters. 

### Reactive forms 
- Available under the **@angular/forms** package are based on observables to trach form control changes. 
- GENERAL NOTE!!: On Typescript when declaring a variable and setting its type/interface adding `!:` is called **Non-null assertion operator** and it tells the compiler that that variable is not a null. 

#### The event emitter 
- It's part of the **@angular/core** package, is used to emit data from a child component to a parent component through the `@Output()` decorator. 
- The **EventEmitter** class extends the RxJS Subject and registers handlers for events emitted. 

#### The async pipe 
- This pipe automatically subscribes to an observable when used in a component's template and emits the latest value each time. 
- This avoids subscribing logic in the component and helps with binding and updating your async streams data in the template. 

## Learning about the marble diagram  
- When it comes to explaining operators, it is better to refer to a visual representation. That are the marble diagrams. 
- Marble diagrams are a visual representation of the operator's execution. So, every diagram will include the following:  
    - **Input Observable(s)**: This represents one or many observables given as input to the operator 
    - **Operator**: This represents the operator to the executed with its parameters 
    - **Output Observables**: This represents the observable producer after the operator's execution. 
- Let's zoom in on the representation of the input/output observables: 
    - **The timeline**: Time is represented as an arrow flowing from left to right. 
    - **The marble values**: These are the values emitted by the observables over time. 
    - **The completion status**: The vertical line represents the successful completion. 
    - **The error status**: An X represents an error emitted by the observable. 
