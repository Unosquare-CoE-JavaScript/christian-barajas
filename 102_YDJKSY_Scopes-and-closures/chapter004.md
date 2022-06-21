
- [Chapter 001](./chapter001.md) - What’s the Scope? 
- [Chapter 002](./chapter002.md) - Illustrating Lexical Scope 
- [Chapter 003](./chapter003.md) - The Scope Chain 
- [Chapter 004](./chapter004.md) - Around the Global Scope 
- [Chapter 005](./chapter005.md) - The (Not So) Secret Lifecycle of Variables 
- [Chapter 006](./chapter006.md) - Limiting Scope Exposure 
- [Chapter 007](./chapter007.md) - Using Closures 
- [Chapter 008](./chapter008.md) - The Module Pattern 

# Chapter 4: Around the Global Scope 

- The global scope of a JS program is a rich topic, with much more utility and nuance than you would likely assume. 
- This chapter explores how the global scope is still useful and relevant to writing JS program today. 
- and later, looks at the differences in where and how to access the global scope in different JS environments. 

## Why Global Scope? 
- There are three main ways on how JS engine handles a single runtime context with browser-executed applications: 
    - Using directly ES Modules, these files are loaded individually by the JS environment. Each module then imports references to whichever other modules it needs to access. The separate module files cooperate with each other exclusively through these shared imports, without needing any shared outer scope. 
    - Using a Bundler in your build process, all files are typically concatenated together before delivery to the browser and JS engine. It is still necessary to have some type of mechanism so each piece can register a name to be referred to by other pieces. 
    - In some, the entire contents of the file are wrapped in a single enclosing scope, such as a wrapper function, Universal Module (UMD). Each piece can register itself for access from other pieces by way of local variables in that shared scope. 
    - Whether a bundler tool is used for an application or whether the (non-ES Modules) files are simply loaded in the browser individually. If there is no single surrounding scope encompassing all the pieces, the global scope is the only way for them to cooperate with each other. 

- The global scope is also where: 
  - JS exposes its built-ins: 
    - primitives: undefined, null, Infinity, NaN 
    - natives: Date(), Object(), String(), etc. 
    - global functions: eval(), parseInt(), etc. 
    - namespaces: Math, Atomics, JSON 
    - friends of JS: Intl, WebAssembly 
  - The environment hosting the JS engine exposes its own built-ins: 
    - console(and its methods) 
    - the DOM (window, document, etc) 
    - timers (setTimeout(..), etc) 
    - web platform APIs: navigator, history, geolocation, WebRTC, etc. 

- BUT!!! Most developers agree that the global scope shouldn't just be a dumping ground for every variable in your application. It's also undeniable that the global scope is an important glue for practically every JS application. 

## Where exactly is the Global Scope? 
- It is located in the outermost portion of a file, not inside any function or block 
- But it is not quite as simple as JS environments handle the scope differently. 

### Browser "Window" 
- Most pure environment Js can be run in as a standalone .js file loaded in a web page environment in a browser. 
- The code may be loaded in a web page environment using an inline `<script></script>` or `<script src=""></script>` or even created dynamically a `<script> DOM Element`. In all cases the identifiers are declared in the global scope. 
- That means if you access the global object (commonly, window in the browser), you'll find properties of those same names there. 

### Globals shadowing globals 
- An unusual consequence of the difference between a global variable and a global property of the same name is that, within just the global scope itself, a global object property can be shadowed by a global variable. 
- It's almost certainly a bad idea to create divergence between the global object and the global scope. 
- A simple way to avoid this gotcha with global declarations: always use var for globals. Reserve let and const for block scopes. 

### DOM Globals 
- One Surprising behavior in the global scope you may encounter is a DOM element with an id attribute automatically creates a global variable that references it. 
- The auto registration of all id-bearing DOM elements as Global variables is an old legacy browser behavior that nevertheless must remain for old sites still relying on it. 

### What about `window.name`? 
- It is a pre-defined "global" in a browser context it is a property on the global object, so it seems like a normal global variable that stores a string. it's actually a pre-defined getter/setter on the window object. 

### Web Workers 
- Web workers are a web platform extension on top of browser JS behavior, which allows a JS file to run in a completely separate thread (OS wise) from the thread that's running the main JS program. 
- They're restricted in their communications with the main application thread, to avoid/limit race conditions and other complications. 
- They don't have access to the DOM. but some APIs are made available to the worker, such as navigator. 
- Since they are treated as a wholly separate program it does not share the global scope with the main JS program. 
- In a Web Worker, the global object reference is typically made using `self`. 

### Developer Tools Console/REPL 
- Certain error conditions applicable to a JS program may be relaxed and not displayed when the code is entered into a developer tool. 
- Such observable differences in behavior may include: 
    - The behavior of the global scope. 
    - Hosting. 
    - Block-scoping declaration when used in the outermost scope. 
- While optimized to be convenient and useful for a variety of developer activities, are not suitable environments to determine or verify explicit and nuanced behaviors of an actual JS program context. 

### ES Modules (ESM) 
- One of the most obvious impacts of using ESM is how it changes the behavior of the observable top-level scope in a file. 
- Despite declaring at the top level of the module file, in the outermost obvious scope, variables are not global. Instead, they are module-wide(module-global). 
- Global variables don't get created by declaring variables in the top-level scope of a module. 
- All variables that exist in the global scope are available as lexical identifiers from inside the module's scope. 
- ESM encourages a minimization of reliance on the global scope. 

### Node 
- Node treats every single .js file that it loads including the main one you start the process with, as a module (ES Module or CommonJS module). 
- The top level of your Node program is never actually the global scope.  
- Node wraps the code and declarations in a function's scope, not treated as global variables. 
- Node defines a number of "globals" like `require()`, but they're not actually identifiers in the global scope. They're injected in the scope of every module essentially a bit like parameters listed. 
- `global` is a reference to the real global scope object, somewhat like using `window` in a browser JS env. The identifier `global` is not defined by JS, but by Node. 

### Global this 
- The complexity is never more obvious than in trying to nail down a universally applicable reference to the global scope object. Yet another "trick" for obtaining a reference to the global scope object may look like this 
    `const theGlobalScopeObject = (new Function("retunr this"))();` 
- As of ES2020, JS has finally defined a standardized reference to the global scope object, called `globalThis`. 
- We could even attempt to define a cross-environment polyfill that's safer across pre-globalThis JS environments, such as: 
    ```sh 
    const theGlobalScopeObject =  
        (typeof globalThis != "undefined") ? globalThis : 
        (typeof global != "undefined") ? global : 
        (typeof window != "undefined") ? window : 
        (typeof self != "undefined") ? self :  
        (new Function("return this"))(); 
    ``` 
- Not ideal but it works if you find yourself needing a reliable global scope reference. 

 
 

 