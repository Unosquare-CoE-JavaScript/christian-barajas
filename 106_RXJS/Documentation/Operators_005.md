
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
    - [Schedulers](subscriptions_and_subjets.md#schedulers) s

# Categories of Operators 
- There are operators for different purposes, and they may be categorized as: creation, transformation, filtering, joining, multicasting, error handling, utility, conditional/Boolean and Mathematical/Aggregate Operators. 

## Join Operators 
- `combineLatestAll`: Flattens an Observable-of-Observables by applying combineLatest when the Observable-of-Observables completes. 
    - Every time an inner Observable emits, the output Observable emits. 
    - When the returned observable emits it emits all of the latest values by: 
        - If a project function is provided, it is called with each recent value from each inner Observable in whatever order they arrived, and the result of the project function is what is emitted by the output Observable. 
        - If there is no project function, an array of all the most recent values is emitted by the output Observable. 
- `concatAll`: converts a higher-order Observable into a first-order Observable by concatenating the inner Observables in order.  
    - Flattens an Observable-of-Observables by putting one inner Observable after the other. 
    - If the source Observable emits Observables quickly and endlessly, and the inner Observables it emits generally complete slower that the source emits, you can run into memory issues as the incoming Observables collect in an unbounded buffer. 
    - `contactAll` is equivalent to `mergeAll` with currency parameter set to 1. 
- `exhaustAll`: Converts a higher-order Observable into a first-order Observable by dropping inner Observables while the previous inner Observable has not yet been completed. 
    - Flattens an Observable-of-Observables by dropping the next inner Observables while the current inner is still executing. 
    - It behaves like `mergeAll`. However, `exhaustAll` ignores every new inner Observable if the previous Observable has not yet completed. Once that one completes, it will accept and flatten the next inner Observable and repeat this process. 
- `mergeAll`: Converts a higher-order Observable into a first-Order Observable which concurrently delivers all values that are emitted on the inner Observables. 
    - Flattens an Observable-of-Observables. 
    - Any error delivered by an inner Observable will be immediately emitted on the output Observable. 
- `switchAll`: Converts a higher-order Observable into a first-order Observable producing values only from the most recent observable sequence. 
    - Flattens an Observable-of-Observables. 
    - It subscribes to the most recently provided "inner observable" emitted by the source, unsubscribing from any previously subscribed to inner observable, such that only the most recent inner observable may be subscribed to at any point in time. 
- `startWith`: First emits its arguments in order, and then any emissions from the source. 
- `withLatestFrom`: Combines the source Observable with other Observables to create an Observable whose values are calculated from the latest values of each, only when the source emits. 
    - Whenever the source Observable emits a value, it computes a formula using that value plus the latest values from other input Observables, then emits the output of that formula. 
- Deprecated: `startWith` 

## Multicasting Operators 
- `share`: Returns a new Observable that multicast (shares) the original Observable. As long as there is at least one Subscriber this Observable will be subscribed and emitting data,  
    - When all subscribers have unsubscribed, it will unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream hot. This is an alias for `multicast(()=>new Subject())`, `refCount()` 
- Deprecated: `multicast`, `publish`, `publishBehavior`, `publishLast`, `publishReplay`,  

## Error Handling Operators 
- `catchError`: Catches errors on the observable to be handled by returning a new observable or throwing an error. 
    - It only listens to the error channel and ignores notifications. Handles errors from the source observable, and maps them to a new observable. The error may also be rethrown, or a new error can be thrown to emit an error from the result. 
- `retry`: Returns an Observable that mirrors the source Observable with exception of an error. 
    - If the source Observable calls error, this method will resubscribe to the source Observable for a maximum of count resubscriptions rather than propagating the error call. 
- `retryWhen`: Returns an Observable that mirrors the source Observable with the exception of an error.  
    - Retry an observable sequence on error based on custom criteria. 
    - If the source Observable calls error, this method will emit the Throwable that caused the error to the Observable returned from notifier.  
    - If those Observables calls complete or error then this method will call complete or error on the child subscription. Otherwise, this method will resubscribe to the source Observable. 
