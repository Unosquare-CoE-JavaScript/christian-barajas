# Chapter 009: Caching Streams
- Caching data and assets is one of the most efficient ways to improve the user experience of our web applications.
- It is a good way to speed up the load times of our web applications and keep the number of network requests to a minimum.
- So, subscribing multiple times to this Observable will cause the source Observable to be re-created over and over again, hence performing a request on each subscription.
- This behavior will result in an overhead of HTTP requests, which may decrease the performance of your web applications, especially if the server takes some time to respond.
- But when should we cache data? When data doesn't change frequently and it is used by more than one component, it makes a lot of sense to cache it and share it in multiple places.
- It would be better to cache the result and read the data from the cache to enhance the performance and the user experience.
- Instead, we will configure an update interval to update the cache in the background so that the UI gets updated consequently.
- In a real-world application, we wouldn't refresh the data by requesting the server every interval (this technique is called polling).
- We will instead implement two simple types of cache:
    - A static cache for static data that does not refresh
    - A cache with refresh capacity

## Learning about using the reactive pattern to cache streams
- RxJS ships with a very useful operator to put in place a caching mechanism for streams, which is the shareReplay operator.
- The shareReplay operator shares an Observable execution with multiple subscribers. It has an optional parameter, which is bufferSize. Now, bufferSize represents the number of emissions that are cached and replayed for every subscriber.
- In a nutshell, the shareReplay operator does the following:
    - Shares an Observable execution with multiple subscribers
    - Offers the possibility to replay a specified number of emissions to the subscribers
- We want to share the last stream's emission with all the subscribers, in other words, transforming the cold stream to a hot stream using the shareReplay operator.
- Under the hood, the shareReplay operator creates a ReplaySubject instance that will replay the emissions of the source Observable with all the future subscribers.
- If we use a push-based solution, then we can intercept the event of receiving messages to update the data.
- When refCount is enabled (set to true), the source will be unsubscribed when the reference count drops to zero and the source will no longer emit.
- If refCount is disabled (set to false), the source will not be unsubscribed from, meaning that the inner ReplaySubject will still be subscribed to the source and potentially run forever.
    ```typescript
        interface ShareReplayConfig {
            bufferSize?: number;
            windowTime?: number;
            refCount: boolean;
            scheduler?: SchedulerLike;
        }
    ```
- To prevent surprises, it is highly recommended to use the signature that takes the config parameter this way:
    ```typescript
      shareReplay({bufferSize: 1, refCount: true }) 
    ```

## Exploring the RxJS 7 recommended pattern to cache streams
- A lot of work was done in version 7 to consolidate multicasting operators. The multicast, publish, publishReplay, publishLast, and refCount operators were deprecated and will be removed in RxJS 8.
- The only operators remaining are shareReplay, share, and connectable. And the share operator rules them all, meaning that it is highly recommended to use the share operator instead of Connectable and shareReplay in most cases.
- The shareReplay operator is too popular to deprecate but may be deprecated in future versions as there is an alternative to it, especially because shareReplay, when not used carefully, can cause memory leaks, particularly with infinite streams.
- The share operator is enhanced in version 7 with an optional configuration object as an argument, which makes it more flexible and ready to do the job of other operators.
- In this share configuration object, you can choose the subject you're connecting through and define your reset behavior. And this is how we can achieve the behavior of the shareReplay operator using the share operator:
```typescript
    stream$.pipe(
        share({
            connector: () => new replaySubject(),
            resetOnRefCountZero: true,
            restOnComplete: true,
            resetOnError: true,
        })
    )
```
- If you're using version 7 of RxJS, it is highly recommended to call the share operator instead of shareReplay. The preceding code has the same behavior as the shareReplay operator.

## Highlighting the use cases of caching streams
- All that you have to do is put the result in a cache that is a shared place for all the consumers.
- There is another use case where caching streams makes a lot of sense: when accounting for expensive side effects on the streams.
- In general, we call the actions that we perform after a value is emitted side effects. This could be logging, displaying messages, doing a kind of mapping, and so on.