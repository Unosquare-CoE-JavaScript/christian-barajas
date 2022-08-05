# NODEJS

## Node Architecture
- A Well-defined structure laid out beforehand provides a clear view of your system's working.
- It helps you organize your business logic, services, API Routes, data models, etc, in a systematic way.
- Here are some key points that an ideal project setup entails
    - Coherent, well-defined structure for clarity
    - Reusability, modularity, and separation of concerns.
    - Simplicity for better undestanding.
    - Easy debuggin and maintenance.
    - Automated testing, logging mechanisms.
    - Employing best programming, development principles.

### Event-Driven Architecture
- Builds on a common pattern in Software development known as publish-subscribe or observer pattern.
- In an event-driven architecture there are at least two actors: the subject and the observer.
- Keep in mind that event-driven, publish-subscribe, and observer pattern are not the same thing in practice, but ideally they use the same approach: an entity boradcasts a message while other entities listen for it.
- It's been theorized around 1987, while the observer pattern appeared in the quintessential book "Desing Patterns" by the gang of four in 1994.
- In practice. JS in the browser can interact with HTML elements which are event-emitters, that is, subjects able to emit events.
- Event targets in the browser are objects capable of emitting events: they're subjects in the observaber pattern.
- Most of what you do in NodeJS is based on events. You interact with an emitter object and some observers listening for messages.
- In NodeJS there isn't any HTML element, so, most events originate from procesess, interactions with networks, files and so on.
- Every event emitter in NodeJS has a method named `on` which takes at least two parameters/arguments:
    - The name of the event to listen to.
    - A listener function.
- Practical ex.
    ```javascript
        const net = require('net');
        const server = net.createServer().listen(8081, '127.0.0.1")

        server.on('listening', () => console.log('Server listening!'));
        server.on('connection', (socket) => { 
            console.log('Client connected');
            socket.end('Hello client!');
        })
    ```
- Any event-driven module in NodeJS extends a root class named EventEmitter. It has two fundamental methods: on and emit. To be precise there is also an addListener method too. The method on is an alias for it.
- The method emit, useful when you want to broadcast a custom event (a message);
- Practical ex.
    ```javascript 
        const EvetEmitter = require('events');
        const emitter = new EventEmitter();

        emitter.on('CustomerEvent', () => console.log('Got Event'))

        emitter.emit('CustomerEvent');
    ```
- Other examples of observer/publish-subscribe in JS. JS does not have native support of observables, but there's a proposal for adding them to them to the language
    - RxJS - Library which brings the observer to JS.
    - Redux - Implementation of the publish-subscribe pattern in JS. "It is a glorified" event emitter where state changes are dispatchet to any observer who listens.
    - Socket.IO is a library which makes heavy use of events.
    - Moder browsers are shipping with the Intersection Observer API, another example of observer pattern in action.

## Best Practices

### Take a Layered Approach
- We should have differente modules for addressing differente concerns pertinent to our application.
- Aspects can be generally handled by three different layers:
    1. Controller (API Routes & Endpoints) - Only your API Routes, In the route handler functions, you can deconstruct the request object, pick the importan data pieces and pass them to the service layer for processing
    2. Service (Bussines Logic) - Contains a bunch of classes and method that take up singular responsibility and are reusable(Following SOLID principles). Allows you to decouple the processing loginc from where the routes are defined.
    3. Data Access (Working with a database) - Fetching from, writing to, and updating it. All your SQL Queries, database connections, models, ORM(Object-Relational mappers), etc.

### Folder Structure
- Properly organize your code files. This abstract architecture can be realized though a proper folder structure that separates differente modules into different folders.
- Below is a common(yet effective) folder structure: 
    ```
    src
        ├── app.js			    app entry point
        ├── /api			    controller layer: api routes
        ├── /config			    config settings, env variables
        ├── /services		    service layer: business logic
        ├── /models			    data access layer: database models	
        ├── /scripts		    miscellaneous NPM scripts
        ├── /subscribers		async event handlers
        └── /test               test suites
    ```

### Publisher Subscriber Models 
- It's a popular data exchange pattern in which there are two communication entities, A publisher and a subscriber.
- Publisher (message senders) send out messages along specific channles without any knowledge of the receiving entities.
- Subscribers (message receivers), on the othher hand express interest on ine or more of these channels.
- It's a good idea to incorporate such a model in your project to manage multiple children operations corresponding to a single action.
- The pub/sub pattern can be set up in NodeJS using the Events API.You can program your code first emit an event. And to handle such events emissions, you can hace multiple subscribers that essentially event listeners.
- These Subscribers can be organized into separate files based on their purpose and stored in the /subscribers directory.
```javascript
    var events = require('events');

    var evtEmitter = new events.EventEmitter();

    export default class CertainService(){
        
        async function method(){
            evtEmitter.emit('event', /** DATA **/)
        }
    }

    export default class OtherService(){

        evtEmitter.on('event', async ({data}) => {

        })
    }
```

### Clean Code & Easy Readability
- **Linting & Formatting** - A linter looks for and warns about syntactically (and even semantically) erroneus code whereas a code formatter (as the name suggests) works towards the more stylistic aspects of your code to ensure a set of formatting and styling guidelines consistent across your whole project.
- Linters - ESLint, JSLint and JSHint.
- Code Formatting - Prettier. 
- **Style Guides** - You can also refer to JS coding styles and standards used by giants like Google and Airbnb.
- These guides cover everything from naming conventions (for files, variables, classes, etc) to formatting specifics to file encoding and so much more.

### Write Async Code
- **Use promises, async/await syntax** - This allows for cleaner code, better readability, easier error handling and testing; all of this while maintaining a clear control flow and a more coherent functional programming setup.
- **Configuration files and Environment Variables** - It is always a good practice to store these options together in a separate file inside a config folder in your project. This folder can contain all your different configuration options grouped in files based on their usage.

### Testing, Logging & Error Handling 
- **Test your code** - Testing is integral to any software application. It allows you to test the validity, accuracy, and robustness of your code by bringing to light even the smallest inaccuracies.
- There are plenty of testing frameworks out there for Node.js developers to choose from. Some of the most popular ones are Mocha, Jest and Jasmine.
- **Log Everything** - Logging plays an important role throughout the whole pipeline of any software application. Some of the most common logging frameworks for Node.js are - Winston, Bunyan, and Morgan.
- **Log Everything** - It keeps things stable,  facilitates easier debugging, and also prevents a poor end-user experience. Below is a basic try/catch block example in Node.js.

### Code Compression and File Size
- Gzip is a lossless file format (also a software application) used for compressing (and decompressing) files for faster network transfer. It can therefore be extremely beneficial in compressing the web pages being served by our Node.js servers. 

### Dependency Injection
- Dependency injection is a software design pattern that advocates passing (injecting) dependencies (or services) as parameters to our modules instead of requiring or creating specific ones inside them. 

### Third-party solutions
- Here are some popular Node.js libraries that can effectively enhance your coding workflows:
    - Nodemon, (automatically restarts application when code files are updated)
    - Gulp, Grunt, (automated task runners)
    - Winston, (logging framework)
    - Agenda (job scheduling)
    - Moment (working with date & time)

### Follow good generic coding practices
- DRY (Don’t Repeat Yourself)
- Single Responsibility Principle (SRP)
- “Keep it simple, stupid” (KISS)
- Separation of Concerns
- YAGNI (You ain’t gonna need it)
- Avoid premature optimization
- S.O.L.I.D programming principles
- Dependency injection


    
## Event Loop
- The event loop is what allows NodeJS to perfomr non-blocking I/0 operations. despide the fact that JS is single-threaded. By Offloading operations to the System kernel whenever possible.
- When NodeJS starts, it intializes the event loop, processes the provided input script (or drops into the REPL) which may make async API calls, schedule timers or call process.nextTick(). then begins processing the event loop.
- NodeJS, almost share the same Phases like normal Browser does.
- Each phase has a FIFO queue of callbacks to execute.
- When Event Loop enters a given phase, it will perform any operations specific to that pase, then execute callbacks in that phase's queue until the queue has ben exhausted or the max number of callbacks has executed.
- When thhe queue has been exhausted, the event loop will move to the next phase.
- Poll phase operations are queued by the kernel, can be queued while polling events are being processed.
- Between each run of the event loop, NodeJS checks if it is waiting for any Async I/O or timers and shuts down cleanly if there are not any.
- For NodeJS, the event loop is written in C and managed by couple of companies.
- libuv for Node and libevent for Google Chrome and TOR.

### Phases in detail
- Timers - Timers callbacks will run as early as they can be scheduled after the specied amount of time has passed. OS scheduling or the running of other CBs may delay them. Technically the poll phase controls when timers are executed.
- Pending Callbacks - Executes Callbacks for some SO such as types of TCP errors. Ex a TCP Socket receives an ECONNREFUED some \*nix SO wants to wait to report the error, this will be queued to execute in this phase.
- Poll - This phase has tow main function, first, calculating how long it should block and poll for I/O, second, processing events in the poll queue.
    - When the event loop enters this phase and there are no timers scheduled, one of two things will happend:
        1. If the poll queue is not empty, the event loop will iterate through its queue of callbacks executing them sync until either the queue has been exhuasted or reach limit
        2. if the poll queue is empty one of two things will happend: If scrips have not been schedule by setImmediate, the event loop will wait for callbacks to be added to the queue then execute them immediately. If scripts have been schedule by setImmediate, the event loop will end the poll phase and continue to the check phase to execulte those scripts.
        - Once the poll queue is empty the event loop will check for timers whose tme thresholds have been reached, if one of more timers are ready, the event loop will wrap back to the timers phase to execute those timers' callbacks.
- Check - Allows a person toe xecute callbacks immediately after the poll phase has completed
    - if the poll phase becomes idle and scripts have been queued with setImmediate, the event loop may contine to the check phase rather than waiting.
    - setImmediate() is actually a special timer that runs in a separate phase of the event loop. It uses a libuv API that schedules callbacks to execute after the poll phase has completed.
- Close callbacks - if a socket or handle is clsed abruptly(Ex, socket.destroy()), the close event will be emitted in this phase. Otherwise it will be emitted via process.nextTick().

### SetImmediate vs setTimeout
- Both are similar, but behave in differente ways depending on when they are called
- setImmediate - is designed to execute a script once the current poll phase completes.
- setTimeout - schedules a script to be run after a minimum threshold in ms has elapsed.
- The order in which the timers are executed will vary depending on the context in which they are called.
- Advantage of using setImmediate, will always be executed before any timers if scheduled within an I/O cycle, independtly of how many timers are present.

### process.nextTick()
- This method is technically not part of the event loop, Instead the nextTickQueue will be processed after the current operation is completed, regardless of the current phase of the event loop.
- Anytime you call this method in a given phase, all callbacks passed to the method will be resolved before the event loop continues.
- This can create some bad situations because it allows you to "starve" your I/O by making recursive calls of this method.



## Sources
[Node.js Architecture and 12 Best Practices for Node.js Development](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development)