
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

## Transformation Operators 
- `buffer`: Buffers the source Observable values until `closingNotifier` emits. 
    - Collects values from the past as an array, and emits that array only when another Observable emits. 
- `bufferCount`: Buffers the source Observable values until the size hits the maximum bufferSize given. 
    - Collects values from the past as an array, and emits that array only when its size reaches bufferSize. 
    - `bufferSize` - First parameter, the maximum size of the buffer emitted. 
    - `startBufferEvery` - Second Parameter, optional, default is null. Interval at which to start a new buffer. 
- `bufferTime`: Buffers the source Observable values for a specific time period. 
    - Collects values from the past as an array and emits those arrays periodically in time. 
    - `bufferTimeSpan`: First parameter, the amount of time to fill each buffer array. 
    - `bufferCreationInterval`: Second parameter, optional, it emits and resets the buffer every bufferTimeSpan ms, if parameter is given, this operator opens the buffer every bufferCreationInterval ms and closes the buffer every bufferTimeSpan. 
- `bufferToggle`: Buffers the source Observable values starting from an emission from openings and ending when the output of a clossingSelector emits. 
    - Collects values from the past as an array, starts collection only when opening emits, and calls the closingSelector function to get an Obervable that tells when to close the buffer. 
- `bufferWhen`: Buffers the source Observable values using a factory function of closing Observables to determine when to close, emit and reset the buffer. 
    - Collects values from the past as an array. When it starts collecting values, it calls a function that returns an Observable that tells when to close the buffer and restart collecting. 
    - `clossingSelector`: single parameter, function that takes no arguments and returns an Observable that signals buffer closure. 
- `concatMap`: Projects each source value to an Observable which is merged in the output Observable, in a serialized fashion waiting for each one to complete before merging with the next. 
    - Maps each value to an Observable, then flattens all of these inner Observables. 
    - If source values arrive endlessly and faster than their corresponding inner Observables can complete, it will result in memory issues. 
    - `concatMap` is equivalent to `mergeMap` with concurrency parameter set to 1. 
- `exhaustMap`: Projects each source value to an Observable which is merged in the output Observable only if the previous projected Observable has completed. 
    - Maps each value to an Observable, then flattens all of these inner Observables using exhaust. 
    - It's useful when your system can produce multiple actions that trigger a long-lasting task, like a login, and all other similar actions should be ignored until the current task is completed. 
- `expand`: Recursively projects each source value to an Observable which is merged in the output Observable. 
    - It's similar to `mergeMap`, but applies the projection function to every source value as well as every output value, it's recursive. 
- `groupBy`: Groups the items emitted by an Observable according to a specified criterion, and emits these grouped item as `GroupedObservables`. 
- `map`: Applies a given Project function to each value emitted by the source Observable and emits the resulting values as an Observable. 
    - Like `Array.protoptype.map()`, it passes each source value through a transformation function to get corresponding output values. 
- `mergeMap`: Projects each source value to an Observable which is merged in the output Observable. 
    - Maps each value to an Observable, then flattens all of these inner Observables using `mergeAll`. 
- `mergeScan`: Applies an accumulator function over the source Observable where the acumulator function itself returns an Observable; each intermediate Observable returned is merged into the Output Observable. 
    - It's like scan, but the Observables returned by the accumulator are merged into the outer Observable. 
    - `accumulator`: function which is being called every time the source Observable emits a value. 
    - `seed`: the initial accumulation value. 
    - `concurrent`: defaults is infinity. 
- `pairwise`: Groups pairs of consecutive emissions together and emits them as an array of two values. 
    - Puts the current value and previous value together as an array, and emits that. 
- `scan`: Useful for encapsulating and managing state, Applies and accumulator (or "reducer function") to each value from the source after an initial state is established either via a seed value or from the first value from the source. 
    - It's like reduce but emits the current accumulation state after each update. 
    - `accumulator`: A "reducer function". This will be called for each value after an initial state is adquired. 
    - seed: Optional, Default is undefined. The initial value. 
- `switchScan`: Applies an accumulator function over the source Observable where the accumulator function itself returns an Observable, emitting values only from the most recently returned Observable. 
    - It's like `mergeScan`, but only the most recent Observable returned by the accumulator is merged into the outer Observable. 
- `switchMap`: Project each source value to an Observable which is merged in the output Observable emitting values only from the most recently projected Observable. 
    - Maps each value to an Observable, then Flattens all of these inner Observables. 
    - It subscribes and produces values only from the most recent inner sequence ignoring previous streams. 
- `window`: Branch out the source Observable values as a nested Observable whenever windowBoundaries emits. 
    - It's like `buffer`, but emits a nested Observable instead of an array. 
- `windowCount`: Branch out the source Observable values as a nested Observable with each nested Observable emitting at most windowSize values. 
    - It's like `bufferCount`, but emits a nested Observable instead of an array. 
- `windowTime`: Branch out the source Observable values as a nested Observable periodically in time. 
    - It's like `bufferTime`, but emits a nested Observable instead of an array. 
- `windowToggle`: Branch out the source Observable values as a nested Observable starting from an emission from openings and ending when the output of `closingSelector` emits. 
    - It's like `bufferToggle`, but emits a nested Observable instead of an array. 
- `windowWhen`: Branch out the source Observable values as a nested Observable using a factory function of closing Observables to determine when to start a new window. 
    - It's like `bufferWhen`, but emits a nested Observable instead of an array. 
- Deprecated: `concatMapTo`, `exhaust`, `mapTo`, `megeMapTo`, `pluck`, `switchMapTo` 

 
 
 

 