
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

# Chapter 012: Processing Real-Time Updates
- The demand for real-time features has been growing in web applications
- The different steps to implement the reactive pattern for consuming real-time updates.
- There are two techniques available for publishing real-time data on the web:
    - Pull technique: This is where the client raises a request to get the latest version of data. HTTP polling and HTTP long polling are two examples of implementations of the pull technique.
    - Push technique: This is where the server pushes updates to the client. WebSockets and Server Sent Events are two implementations of the push technique.
- WebSocket protocol is a stateful communication protocol that establishes a low-latency bidirectional communication channel between a client and a server.
- This way, messages can be sent back and forth between the server and the client.
- there are three steps in WebSocket communication:
    1. Opening the connection: In this step, the client issues an HTTP request to tell the server that a protocol upgrade will occur (from HTTP to WebSocket). If the server supports WebSockets, then the protocol switch will be accepted.
    2. Establishing the communication channel: Once the protocol upgrade is done, then a bidirectional communication channel will be created, and messages start to be sent back and forth between the server and the client.
    3. Closing the connection: When the communication is over, a request will be issued to close the connection.

## Learning the reactive pattern for consuming real-time messages
- RxJS has a special type of Subject called WebSocketSubject that allows you to communicate with a WebSocket server.

### The WebSocketSubject behavior
- WebSocketSubject is nothing but a wrapper around the W3C WebSocket object available in the browser. It allows us to both send and consume data through a WebSocket connection.

### The WebSocketSubject creation
- In order to use WebSocketSubject, you have to call the webSocket factory function that produces this special type of Subject and takes the endpoint of your WebSocket server as input.
- It accepts two types of arguments: either a string representing the URL of your endpoint or a special object of the WebSocketSubjectConfig type that contains the URL of your endpoint, along with other properties.

#### Listening to incoming messages from the server
- As WebSocketSubject is nothing but a regular RxJS Subject, you can register callbacks to process the incoming messages from the WebSocket server.
- In order to listen to messages, you should subscribe to the produced WebSocketSubject from the webSocket factory function and register a callback,
```javascript
    const Subject$ = webSocket('ws://localhost:8080');
    // Listen to messages from the server
    const subscription1 = Subject$.subscribe(msg => {
        console.log('Message received from the socket'+ msg);
    });
```
#### Pushing messages to the server
- You can also catch errors coming from the server using catchError as usual and push errors to the server by calling the error method. 
- But bear in mind that when you send an error, the server will get notified about this error, and then the connection will be closed.

#### Closing the connection
- You can use unsubscribe or complete to close the connection
- As you may have noticed, only the creation of WebSocketSubject is specific to this special kind of Subject. All the other APIs used are the same as those used for regular Subjects.

### Connection management
- If the same instance of WebSocketSubject has many subscribers, then they will share the same connection to save resources. 
- However, if we have two different instances of WebSocketSubject, it will establish two distinct connections, even if they are referencing the same endpoint. Be aware of this behavior! 
- We create two instances of WebSocketSubject called firstSubject$ and secondSubject$ respectively that reference the same ws endpoint. Then, we create a subscription to the firstSubject$; this first subscription will open the WebSocket connection. Then, we create a second subscription to the same Observable, firstSubject$; this second subscription will use the already opened WebSocket connection.
- We create two instances of WebSocketSubject called firstSubject$ and secondSubject$ respectively that reference the same ws endpoint. Then, we create a subscription to the firstSubject$; this first subscription will open the WebSocket connection. Then, we create a second subscription to the same Observable, firstSubject$; this second subscription will use the already opened WebSocket connection.
- If we have many subscribers sharing the same connection and one of those subscribers decides to complete, then the connection will be released unless there are no more subscribers listening

### Putting te Pattern in action
1. creating a real-time service
2. triggering the connection
3. defining the Observable emitting live updates
4. subscribing to the Observable emitting live updates
5. changing detection strategy

## Learning the reactive pattern for handling reconnection
- When the connection to the WebSocket server is lost, the channel will be closed, and WebSocketSubjet will no longer emit values. This is not the expected behavior in the real-time world. The reconnection capability is a must in most cases.
- This is possible thanks to WebSocketSubjectConfig, which is responsible for customizing some behavior in the socket life cycle. The following is the API:
```javascript
    export interface WebSocketSubjectConfig<T> {
        url: string;
        protocol?: string | Array<string>;
        openObserver?: NextObserver<Event>;
        serializer?: (value: T) => WebSocketMessage;
        deserializer?: (e: MessageEvent) => T;
        closeObserver?: NextObserver<CloseEvent>;
        closingObserver?: NextObserver<void>;
        WebSocketCtor?: { new(url: string,
        protocols?:string|string[]): WebSocket };
        binaryType?: 'blob' | 'arraybuffer';
    }
```
- The following code creates WebSocketSubject using WebSocketSubjectConfig and simply intercepts the closure event to display a custom message:
```typescript
    public getNewWebSocket(): WebSocketSubject<Item> {
        return webSocket({
            url: WS_ENDPOINT,
            closeObserver: {
                next: () => {
                    console.log('[Socket]: connection closed')
                }
            }
        })
    }
```
### Retrying the reconnection
- Let's create a function that will retry to connect to a given Observable every configurable interval. We do this combining the retryWhen operator that subscribes to an Observable conditionally after it completes with the delayWhen operator that sets the delay between two consecutive connections.
```javascript
    private reconnect(observable: OBservable<Item>): Observable {
        return observable.pipe(
            retryWhen(errors => errors.pipe(
                tap(value => console.log('[Socket]: Trying to reconnect', value)),
                delayWhen( _ => timer(RECONNECT_INTERVAL_SOCKET))
            ))
        )
    }
```
- This reconnect function will be used as an RxJS custom operator to handle the reconnection after the socket's closure in the connect() method of our RealTimeService, as follows:
```javascript
    public connect(config: {reconnect: boolean} = { reconnect: false}) {
        const messages$ = this.socket$.pipe(
            this.reconnect,
            tap({error: error => console.log(error)})
            catchError(_ => EMPTY ))
        this.messagesSubject$.next(messages$);
    }
```
- Then, all you have to do is call the connect function with reconnect: true when intercepting the connection closure, as follows:
```javascript
    public getNewWebSocket(): WebSocketSubject<Item> {
        return webSocket({
            url: WS_ENDPOINT,
            closeObserver: {
                next: () => {
                    console.log('[Socket]: connection closed')
                    this.socket$ = undefined;
                    this.connect({ reconnect: true })
                }
            }
        })
    }
```