# Appendix A: Exploring Further 
- These discussions will also be more heavily influenced by my opinions than the main text was, so keep that in mind as you consume and consider what is presented. 
- This appendix is a bit like a collection of mini-blog posts that elaborate on various book topics. 

## Implied Scopes 
- Scopes are sometimes created in non-obvious places. 

### Parameter Scope 
- Chapter 002 implies that function parameters are basically the same as locally declared variables in the function scope. But that's not always true. 
- If we change it to be a non-simple parameter, that's no longer technically the case. 
- Parameter forms considered non-simple include parameters with default values, rest parameters (using ...), and destructured parameters. 
- Ex. `const getSingleItem = ( itemID = 0 ) => {}`, Here, the parameter list essentially becomes its own scope, and the function's scope is then nested inside that scope. 
- The non-simple parameter forms introduce various corner cases, so the parameter list becomes its own scope to more effectively deal with them. 
- Another Ex. `const getSingleItem = ( itemID = maxItemID, maxItemID ) => {}`, Assuming left-to-right operations, the default = `= maxItemID` for the itemId parameter requires a maxItemId,  to already exist (and to have been initialized). This code produces a TDZ error. 
- The reason is that maxItemID, is declared in the parameter scope but it's not yet been initialized because of the order of parameters, BUUUT if the parameter order is flipped, no TDZ error occurs:  
    - `const getSingleItem = ( maxItemID, itemID = maxItemID ) => {}` 
- Final advice to avoid getting bitten by these weird nuances:  
    - Never shadow parameters with local variables 
    - Avoid using a default parameter function that closes over any of the parameters 
- Be careful about the fact that the parameter list is its own scope if any of the parameters are non-simple. 

### Function Name Scope 
- The name identifier of a function expression is in its own implied scope, nested between the outer enclosing scope and the main inner function scope. 
- You'll rarely run into any case where the scope of a function's name identifier matters. To avoid being bitten, never shadow function name identifiers. 

## Anonymous vs. Named Functions 
- As you contemplate naming your functions, consider:  
    - name inference is incomplete 
    - Lexical names allow self-reference 
    - Names are useful descriptions 
    - Arrow functions have no lexical names 
    - IIFEs also need names 

### Explicit or inferred Names? 
- Should we always put that name into the code? maybe for debugging to avoid stack traces with "anonymous". 
- Ex. named function `function thisIsNamed() {}`. 
- Ex. not named function `const notNamed = function () {}`. 
- Ex. inferred name `var config = { cb: function() {} }`. because `config.cb.name` will give `cb`. 
- These inferred names might show up in the stack traces. But Anonymous function expression passed as callbacks are incapable of receiving an inferred name. 
- The vast majority of all function expressions, especially anonymous ones, are used as callback arguments; none of these get a name. So, relying on name inference in incomplete, at best. 
- Any assignment of a function expression that's not a simple assignment will also fail name inferencing. 
    - Ex. `var [ noName ] = [ function() {} ]`, checking `noName.name` will give `""`. 
    - Ex. `var config = {}; config.cb = function(){}`, checking `config.cb.name` will give `""`. 

### What function is it?  
- Without a lexical name identifier, the function has no internal way to refer to itself. Self-reference is important for things like recursion and event handling. 
- Leaving off the lexical name from your callback makes it harder to reliably self-reference the function. 
- You could declare a variable in an enclosing scope that references the function, but this variable is controlled by that enclosing scope, it could be reassigned or something else, so it's not as reliable as the function having its own internal self-reference. 

### Names are descriptors 
- Leaving off a name from a function makes it harder for the reader to tell what the function's purpose is, at a quick glance. 
- The JS engine doesn't care about the name, but human readers of your code absolutely do. 
- If you can't figure out a good name, you likely don't understand the function and its purpose yet. The function is perhaps poorly designed, or it does too many things, and should be re-worked. 

### Arrow functions 
- Arrow functions are always anonymous, even if (rarely) they're used in a way that gives them an inferred name. 
- Don't' use them as a general replacement for regular functions. 
- Arrow functions don't define a this identifier keyword at all. If you use a this inside an arrow function, it behaves exactly as any other variable reference, which is that the scope chain is consulted to find a function scope (non-arrow function) where it is defined, and to use that one. 
- In other words, Arrow functions treat this like any other lexical variable 
- Use Arrow function, instead of cases where you have to force a function to inherit a this from an outer function. 
- In the rare case you need lexical this, use an arrow function. 

### IIFE Variations 
- Every IIFE should have a name. No exceptions. 
- Technically, the only reason we're using that first surrounding set of ( ... ) is just so the function keyword isn't in a position to qualify as a function declaration to the JS parser. 
- But there are other syntactic ways to avoid being parsed as a declaration:  
    - `!function anIIFEFunction(){ ... }();` 
    - `+function anIIFEFunction(){ ... }();` 
    - `~function anIIFEFunction(){ ... }();` 
    - `void function anIIFEFunction(){ ... }();` 
- The !,+,~, and several other unary operators (operators with one operand) can all be placed in front of function to turn it into an expression, then the final () call is valid, which makes it an IIFE. 
- You can also use the void unary operator, the benefit of it is, it clearly communicates at the beginning of the function that this IIFE won't be returning any value. 

## Hoisting: Functions and Variables 
- Give hoisting a deeper level of consideration by considering the merits of:  
    - Executable code first, function declarations last 
    - Semantic placement of variable declarations 

### Function Hoisting 
- To take advantage of function hoisting is that it puts the executable code in any scope at the top, and any further declarations (functions). This means it's easier to find the ode that will run in any given area. 

### Variable Hoisting 
- We know that let and const hoist, you cannot use those variables in their TDZ. So, the following part only applies to var declarations. 
- The Autor shares that the variable hoisting is a bad idea. 
- While that kind of inverted ordering was helpful for function hoisting, with variables will be harder to reason about. 
- There's a case that makes the exception. It has to do with where you place a var declaration inside a CommonJS module definition. 
- Ex. we need a variable call cache to have already been assigned a value before a module is exported. because the values are used in the initialization of the public API (the .bind( .. ) partial-application) And now the variable cache becomes public. 
    ```javascript 
        cache={}; 
        // used here, but declared below 
        // public API 
        var publicAPI = Object.assign(module.exports,{ 
            getStudents, 
            addStudents, 
            refreshData: refreshData.bind(null,cache) 
            }); 
        // ******************************** 
        // private implementationvarcache 
        /* = {}*/; 
    ``` 
- This is literally the only case the book found for leveraging variable hoisting to assign a variable earlier in a scope that its declarations. 

### The case for var 
- As the book comments, here are some points to remember: 
    - var was never broken 
    - let is your friend 
    - const has limited utility 
    - The best of both worlds: var and let 
- var is fine, and works fine. 

### const-antly confused 
- const is not carrying its own weight. 
- const pretends to create values that can't be mutated. But using const with a mutable value (like an array or object) is to set a trap. 
- Don't forget that value immutability isn't at all the something as assignment immutability. 
- But variable re-assignment just isn't that big of a deal in terms of causing bugs. 
- A fact that const and let are supposed to be used in blocks, and blocks are supposed to be short, and you have a really small area of your code where a const declaration is even applicable. 

### var and let 
- You should be using both var and let in your programs, BUUUTT They are not interchangeable: you shouldn't use var where a let is called for. nor vice versa. 
- You could use let in this top-level scope, but it's not the best tool for that job. 
- By contrast, use often a var inside a block. 
- In addition to this best tool semantic argument, var has a few other characteristics that, in certain limited circumstances, make it more powerful. 

### The Deal with TDZ 
- TDZ comes from const, actually. 
- During early ES6 development work, TC39 had to decide whether const/let were going to hoist to the top of their blocks. 
- They decided these declarations would hoist, similar to how var does. 
- So let and const have to hoist to the top of the block, visible, throughout. 
- But if let and const hoist to the top of the block (like var hoist to the top of a function), why they don't auto-initialize (to undefined) as var does. 
- TC39, made the decision: since we need a TDZ for const we might as well have a TDZ for let as well. In fact, if we make let have a TDZ, then we discourage all that ugly variable hosting people do. 
- Just avoid the TDZ by always declaring your constants at the top of the scope. 

## Are Synchronous callbacks still closures? 
- Chapter 007 presented two different models for tackling closure: 
    - Closure is a function instance remembering its outer variables even as that function is passed around and invoked in other scopes. 
    - Closure is a function instance and its scope environment being preserved in-place while any references to it are passed around and invoked from other scopes. 

### What is a callback?  
- It's generally accepted norm that saying "callback" is synonymous with both asynchronous callbacks and synchronous callbacks (Not a good idea). 
- Consider an async callback, a function reference that will be invoked at some future later point. 
- In this context, calling back makes a lot of sense, The JS engine is resuming our suspended program by calling back in at a specific location. 

### Sync callback?  
- Ex. 
    ```javascript 
        const getLabels = (itemIDs) => items.map(id => `Item ID: ${String(id).padStart(6)}`); 
    ``` 
- There's nothing to call back into per se, because the program hasn't paused or exited. 
- We're passing a function (ref) from one part of the program to another part and invoked immediately. 
- There're other established terms that might match what we're doing - passing in a function reference so that another part of the program can invoke it on our behalf, you might think of this as Dependency Injection (DI) or Inversion of Control (IoC) 
- DI can be summarized as passing in necessary parts of functionality to another part of the program so that it can be invoke them to complete its work. 
- IoC is pretty similar, related concept, means that instead of the current area of your program controlling what's happening, you hand control off to another part of the program. 
- Martin Fowler cites IoC as the difference between a framework and a library: with a library, you call its functions; with a framework, it calls your functions. 
- Books suggest referring to sync callbacks as inter-invoked functions (IIFs). meaning: another entity invokes them, as opposed to IIFEs, which invokes themselves immediately. 
- And by that though and the context of the book: An async callback is an IIF that's invoked async instead of sync. 
- Yes, some IIF would reference variables from an outer scope for it to have any chance of being a closure. 

## Classic Module Variations 
- Take some hints for recognizing useful variations of the module: 
    - Does the module know about its own API? 
    - Even if we use a fancy module loader, it's just a classic module 
    - Some modules need to work universally 
- Most classic modules don't define and use a publicAPI 
    - publicAPI is a semantic descriptor that aids readability by making it more obvious what the purpose of the object is. 
    - Storing an inner publicAPI variable that references the same external public API object returned, can be useful if you need to access or modify the API during the lifetime of the module. 

### Asynchronous Module Definition (AMD) 
- Popular several years back, such as those supported by the RequireJS utility:  
    ```javascript 
        define(["./Students"], function StudentList(Student) { 
            var elements = []; 
            return { 
                renderList() {} 
            } 
        }) 
    ``` 
- It's a classic module factory function. Inside the machinery of define( ... ) (provided by RequireJS) 
- The function is executed, passing to it any other module instances declared as dependencies. The return value is an object representing the public API for the module. 
- Based on exactly the same principles (including how the closure works!) as we explored with classic modules. 

### Universal Modules (UMD) 
- Exact format and more a collection of very similar formats. 
- It was designed to create better interop (without any build-tool conversion) for modules that may be loaded in browsers, by AMD-style loaders, or in Node. 
- Typical structure of a UMD: 
    ```javascript 
        (function UMD (name, context, definition) { 
            // Loaded by an AMD-style loader?  
            if (typeof define === 'function' && define.amd) { 
                define(definition); 
            } 
            // in Node? 
            else if (typeof module !== 'undefined' && module.exports) { 
                module.exports = definition(name, context); 
            } 
            // Asumming standalone browser script 
            else { 
                context[name] = definition(name, context); 
            } 
        })('ItemModule', this, function DEF(name, context){ 
            var elems = []; 
            return { 
                renderItems(){ 
                } 
            } 
        }); 
    ``` 
- It may look a bit unusual, IMD is really just an IIFE. 
- These validations detect which of the three supported environments the module is being loaded in. 
- The final () that normally invokes an IIFE is being passed three arguments: name, context, and definition. 
- definition(...) is invoked to actually retrieve the definition of the module, that's a classic module form declaration. 
- And ESM (ES Modules) are becoming popular and widespread rapidly. But it's still very important to be able to read and understand when you come across them. 
