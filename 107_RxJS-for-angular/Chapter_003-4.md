 
 # Reactive patterns with RxJS for Angular

- [Chapter 001](Chapter_001.md) - The power of the reactive paradigm
- [Chapter 002](Chapter_002.md) - RxJS 7 - The Major Features
- [Chapter 003](Chapter_003-4.md) -  A walkthrough of the application 
- [Chapter 004](Chapter_003-4.md) - Fetching Data as Streams 
- [Chapter 005](Chapter_005.md) - Error Handling 
- [Chapter 006](Chapter_006-7.md) - Combining Streams
- [Chapter 007](Chapter_006-7.md) - Transforming Streams
- [Chapter 008](Chapter_008.md) - Multicasting Essentials
- [Chapter 009](Chapter_009.md) - Caching Streams
- [Chapter 010](Chapter_010-11.md) - Sharing Data between Components
- [Chapter 011](Chapter_010-11.md) - Bulk Operations
- [Chapter 012](Chapter_012.md) - Processing Real-Time Updates
- [Chapter 013](Chapter_013.md) - Testing RxJS Observables
 
 # Chapter 003: A walkthrough of the application 
- This chapter contained an explanation of what the Angular Application consists of. 

# Chapter 004: Fetching Data as Streams 
- Today, Great user experience and performant UIs are no longer an option. In fact, they are key determinants of user satisfaction. Besides, managing data efficiently optimizes the code and enhances its quality, which consequently minimizes maintenance and improvement costs. 

## Exploring the classic pattern for fetching data 
1. Defining the structure of your data. 
2. Create an Angular Service. 
3. Retrieving the data through a method. 
4. Injecting and subscribing to the service in your component. 
5. Displaying the data in the template. 
6. Managing Un-subscription. 

## Ways to handle unsubscription  
- **Imperative unsubscription management**, means that we manually call the unsubscribe() method on the subscription object that we manage ourselves. 
- **Declarative unsubscription management**, it's more declarative and cleaner; it uses the RxJS `takeUntil` operator. 
- The `takeUntil()` operator takes values from the source Observable until the Observable notifier passed on by parameter emits a value. 
- Additionally, you can use other operators that manage the unsubscription for you in a more reactive way: 
    - `take(x)`: This emits x values and then completes, However, bear in mind that if your network is slow and the x-th emission didn'0t happen, then you have to unsubscribe. 
    - `first()`: This emits the first value and then completes. 
    - `last()`: This emits the last value and then completes. 

## Exploring the reactive pattern for fetching data 
1. Retrieving data as streams. 
2. Defining the stream in your component 
3. Using the async pipe in your template 

## The power of the async pipe 
- async pipe automatically subscribes to the input observable. Then, it returns the latest value emitted. 
- And best of all, when the component has been destroyed it automatically unsubscribes to avoid any potential memory leak. 

## Highlighting the advantages of the reactive pattern 
#### Using the declarative approach 
- What's wrong with `subscribe()`? Subscribing to a stream inside our component means we are allowing imperative code to leak into our functional and reactive code. 
- `Declarative` refers to the use of declared functions to perform actions, you rely upon pure functions that can define an event flow. With RxJS, you can see this in the form of observables and operators. 
- A `Pure function` is a function that will always return identical outputs for identical inputs, no matter how many times it is called. In other words, the function will always predictably produce the same output. 
- Declarative approach using RxJS operators and observables has many advantages, namely, the following: 
    - It makes your code cleaner and more readable. 
    - It makes your code easier to test because it is predictable. 
    - It makes you able to cache the stream output given a certain input, and this will enhance performance. 
    - It enables you to leverage RxJS operators and transform and combine streams coming from different services or even within the same service. 
    - It helps you react easily to user interactions in order to execute an action. 
    - It improves the performance of your application. 
    - It improves the change detection strategy. 
    - It makes the code more declarative and more reactive. 
    - It makes it easier to react to user actions. 
- In some cases, calling the `subscribe()` method is unavoidable to trigger the Observable notifier. Just ask yourself "*Do I really need to subscribe here? *" 

## Using the change detection strategy of OnPush 
- Other thing that we can use is the **changeDetection** strategy, **OnPush**. 
- This feature is about detecting when the component's data changes and then automatically re-rendering the view or updating the DOM to reflect that change. 
- The default strategy of "check always" means that, whenever any data is mutated or changed, Angular will run the change detector to update the DOM, Si, it is automatic until explicitly deactivated. 
- In the OnPush strategy, Angular will only run the change detector when the following occurs: 
    - **Condition 1**: A component's `@Input` property reference changes (If the input property object is mutated directly then the reference of the object will not change and consequently the change detector will not run. In this case we should return a new reference of the property object to trigger the change detection). 
    - **Condition 2**: A component event handler is emitted or gets triggered. 
    - **Condition 3**: A bound observable via the async pipe emits a new value. 
- Therefor using the OnPush strategy minimizes any change detection cycles and will only check for changes to re-render our components in the preceding cases. 
- This strategy applies to all child directives and cannot be overridden. 
    ```javascript 
        @Component({ 
            selector:'app-main', 
            /** BLA BLA BLA **/ 
            changeDetection: ChangeDetectionStrategy.OnPust 
        }) 
    ``` 
- This strategy plus using the async pipe as much as possible will give the following advantages: 
    - We will make it easier to switch from the default change detection strategy to OnPush later if we need to. 
    - We will run into fewer change detection cycles using OnPush. 

 
 

 