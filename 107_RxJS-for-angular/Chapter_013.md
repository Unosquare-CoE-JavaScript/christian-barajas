
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

# Chapter 013: Testing RxJS Observables
- In this chapter, we are going to explain the subscribe and assert pattern, the marble testing pattern and highlight a suitable pattern for testing streams that are returned from HTTPClient.

## Learning about the subscribe and assert pattern
- Observables are lazy and we don't get any value until we subscribe to them. In tests, it is the same thing. To solve this, programmers always tend to subscribe to the observables manually inside the tests.
- This method is very simple. as follows: 
    ```javascript
        export class SampleService{
            getItem(item: boolean): Observable<boolean> {
                return of(item)
            }
        }
    ```
- The test of this method will look like this:
    ```javascript
        describe('SampleService', () => {
            let service: SampleService;
            beforeEach(() => {
                service = TestBed.inject(SampleService)
            });
            it('Should return true as a item', () => {
                service.getItem(true)
                    .subscribe( result => expect(result).toEqual(true) )
            })
        })
    ```
- You cant call the done callback, for asynchronous calls. Tells the testing framework when the test is done and makes your test more resilent.

## Learning about the marble testing pattern
- To understand the syntax, we should know about the following semantics:
    - `' '` whitespace: horizontal whitespace is ignored, and can be used to help vertically align multiple marble diagrams.
    - `-` frame: 1 "frame" of virtual time passing (see above description of frames).
    - `[0-9]+[ms|s|m]` time progression: the time progression syntax lets you progress virtual time by a specific amount. It's a number, followed by a time unit of ms (milliseconds), s (seconds), or m (minutes) without any space between them, e.g. a 10ms b.
    - `|` complete: The successful completion of an observable. This is the observable producer signaling complete().
    - `#` error: An error terminating the observable. This is the observable producer signaling error().
    - `[a-z0-9]` e.g. 'a' any alphanumeric character: Represents a value being emitted by the producer signaling next().
    - `()` sync groupings: When multiple events need to be in the same frame synchronously, parentheses are used to group those events.
    - `^` subscription point: (hot observables only) shows the point at which the tested observables will be subscribed to the hot observable. This is the "zero frame" for that observable, every frame before the ^ will be negative. Negative time might seem pointless, but there are in fact advanced cases where this is necessary, usually involving ReplaySubjects.
- Let´s look at some examples to practice the syntax: 
    - `—--`: This represents an observable that never emits.
    - `-x--y--z|`: This represents an observable that emits x on the first frame, y on the fourth, and z on the seventh. After emitting z, the observable completes.
    - `--xy--#`: This represents an observable that emits x on frame two, y on frame three, and an error on frame six.
    - `-x^(yz)--|`: This is a hot observable that emits x before the subscription.

## Implementing marble tests
- There are different packages out there that can helpo you write marble tests. The most well known are jasmine-marbles, jest-marbles, and rxjs-marbles. 
- However, RxJS provides testing utilities out of the box and all the libreries are just wrappers around the RxJS testing utilities.
- I recommend working with the RxJS utilities for the following reasons:
    - You don't have to include a third-party dependency.
    - You stay up to date with the core implementation.
    - You stay up to date with the latest features.
- The API that's provided for testing in RxJS is based on TestScheduler. TestScheduler has a run method.
- It takes callback as a parameter, which accepts a parameter of the RunHelpers type.
- It gives us all the helper methods we need for marble testing. The itnerface contains: 
    ```javascript
        export interface RunHelpers {
            cold: typeof TestScheduler.prototype.createColdObservable;
            hot: typeof TestScheduler.prototype.createHotObservable;
            flush: typeof TestScheduler.prototype.flush;
            expectObservable: typeof TestScheduler.prototype.expectObservable;
            expectSubscriptions: typeof TestScheduler.prototype.expectSubscriptions;
        }
    ```
- cold: This produces a cold observable based on a given marble diagram.
- hot: Tis produces a host observable based on a given marble diagram
- When you're creating a host observable, you can use ^ to point out the first frame.
- flush: This starts a virtual time. It's only needed if you use helpers outside the run callback or if you want to flush more than once.
- expectObservable: This asserts that an observable matches a marble diagram.
- expectSubscriptions: This asserts that an observable matches the expected subscriptions.

- The expectedMarble constant represents the marble diagram. Since the getValues method returns three values consecutively, we used parentheses to group the a, b, and c emissions; the stream then completes, so we use the | character.
- The expectedValues constant represents the values of the a, b, and c characters that we put in expectedMarble.
- The cool feature of TestScheduler that can help us here is virtual time, having to work with timed observables.

## Highlighting testing streams using HttpClientTestingModule
- Consider:
    ```javascript
        save(value): Observable<Item> {
            return this.http.post<Item>(`${BASE_PATH}/items`, value)
        }
    ```
- There is a very useful API that caon be used in this case: HttpClientTestingModule. 
- This API allows us to test HTTP Method that use the http Client.
- It also allows us to easily mock HTTP Requests by providing the HttpTestingController service.
- Let's look at it usage:
    1. Before you can use HttpClientTestingModule and its HttpTestingController service, you need to import and provide them in your TestBed, alongside the service we are testing.
    2. Then, we must inject HttpTestingController and RecipesService and provide a shared instance of each to use in our tests.
    3. Then, we must implement the test case
    4. Finally, we must add an afterEach() block, in which we run the verify method of our controller.
- This ensures that no request is outstanding. And that's it! This is the pattern for testing methods that issue HTTP requests.