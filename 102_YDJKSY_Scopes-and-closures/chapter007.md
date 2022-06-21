
- [Chapter 001](./chapter001.md) - What’s the Scope? 
- [Chapter 002](./chapter002.md) - Illustrating Lexical Scope 
- [Chapter 003](./chapter003.md) - The Scope Chain 
- [Chapter 004](./chapter004.md) - Around the Global Scope 
- [Chapter 005](./chapter005.md) - The (Not So) Secret Lifecycle of Variables 
- [Chapter 006](./chapter006.md) - Limiting Scope Exposure 
- [Chapter 007](./chapter007.md) - Using Closures 
- [Chapter 008](./chapter008.md) - The Module Pattern 

# Chapter 7: Using Closures 
- For variables we need to use over time, instead of placing them in larger outer scopes, we can encapsulate them but still preserve access from inside functions, for broader use. Functions remember these referenced scoped variables via closure. 
- It underlies major programming paradigms, including Functional Program, modules and even a bit of class-oriented design. 

## See the closure 
- Closure is originally a mathematical concept from lambda calculus. 
- Closure is a behavior of functions and only functions, if you aren't dealing with a function, closure does not apply. 
- An object cannot have closure, nor does a class have closure (though its functions/methods might). Only functions have closure. 
- For closure to be observed, a function must be invoked, and specifically it must be invoked in a different branch of the scope chain from where it was originally defined. 
- A function executing in the same scope it was defined would not exhibit any observably different behavior with or without closure being possible. 

## Live link, not a snapshot 
- Closure is actually a live link, preserving access to the full variable itself. We're not limited to merely reading a value, the closed-over variable can be updated as well. 
- Though the enclosing scope of a closure is typically from a function, that's not actually required, there only needs to be an inner function present inside an outer scope. 
- It's common to mistake closure as value-oriented instead of variable-oriented, developers sometimes get tripped up trying to use closure to snapshot-preserve a value as static. 
- Something about the structure of a for - loop can trick us into thinking that each iteration gets its own new i variable. but it's not, a single variable can only ever hold one value at any given moment, a nice trick will be using let, will create one for each loop. 

## Observable definition  
- We're now ready to define closure:  
    - Closure is observed when a function uses variable(s) from outer scope(s) even while running in a scope where those variable(s) wouldn't be accessible. 
- The key parts of this definition are:  
    - Must be a function involved 
    - Must reference at least one variable from an outer scope  
    - Must be invoked in a different branch of the scope chain from the variable(s) 

## The Closure lifecycle and Garbage Collection (GC) 
- Since closure is inherently tied to a function instance, its closure over a variable lasts as long as there is still a reference to that function. 
- This has an important impact on building efficient and performant programs.  
- Closure can unexpectedly prevent the GC of a variable that you're otherwise done with, which leads to run-away memory usage over time. 

## Per variable or Per Scope? 
- Conceptually, closure is per variable rather than per scope, Ajax callbacks, event handlers, and all other forms of function closures are typically assumed to close over only what they explicitly reference. But it's not. 
- Many modern JS engines do apply an optimization that removes any variables from a closure scope that aren't explicitly referenced. 

## Closer to Closure 
- Found two models for mentally tackling closure 
    - **Observational**: closure is a function instance remembering its other variables even as that function is passed to and **invoked in** other scopes. 
    - **Implementational**: closure is a function instance and its scope environment preserved in-place while any references to it are passed around and **invoked from** other scopes. 
- Summarizing the benefits to our programs:  
    - Closure can improve efficiency by allowing a function instance to remember previously determined information instead of having to compute it each time. 
    - Closure can improve code readability, bounding scope-exposure by encapsulating variable(s) inside function instances, while still making sure the information in those variables is accessible for future use. The resultant narrower, more specialized function instances are cleaner to interact with, since the preserved information doesn't need to be passed in every invocation. 

     

 