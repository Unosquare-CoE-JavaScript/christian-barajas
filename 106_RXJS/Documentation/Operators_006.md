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
# Categories of Operators 
- There are operators for different purposes, and they may be categorized as: creation, transformation, filtering, joining, multicasting, error handling, utility, conditional/Boolean and Mathematical/Aggregate Operators. 

## Utility Operators 
- `tap`: Used to perform side-effects for notifications from the source observable. 
    - Used when you want to affect the outside state with a notification without altering the notification. 
- `delay`: Delays the emission of items from the source Observable by a given timeout or until a given Date. 
    - Time shifts each item by same specified amount of ms. 
- `delayWhen`: Delays the emission of items from the source Observable by a given time span determined by the emissions of another Observable. 
    - It's like delay, but the time span of the delay duration is determined by a second Observable. 
    - `delayDurationSelector`: Accepts a function that returns an Observable for each value by the source Observable, which is then used to delay the emission of that item on the output Observable until the Observable returned from this function emits a value. 
    - `subscriptionDelay`: Optional. Default is undefined. An Observable that triggers the subscription to the source Observable once it emits any value. 
- `dematerialize`: Converts an Observable of `OBservableNotification` objects into the emission that they represent. 
    - Unwraps `ObservableNotification` objects as actual next, error and complete emissions. The opposite of materialize. 
- `materialize`: Represents all of the notifications from the source Observable as next emissions marked with their original types within Notification objects. 
    - Wraps next, error and complete emissions in Notification objects, emitted as next on the output Observable. 
- `observeOn`: Re-emits all notifications from source Observable with specified scheduler. 
    - Ensure a specific scheduler is used, from outside of an Observable. 
- `subscribeOn`: Asynchronously subscribes Observers to this Observable on the specified SchedulerLike. 
    - With `subscribeOn` you can decide what type of scheduler a specific Observable will be using when it is subscribed to.
- `timeInterval`: Convert an Observable that emits items into one that emits indications of the amount of time elapsed between those emissions. 
- `timestamp`: Attaches a timestamp to each item emitted by an observable indicating when it was emitted 
- `timeout`: Errors if the Observable does not emit a value in given time span. 
    - Timeouts on Observable that doesn't emit values fast enough. 
- `timeoutWith`: When the passed timespan elapses before the source emits any given value, it will unsubscribe from the source, and switch the subscription to another observable. 
    - Used to switch to a different observable if your source is being slow. 
    - Use Date object to switch to a different observable if the first value doesn't arrive by a specific time. 
    - Useful in cases where: 
        - You want to switch to a different source that may be faster. 
        - You want to notify a user that the data stream is slow. 
        - You want to emit a custom error rather than the TimeoutError emitted by the default usage of timeout. 
- `toArray`: Collects all source emissions and emits them as an Array when the source completes. 
    - Get all values inside an array when the source completes. 

## Conditional and Boolean Operators 
- `defaultIfEmpty`: Emits a given value if the source Observable completes without emitting any next value, otherwise mirrors the source Observable. 
    - If the source Observable turns out to be empty then this operator will emit a default value. 
- `every`: Returns an Observable that emits whether or not every item of the source satisfies the condition specified. 
    - If all values pass predicate before the source completes, emits true before completion, otherwise emit false, then complete. 
- `find`: Emits only the first value emitted by the source Observable that meets some condition. 
    - Find the first value that passes some test and emits that. 
- `findIndex`: Emits only the index of the first value emitted by the source Observable that meets some conditions. 
    - It's like find, but emits the index of the found value, not the value itself. 
- `isEmpty`: Emits false if the input Observable emits any values, or emits true if the input Observable completes without emitting any values. 
    - Tells Whether any values are emitted by an Observable. 
    - A similar effect could be achieved with count, but `isEmpty` can emit a false value sooner. 

## Mathematical and Aggregate Operators 
- `count`: Counts the number of emissions on the source and emits that number when the source completes. 
    - Tells how many values were emitted, when the source completes. 
    - This operator takes an optional predicate function as argument; in which case the output emission will represent the number of source values that matched true with the predicate. 
- `max`: The Max operator operates on an Observable that emits numbers (or items that can be compared with a provided function), and when source Observable completes it emits a single item: the item with the largest value. 
    - `comparer`: Accepts an Optional Parameter, Default is undefined. Optional Comparer function that it will use instead of its default to compare the value of two items. 
- `min`: The Min operator operates on an Observable that emits numbers (or items that can be compared with a provided function), and when source Observable completes it emits a single item: the item with the smallest value. 
    - `comparer`: Accepts an Optional Parameter, Default is undefined. Optional Comparer function that it will use instead of its default to compare the value of two items. 
- `reduce`: Applies an accumulator function over the source Observable, and returns the accumulated result when the source completes, given an optional seed value. 
    - Combines together all values emitted on the source, using an accumulator function that knows how to join a new source value into the accumulation from the past. 
    - Like `Array.prototype.reduce()`, reduce applies an accumulator function against an accumulation and each value of the source Observable (from the past) to reduce it to a single value, emitted on the output Observable.  
    - Note that reduce will only emit one value, only when the source Observable completes. It is equivalent to applying operator scan followed by operator last. 
