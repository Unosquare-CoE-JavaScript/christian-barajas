
- [Chapter 001](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/102_YDJKSY_Scopes-and-closures/chapter001.md) - What’s the Scope? 
- [Chapter 002](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/102_YDJKSY_Scopes-and-closures/chapter002.md) - Illustrating Lexical Scope 
- [Chapter 003](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/102_YDJKSY_Scopes-and-closures/chapter003.md) - The Scope Chain 
- [Chapter 004](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/102_YDJKSY_Scopes-and-closures/chapter004.md) - Around the Global Scope 
- [Chapter 005](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/102_YDJKSY_Scopes-and-closures/chapter004.md) - The (Not So) Secret Lifecycle of Variables 
- [Chapter 006](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/102_YDJKSY_Scopes-and-closures/chapter004.md) - Limiting Scope Exposure 
- [Chapter 007](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/102_YDJKSY_Scopes-and-closures/chapter004.md) - Using Closures 
- [Chapter 008](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/102_YDJKSY_Scopes-and-closures/chapter004.md) - The Module Pattern 

# Chapter 3: The Scope Chain 
- The connections between scopes that are nested within other scopes is called the scope chain, which determines that path along which variables can be accessed. 
- The chain is directed, meaning the lookup moves upward/outward only. 

## "Lookup" is (mostly) conceptual 
- Engine doesn't need to look up through a bunch of scopes to figure out which scope block a variable comes from. 
- Avoiding the need for a runtime lookup is a key optimization benefit of lexical scope. 
- Any reference to a variable that's initially undeclared is left pending during that file's compilation; this will not be determinated until other relevant file(s) have been compiled and the application runtime commences. 
- That deferred lookup will eventually resolve to whichever scope the variable is found. 

## Shadowing 
- A single scope cannot have two or more variables with the same name; such multiple references would be assumed as just one variable. 
- With "lookup", we asserted that it starts with the current scope and works its way outward/upward, stopping as soon as a matching variable is found, having two variables of same name in different scopes, it will take the first found and ignore others. This is a key aspect of lexical scope behavior called shadowing. 
- One direct impact is that from that scope inward/downward it's now impossible for any variable reference to have the value of the shadowed variable. 

## Global unshadowing trick  
- This method is far from good practice. 
- It is possible to access a global variable from a scope where that variable has been shadowed but no through a typical lexical identifier reference. 
- In the global scope, var and function declarations also expose themselves as properties on the global object, essentially an object representation of the global scope. 
- For a Browser environment, the object is called window, you can think of window.variable as a getter/setter that accesses the actual variable. 
- The little "trick" only works for accessing a global scope variable (not a shadowed variable form a nested scope), and even then, only one that declared with var or function. 

## Copying is not accessing 
- adding/copying the variable that is to be shadowed to an object, that doesn't mean we're accessing the original parameter. 
- Copying the value of the variable into another container (a property of the same), shadowing no longer applies. But that doesn't mean we're accessing the original value, so we cannot reassign the original parameter and expect it to change. 
- Mutating the contents of the object value via a reference copy is not the same thing as lexically accessing the variable itself. 

## Illegal Shadowing 
- Not all combinations of declaration shadowing are allowed. 
- let can shadow var, but var cannot shadow let. 
- The syntax error generated has a description indicating that the variable has already been defined. 
- The real reason it's raised as a Syntax Error is because the var (later declared from let) is basically trying to "cross the boundary" of the let declaration of the same name, which is not allowed. 
- That boundary-crossing prohibition effectively stops at each function boundary, so if you add for example a promise chain, this will raise no exception. 

## Function name scope 
- A function declaration like this `function getSingleItem() {` will create an identifier in the enclosing scope named "getSingleItem". The same is true for this `var getSingleItem = function () { ... } `. 
- But since it's a function expression (A function definition used as value instead of a standalone declaration) the function itself will not "hoist". 
- One major difference between function declarations and function expressions is what happens to the name identifier of the function. Take for example the next `var getSingleItem = function fromArray () { .. }` 
    - The variable getSingleItem ends up in the outer scope and the name identifier ends up in the outer/enclosing scope. 
    - But "fromArray" is declared as an identifier and only as a read-only inside the function itself. 
- A function without a name identifier is referred to as an "Anonymous function expression", have no name identifier that affects either scope. 

## What about arrow functions 
- From ES6, arrow functions were added, and these are lexically anonymous, meaning they have no directly related identifier that references the function. 
- Have the same lexical scope rules as normal function does. 

## Backing the chain up 
- The positioning of scopes nested inside one another creates a natural scope hierarchy throughout the program called the scope chain. 
- This scope chain controls variable access, directionally oriented upward and outward. 
- When a variable name is repeated at different levels of the scope chain, shadowing occurs, which prevents access to the outer variable from that point inward. 
