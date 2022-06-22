# Categories of Operators 
- There are operators for different purposes, and they may be categorized as: creation, transformation, filtering, joining, multicasting, error handling, utility, conditional/Boolean and Mathematical/Aggregate Operators. 

## Join Creation Operators 
- `combineLatest`: combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables. 
    - Whenever any input Observable emits a value, it computes a formula using the latest values from all the inputs, then emits the output of that formula. 
    - To ensure the output array always has the same length, the operator will actually wait for all input Observables to emit at least once, before it starts emitting results. This means if some Observable emits values before other observables started emitting, all these values but the last will be lost. 
    - If there are any Observable errors, the operator will error immediately as well, and al other Observables will be unsubscribed. 
- `contact`: creates an output Observable which sequentially emits all values from the first given Observable and then moves on to the next. 
    - You can pass either an array of Observables, or put them directly as arguments. 
    - This operator is an equivalent of merge operator with concurrent parameter set to 1. 
    - If any Observable in chain errors, instead of passing control to the next Observable, the operator will error immediately as well. 
- `forkJoin`: Accepts an array of Observable or dictionary Object of Observable and returns an Observable that emits either an array of values in the exact same order as the passed array, or a dictionary of values in the same shape as the passed dictionary. 
    - If any given observable errors at some point, the operator will error as well and immediately unsubscribe from the other pending observables. 
    - Optionally, accepts a resultSelector function, that will be called with values which normally would land in the emitted array. 
- `merge`: Creates an output Observable which concurrently emits all values from every given input Observable. 
    - Flattens multiple Observables together by blending their values into one Observable. 
    - Any error delivered by an input Observable will be immediately emitted on the output Observable. 
    - You can set the number of concurrently for these operators. 
- `partition`: Splits the source Observable into two, one with values that satisfy a predicate, and another with values that don't satisfy the predicate. 
    - It's like filter, but returns two Observables: one like the output of filter, and the other with values that did not pass the condition. 
- `race`: Returns an observable that mirrors the first source observable to emit an item. 
    - Returns an Observable, that when subscribed to, subscribes to all source observables immediately, as soon as one of the source observables emits a value, the result unsubscribes from the other sources. 
    - I one of the used source observables throws an error before a first notification the race operator will also throw an error, no matter if another source observable could potentially win the race. 
- `zip`: Combines multiple Observables to create an Observable whose values are calculated from the values, in order, or each of its input Observables. 
    - If the last parameter is a function, this function is used to compute the created value from the input values, Otherwise, an array of the input values is returned. 
