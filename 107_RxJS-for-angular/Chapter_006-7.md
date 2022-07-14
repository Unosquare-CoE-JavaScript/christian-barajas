
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

# Chapter 006: Combining Streams
- For this section, we are going to based our case in a filtering function.
- When it comes to filtering, there are a lot of strategies you can adopt, you can choise of them depending on the size of your data.
- If your data size is a small amount that you can fetch entirely on the client side, then us unnecessary to perfomr server-side filtering; it is faster to perform client-side filtering, 
- However, if you have a large amount of data, then you should be lazy loading your data through paginatnion, infinite scroll, or virtual scroll, 
-But the reactive pattern we're going to discuss does not need a specific type of filtering, it can be used with both cliend and server side.

## Exploring the imperative pattern for filtering data
- In this method we are no longer able to take advantage of your data being a stream in the template.

## Exploring the declarative pattern for filtering data
- We have a data stream (responsible for getting the data) ad the action stream (responsible for emitting the latest value fo the filter)
- Both of the stream rely on each other, when the data stream emits a new value, the filter should stary active, and when the filter emits a new value, and the view list should be updated accordingly.
- For this case, we should think of one of the combination operators in RxJS. We can combine this stream to form a single new stream.

## The combineLatest operator
- This operator will combine the latest values emitted by the input observables. So, every time one of the observables emits, combineLatest will emit the last emitted value from each.
- The operator will not emit an initial value until each observable emits at least one value.

## The declarative pattern pillars
1. Define the data stream
2. Craete the action stream
3. Emit a value every time ab action occurs.
4. Combine both of those streams

## Subjects and Behaviours
- Subject is a special type of Observable tht enables multicasting. 
- BehaviourSubject is a special type of subject that requres an initial value and always retain the last value to emit it to new subscrbies.

# Chapter 007: Transforming Streams
- One of the most frequent use cases is the need to transform a stream of certain values into a stream of other values.
- For this chapter we are going to dig into an autosave case behavior.

## Exploring the imperative pattern for autoave
- Reactive forms leverage RxJS by using the valueCHanges Observble to track the FormControl changes.
- Nesting suscriptions are consider an anti-pattern. 
- Everytime we use subscribe(), we open the door to imperative code, we should avoid that as muchs as we can.
- Nested subscriptions should be cleaned carefully; otherwise, we can run into various performance problems.
- We open up to the possibility of serious timming issues:
    - If multiple for valuea are emmitted, many save request wiil be ent int parallel
    - If any of those request take some extra time, ther eis no guarantee that the backend will process the save requests in order.
    - Consequently, we will end up with data incoherence.

## Exploring the reactive pattern for autosave
- Think of the save operation as a stream. The save$ observable is reponsible for saving the data in the backend.
- To avoid having nested subscription, we can map or transform the form value emitted by the valueChanges Observable to the save$ Observable.

## Higher-order observables
- It just an observable like any other, but is values are observables as well. It emits observables that you can subscribe to separately.
- You can create a HOO whenever you use data emitted from one observable to emit another observable.
- In this case, we want to transform or map the form value to the save$ observable.

## Higher-order mapping operators
- The role of these operators is to map each value from an outer observable to a new inner observable and automatically subscribe and unsuscribe from the inner observable.
- Difference between higher-order mapping and regular mapping, Regualar mapping involves mapping one value to another value. 

## The concatMap Operator
- It's the combination of the concatenation strategy and transformation.
- This operation sa a mixture of higher-order mapping and observable concatenation: it waits for each inner observable to complete before processing the next one.
- This operator fits with very well to the autosave requirement:
    - We want to take the form value and turn it into a save$ observable and aoutmatically subscribe and unsubscribe from the save$ inner observable.
    - We want to perform a save request only after the preovuis one is completed.
- The first benefit of using contactMap is that now we no longer have nested subscriptions.
- We also get rid of explicit subscriptions thanks to the async pipe.
- In order to avoid sending requests for every character introduced by the user, we can use the debounceTime(waitingTime) operator to wait for the user input to stabilize vefore sending the requests. We can optimize if further by ignorering duplicates, invalid values, and so on.
- Use concatMap when you want to ensure the operations are processed in sequence and each inner observable is processed one at a time and in order.
- There are other High-order mapping operators that are useful in may situations.

## Learning about other useful higher-order mapping operators
- There are different strategies, such as merge, switch and exhaust.

### The mergeMap operator
- Unlike concat, merge will not wait for an observable to complete before subscribing to the next observable, It subscribes to every inner observable at the same time nd then outputs the values to the combined result.
- The result will not complete until all the merged observables complete.
- mergeMap is a higher-order mapping oeprator that processes each inner observable in parallel.
- It enhances performance since each inner observable is processed concurrently, but only use mergeMap if the resulting order odesn't matter because it's possible tht these request will be processed out of order.

### The switchMap Operator
- If a new observable starts emitting values, the the switch will subscribe to the new observable and unsubcribe from te prevous one.
- It is useful when you want to cancel an operation when a new one is triggered.

## The exhautMap Operator
- This operator is a higher-order mapping operator that unsubcribes from any prior inner observable and switches to any new inner observable.


## Summary
- If the order is important and you nned to process operations in sequence while waiting for completion, then concatMap is the right choice.
- If the order is not important and you nned to process operations in parallel to enhance performance, mergeMap is the best operator.
- If you need to put a cancellation logic to release resources and take always the most recent information, then switchMap is the way to go.
- To ignore new observables while the current one is still onging, use exhaustMap.
