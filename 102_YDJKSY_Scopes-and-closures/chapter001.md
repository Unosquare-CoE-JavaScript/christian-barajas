
- [Chapter 001](chapter001.md) - What’s the Scope? 
- [Chapter 002](chapter002.md) - Illustrating Lexical Scope 
- [Chapter 003](chapter003.md) - The Scope Chain 
- [Chapter 004](chapter004.md) - Around the Global Scope 
- [Chapter 005](chapter005.md) - The (Not So) Secret Lifecycle of Variables 
- [Chapter 006](chapter006.md) - Limiting Scope Exposure 
- [Chapter 007](chapter007.md) - Using Closures 
- [Chapter 008](chapter008.md) - The Module Pattern 

# Chapter 1: What’s the Scope? 
- JS is typically classified as an interpreted scripting language, so it’s assumed by most that JS programs are processed in a single, top-down pass. But JS is in fact parsed/compiled in a separate phase before execution begins. 
- The code author's decisions on where to place variables, functions, and blocks with respect to each other are analyzed according to the rules of scope, during the initial parsing/compilation phase. 
- The resulting scope structure is generally unaffected by runtime conditions. - JS functions are themselves first class values; they can be assigned and passed around just like numbers or strings. 
- Since they hold and access variables, they maintain their original scope no matter where in the program the functions are eventually executed. This is called closure. 
- Modules are a code organization pattern characterized by public methods that have privileged access (via closure) to hidden variables and functions in the internal scope of the module. 

## Compiled vs Interpreted 
- Code compilation is a set of steps that process the text of your code and turn it into a list of instructions the computer can understand. 
- Typically, the whole source code is transformed at once, and those resulting instructions are saved as output(usually in a file) that can later be executed. 
- Interpretation performs a similar task to compilation, in that it transforms your program into machine-understandable instructions. 
- Unlike a program being compiled all at once, with interpretation the source code is transformed line by line; each line or statement is executed before immediately proceeding to processing the next line of the source code. 
- Interpretation can actually take other forms than just operating line by line on source code text. 
- Modern JS engines actually employ numerous variations of both compilation and interpretation in the handling of Js programs. 

## Compiling Code 
- Scope is primarily determined during compilation, so understanding how compilation and execution relate is key in mastering scope. 
- In classic compiler theory, a program is processed by a compiler in three basic stages: 
    - Tokenizing/Lexing: breaking up a string of characters into meaningful chunks, called tokens. Whitespace may or may not be persisted as a token, depending on whether it's meaningful or not. 
    - The difference between tokenizing and lexing is subtle and academic, but it centers on whether or no these tokens are identified in a stateless or estaful way 
    - Parsing: taking a stream (array) of tokens and turning it into a tree of nested elements, which collectively represent the grammatical structure of the program.  
    - This is called an Abstract Syntax Tree (AST) 
    - Code Generation: taking an AST and turning it into executable code. This part varies greatly depending on the language. 
- The JS engine is vastly more complex than just these three stages. 
- In the process of parsing and code generation, there are steps to optimize the performance of the execution. 
- Code can even be recompiled and re optimized during the progression of execution. 
- JS engine compilation doesn't happen in a build step ahead of time, as with other languages. It usually must happen in mere microseconds right before the code is executed. 
- To ensure the fastest performance under the constraints, JS engines use all kinds of tricks, like JITs. 

## Required: Two Phases 
- The most important observation about processing of JS programs is that it occurs in (at least) two phrases: parsing/compilation first, then execution. 
- There are three program characteristics you can observe to prove this: syntax errors, early errors and hoisting. 

## Compiler Speak 
- All occurrences of variables/identifiers in a program serve in one of two "roles": either they're the target of an assignment or they're the source of a value. 
- Left-Hand Side (LHS) aka target and Right-Hand Side (RHS) aka source, as in left and right sides of an = assignment operator. 
- However, assignment targets and sources don't always literally appear on the left or right of an =, so it's probably clearer to think in terms of target / source rather than left / right. 
- How do you know if a variable is a target? Check if there is a value that is being assigned to it; if so, it's a target. if not, the variable is a source. 
- For the JS engine to properly handle a program's variables, it must first label each occurrence of a variable as target or source. 

## Targets 
- Consider `students = [ // ]`, is clearly an assignment operation, but there are three other target assignment operations less obvious: 
    - `for (let item of items) {`, assigns a value to `item` each iteration. 
    - `getSingleItem(1)`, the argument is assigned to the function parameter. 
    - `function getSingleItem(itemIdx)`, a function declaration is a special case of a target reference. An identifier "getSingleItem" is declared at compile time. The association between `getSingleItem` and the function is automatically set up at the beginning of the scope rather than waiting for an = assignment statement to be executed. 

## Sources 
- In `for (let item of items) {`, "items" is a source reference. 
- In `if (item.id == itemIdx) {`, both "item" and "itemIdx" are source references. 
- in `return item.name`, "item" is also a source reference. 
- In `getSingleItem(1)`, getSingleItem is a source reference. 

## Cheating: Runtime scope modifications 
- The scope is determined as the program is compiled, and should not generally be affected by runtime conditions. 
- In a non-strict-mode, there are technically two ways to cheat this rule, modifying a program's scopes during runtime. 
- Neither of the techniques should be used. both are dangerous and confusing- 
    - `eval(...)`, function receives a string of code to compile and execute on the fly during the program runtime. 
    - If the argument of type string contains code, eval will receive it and execute it on the fly during the program runtime. If that string contains var o function declaration, they will modify the current scope that the `eval(...)` is running. 
    - `with` keyword, dynamically turns an object into a local scope, its properties are treated as identifiers in the new scope's block 
    - The global scope was not modified here, but the block-function was turned into a scope at runtime. 

## Lexical Scope 
- The key idea of it is that it's controlled entirely by the placement of functions, blocks and variable declarations, in relation to one another. 
- If there is a variable declaration inside a function, the compiler handles this declaration as it's parsing the function and associates that declaration with the function's scope. 
- If a variable is block-scoped declared (let / const), then it's associated with the nearest enclosing `{ ... }` block. 
- A reference (Target or source role) for a variable must be resolved as coming from one of the scopes that are lexically available to it, otherwise it'll be said to be "undeclared". 
- If the variable is not declared in the current scope, the next outer/enclosing scope will be consulted. 
- This process of stepping out one level of scope nesting continues until either a matching variable declaration can be found or the global scope is reached and there's nowhere else to go. 
- Compilation creates a map for all the lexical scopes that lays out what the program will need while it executes. 
- While scopes are identified during compilation, they're not actually created until runtime, each time a scope needs to run. 


   

 