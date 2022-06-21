
- [Chapter 001](chapter001.md) - What’s the Scope? 
- [Chapter 002](chapter002.md) - Illustrating Lexical Scope 
- [Chapter 003](chapter003.md) - The Scope Chain 
- [Chapter 004](chapter004.md) - Around the Global Scope 
- [Chapter 005](chapter005.md) - The (Not So) Secret Lifecycle of Variables 
- [Chapter 006](chapter006.md) - Limiting Scope Exposure 
- [Chapter 007](chapter007.md) - Using Closures 
- [Chapter 008](chapter008.md) - The Module Pattern 

# Chapter 6: Limiting Scope Exposure 
- We are going to look at how and why we should be using different levels of scope (functions and blocks) to organize our program's variables, specifically to reduce scope over-exposure. 

## Least Exposure 
- Software engineering articulates a fundamental discipline, typically applied to software security, called "The Principle of Least Privilege" (POLP). 
- A variation of this principle that applies to our current discussion is typically labeled as "Least Exposure" (POLE) 
- POLP expresses a defensive posture to software architecture: components of the system should be designed to function with least privilege, least access, least exposure. 
- If Each piece is connected with minimum-necessary capabilities, the overall system is stronger from a security standpoint. - If POLP focuses on system-level component design, the POLE Exposure variant focuses on a lower level, on how scopes interact with each other. 
- When variables used by one part of the program are exposed to another part of the program, via scope, there are three main hazards that often arise: 
    - **Naming Collisions**: If you sue a common and useful variable/function name in two different parts of the program, but the identifier comes from one shared scope, then name collision occurs, and it's very likely that bugs will occur as one part uses the variable/function in a way the other part doesn't expect. 
    - **Unexpected behavior**: If you expose variables/functions whose usage is otherwise private to a piece of the program, it allows other developers to use them in ways you didn't intend, which can violate expected behavior and cause bugs. 
    - Exposure of private details invites those with mal-intent to try to work around limitations you have imposed. 
    - **Unintended Dependency**: If you expose variables/functions unnecessarily, it invites other developers to use and depend on those otherwise private pieces. 
- It creates a refactoring hazard in the future, because now you cannot as easily refactor that variable or function without potentially breaking other parts that you don't control. 
- POLE, as applied to variable/function scoping, default to exposing the bare minimum necessary, keeping everything else as private as possible. 
- Declare variables in as small and deeply nested of scopes as possible, rather than placing everything in the global scope. 

## Hiding in plain (Function) Scope 
- Hide our variables and function declarations in the lowest scopes possible, can be easily be done by wrapping a function scope around a declaration. 
- having a variable inside your function that'll be utilized more than once, will require persistent caching, and it will be wise to hide it in its own scope. 
- **memoization**: Caching a function's computed output to optimize performance when repeated calls of the same input are expected, quite common in the Functional Programming World, Referred to as "memoization". This caching relies in closure, also there are memory usage concerns. 
- FP Libraries will usually provide optimized and vetted utility for memoization of functions. 
- This variable to be reusable, can be defined as a function expression instead of a function declaration, that means it can be name every single occurrence of such function expression the exact same name, and never have any collision. 

## Invoking function Expressions Immediately 
- An IIFE (Immediately Invoked Function Expression) is useful when we want to create a scope to hide variables/functions, Since it's an expression, it can be used in any place in a JS program where an expression is allowed. An IIFE can be named or unnamed/anonymous. 
- Example of a standalone IIFE:  
    ```sh 
        // outer scope 
        (function () { 
            // Inner hidden scope 
        })(); 
        // more outer scope 
    ``` 

## Function Boundaries 
- Beware that using an **IIFE** to define a scope can have some unintended consequences, depending on the code around it. Because an **IIFE** is a full function, the function boundary alters the behavior of certain statements/constructs. 
- For example, a `return` statement in some piece of code would change its meaning if an **IIFE** is wrapped around it, because now the `return` would refer to the **IIFE**'s function. 
- Non-arrow function **IIFEs** also change the binding of this keyword. And statements like `break` and `continue` won't operate across an **IIFE** function boundary to control an outer loop or block. 
- So if your code has `return`, `this`, `break` or `continue` in it, an **IIFE** is probably not the best approach. 

## Scoping with blocks 
- In general, any { ... } curly-brace pair which is a statement will act as a block, but not necessarily as a scope. 
- A block only becomes a scope, if necessary, to contain its block-scoped declarations (let or const). 
- Not all { ... } curly-brace pairs create blocks (and thus are eligible to become scopes): 
    - `Object literals` use { ... } to delimit their key-value lists, but such object values are not scopes 
    - `Class` uses { ... } around its body definition, but this is not a block or scope. 
    - A `function` uses { ... } around its body, but this is technically a block, it's a single statement for the function body. It is, however, a (function) scope. 
    - The { ... } pair on a `switch` statement does not define a block/scope. 
- A { ... } can define a block attached to a statement (like an if or for), or standalone by itself. 
- An explicit block of this sort, if it has no declarations, it's not actually a scope, serves no operational purpose, though it can still be useful as semantic signal. 
- Explicit standalone { ... } blocks have always been valid JS syntax, but since they couldn't be a scope prior to ES6's let/const, they are quite rare. However, post ES6 they're starting to catch on. 
- In most languages that support block scoping, an explicit lock scope is an extremely common pattern for creating a narrow slice of scope for one or a few variables. 
- Following the POLE principle, we should embrace this pattern more widespread in JS as well, use (explicit) block scoping to narrow the exposure of identifiers to the minimum. 
- If you find yourself placing a let declaration in the middle of a scope, think first, is this variable needed in the first half of that block, if not, you should use an inner explicit block scope to narrow its exposure. 

## var and let 
- if a var variable is used across the entire function, any variable that is needed across all of a function should be declared so that such usage is obvious. 
- var has always signaled "variable" that belongs to a whole function. 
- var better communicates function-scoped than let does, and let both communicates block-scoping where var insufficient. 

## Where to place let? 
- The advice given by the Autor says, reserve var for mostly only a top-level function scope means that most other declarations should use let. 
- POLE already guides you un those decisions asking, "What is the most minimal scope exposure that's sufficient for this variable?" 
- Somehow answering: If a declaration belongs in a block scope, use let. If it belongs in the function scope, use var (Another opinion). 
- The i in a loop should always be used only inside the loop, in which case POLE dictates it should be declared with let instead of var. 

## What's de catch? 
- Since the introduction of try ... catch back in ES3(1999), the catch clause has used an additional block scoping declaration capability. The err variable declared by the catch clause is block-scoped to the block. A var declaration inside this block still attaches to the outer function/global scope. 
- Now with ES2019 catch clauses changed, so their declaration is optional. if declaration is omitted the catch block is no longer a scope, still a block. 

## Function Declarations in Blocks 
- Let's talk about function declaration that appears directly inside a block, called FiB. An example of a block would be an if ... else statement. 
- Depending in which JS environment you try to run such FiB, you may get different results. 
- This area is where existing legacy behavior betrays a predictable outcome. 
- The JS specification says that function declarations inside of blocks are block-scoped, however most browser-based JS engines will behave as failing with a TypeError. meaning the identifier is scoped outside the if block, but the function value is not automatically initialized, so it remains undefined. 
- Best practice would be, avoid using FiB entirely. 
- replace a function declaration with a function expression, like outside the block declares the function and, in the block, just override the definition or expression. 
