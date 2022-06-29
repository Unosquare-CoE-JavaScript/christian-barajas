# Chapter 008: Multicasting Essentials

## Explaining Multicasting vs. Unicasting

### Producer
- We call Producer the source of values of the Observable – for example, DOM events, WebSockets, and HTTP requests are regarded as Producers. Basically, it is any data source used to get values.
- Observables basically fall into two types – hot and cold Observables.

### A Cold Observable
- An observable is called cold when the data emitted is created by the Observable itself.
- The producer of the data is then created inside the observable itself.
- A Unicast observable is an observable whose emitted values are not shared among subscribers.
- So, for cold observables, the following applies:
    - Data is produced by the Observable itself.
    - It starts to emit data only after the observer subscribes to it.
    - Each observer (or subscriber) gets its own unique set of items.

### A Hot Observable
- An observable is called hot when the data emitted is created outside the Observable.
- The producer of the data is created outside the observable itself. 
- A Multicast observable is an observable whose emitted values are shared among subscribers.
- So, for hot observables, the following applies:
    - Data is produced outside the Observable.
    - It may begin emitting items as soon as it is created.
    - The emitted items are shared between the subscribers (Multicasting).

## Exploring Subjects
- The most frequently used ways to multicast values to observers in RxJS are RxJS Subjects and Multicasting operators.
- They allow Multicasting values to all the subscribers. You can regard Subjects as Observers and Observables at the same time:
    - You can subscribe to Subjects to get emitted values by the Producer (that's why they act as Observables).
    - You can send values, errors, and complete the stream using the next, error, and complete methods.
- The Subject maintains a list of subscribers and notifies them when a new value is emitted. There are many types of Subjects; let's explore the most used ones.
- Plain Subjects, BehaviourSubject, and ReplaySubject are the most frequently used Subjects in RxJS. There are other types of Subjects, but they are used less, such as WebSocketSubject.

### A plain Subject
- The plain Subject is the super class of all Subjects.
- The subscribers will only get the values emitted after their subscription.
- This is how a regular Subject multicasts values.

### Replay Subject
- If you want to keep a buffer of previous values to be emitted to subscribers coming late, then ReplaySubject can help with this!
- All the values were replayed to the new subscribers. In order to control the buffer size, you can pass it as a parameter when creating ReplaySubject.

### BehaviorSubject
- BehaviorSubject is nothing but ReplaySubject with a buffer size equal to one, so it can replay only one previous item.
- Requires an initial value and always retains the last value to emit it to new subscribers.

## Highlighting Multicasting operators
- There are many useful RxJS operators for Multicasting (or sharing values/executions) in RxJS 6, namely, multicast, publish, share, shareReplay, publishReplay, publishLast, and refcount.
- In version 7, Multicasting operators were consolidated to share, connectable, and connect. The other Multicasting APIs are now deprecated and will be deleted in RxJS 8. 
- The only operator that wasn't deprecated is shareReplay because it is very popular. It is now a wrapper around the highly configurable share operator.