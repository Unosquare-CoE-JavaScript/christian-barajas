# Subscription 
- A Subscription is an object that represents a disposable resource, usually the execution of an Observable. 
- A Subscription has one important method, unsubscribe, that takes no argument and just disposes the resource held by the subscription in previous version of RxJS, Subscription was called "Disposable". 
- A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable executions. 
- Subscriptions also have a remove(otherSubscription) method, in order to undo the addition of a child Subscription. 

# Subjects 
- An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observable are unicast (each subscribed Observer opens an independent execution of the Observable). 
- Subject are multicast. 
- A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners. 
- **Every Subject is an Observable.** given a Subject you can subscribe to it, which will start receiving values normally. 
- From the perspective of the Observer, it cannot tell whether the Observable execution is coming from a plain unicast Observable or a Subject. 
- **Every Subject is an Observer**. It is an Object with the method `next(v)`, `error(e)` and `complete()`. 
- To feed a new value to the Subject, just call `next(newValue)`. 

## Mullticasted Observables 
- A MO passes notifications through a Subject which may have many subscribers, whereas a plain "unicast Observable" only sends notifications to a single Observer. 
- A multicasted Observable uses a Subject under the hood to make multiple Observers see the same Observable execution. 
- Under the hood: this is how the multicast operator works: Observes subscribe to an underlying Subject and the Subject subscribes to the source Observable. 

## Reference counting 
- Calling `connect()` manually and handling the Subscription is often cumbersome. It's preferred that this behavior be handled automatically. 
- refCount makes the multicasted Observable automatically start executing when the first subscriber arrives, and stop executing when the last subscriber leaves. 

## BehaviorSubject 
- A variant of the Subject, which has a notation of the current value. It stores the latest value emitted to its consumers and whenever a new Observer subscribes, it will immediately receive the "current value" from the behaviorSubject. 
- This type of Subjects are useful for representing values over time. 

## ReplaySubject 
- Similar to BehaviorSubject in that it can send old values to new subscribers, but can also record a part of the Observable execution. 
- Records multiple values from the Observable execution and replays them to new subscribers. 
    - `bufferSize`: parameter to determine how old the recorded values can be. 
    - `windowTime`: parameter to specify a window time in ms. 

## AsyncSubject 
- A variant, where only the last value of the Observable execution is sent to its observers, and only when the execution completes. 

## Void subject 
 - Sometimes the emitted value doesn't matter as much as the fact that a value was emitted. 
 - By declaring a void subject, you signal that the value is irrelevant, only the even itself matters. `const subject = new Subject<void>();` 

# Schedulers 
- A scheduler controls when a subscription starts and when notifications are delivered, it consists of three components. 
    - It's a data structure: It knows how to sotre and queue tasks based on priority or other criteria. 
    - It's an execution context. It denotes where and when the task is executed. 
    - It has a virtual clock. it provides a notion of "time" by a getter method now() on the scheduler. Tasks being scheduled on a particular scheduler will adhere only to the time denoted by that clock. 
- A Scheduler lets you define in what execution context will an Observable deliver notification to its Observer. 

## Types 
- **Omission is allowed**, by not passing any scheduler, notifications are delivered synchronously and recursively. Use this for constant-time operation or tail recursive operations. 
- **queueScheduler**, Schedules on a queue in the current event frame (trampoline scheduler). Use this for iteration operations. 
- **asapScheduler**, Schedules on the micro task queue, which is the same queue used for promises. Basically, after the current job, but before the next job. Use this for asynchronous conversions. 
- **asyncScheduler**,  Schedules work with setInterval, Use this for time-based operations. 
- **animationFrameScheduler**, Schedules task that will happen just before next browser content repaint. Can be used to create smooth browser animations. 

## Using Schedulers 
- All Observable operators that deal with concurrency have optional schedulers. 
- If you do not provide the scheduler, RxJS will pick a default scheduler by using the principle of least concurrency. 
    - This means that the scheduler which introduces the least amount of concurrency that satisfies the need of the operator is chosen. 
- You can pick a different scheduler if you want to introduce concurrency for performance purpose. To specify a particular scheduler, you can use those operator methods that take a scheduler. 
- Static creation operators usually take a Scheduler as an argument. It is usually the last argument to the operator. 
- The following static creation operator take a Scheduler argument: `bindCallback`, `bindNodeCallback`, `combineLatest`, `concat`, `empty`, `from`, `fromPromise`, `interval`, `merge`, `of`, `range`, `throw`, `timer`. 
- Use `subscribeOn` to schedule in what context will the `subscribe()` call happen. By default, will be synchronously and immediately. 
- Use `observeOn` to schedule in what context will notifications be delivered. introduce a mediator Observer between the source Observable and the destination Observer. 

## Instance Operators 
- Instance operators may take a Scheduler as an argument. 
- Time-related operators like `bufferTime`, `debounceTime`, `delay`, `auditTime`, `sampleTime`, `throttleTime`, `timeInterval`, `timeout`, `timeoutWith`, `windowTime` all take a Scheduler as the last argument, and otherwise operate by default on the asyncScheduler. 
- Other instance operators that take a Scheduler as argument: `cache`, `combineLatest`, `concat`, `expand`, `merge`, `publishReplay`, `startWith`. 
- Notice that both `cache` and `publishReplay` accept a Scheduler because they utilize a `ReplaySubject`. 
