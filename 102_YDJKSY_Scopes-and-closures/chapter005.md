
- [Chapter 001](./chapter001.md) - What’s the Scope? 
- [Chapter 002](./chapter002.md) - Illustrating Lexical Scope 
- [Chapter 003](./chapter003.md) - The Scope Chain 
- [Chapter 004](./chapter004.md) - Around the Global Scope 
- [Chapter 005](./chapter005.md) - The (Not So) Secret Lifecycle of Variables 
- [Chapter 006](./chapter006.md) - Limiting Scope Exposure 
- [Chapter 007](./chapter007.md) - Using Closures 
- [Chapter 008](./chapter008.md) - The Module Pattern 

# Chapter 5: The (Not So) Secret Lifecycle of Variables 
- JS's particular flavor of lexical scope is rich with nuance in how and when variables come into existence and become available to the program. 

## When can I use a variable?  
- The term most commonly used for a variable being visible from the beginning of its enclosing scope, even though its declaration may appear further down in the scope, is called hoisting. 
- When the function declaration's name identifier is registered at the top of its scope, it's additionally auto-initialized to that function's reference. it is a special characteristic of form function declaration called function hoisting. That's why the function can be called throughout the entire scope. 
- One key detail is that both function hosting and “var” variable hoisting attach their name identifiers to the nearest enclosing function scope or global scope, not a block scope. 

## Hoisting: Declaration vs Expression 
- Function hoisting only applies to formal function declarations, not to function expression assignments. 
- Only functions can be invoked, so attempting to invoke some non-function value results in an error. 
- In addition to being hoisted, variables declared with var are also automatically initialized to undefined at the beginning of their scope. Once initialized, they're available to be used throughout the whole scope. 
- A function declaration is hoisted and initialized to its function value (Function hoisting). 
- A var variable is also hosted, and then auto-initialized to undefined. Any subsequent function expression assignment to that variable don't happen until that assignment is processed during runtime execution. 

## Hoisting: Yet another section 
- A typical assertion of what hoisting means: lifting any identifiers all the way to the top of a scope. 
- Should be used to refer to the compile-time operation of generation runtime instructions for the automatic registration of a variable at the beginning of a scope. 

## Re-declaration? 
- Since hoisting is actually about registering a variable(var) at the beginning of a scope, there's nothing to be done in the middle of the scope where the original program actually had the second statement. 
- It's just a no-operation, a pointless statement. 
- The only way to "re-declare" a variable is to use var for all of its declarations. Using it with "let" will go through a Syntax Error. 
- The reason for the error is not technical per se, as var "re-declaration" has always been allowed. It's more of a social engineering issue(?), "Re-declaration" of variables is seen by some, including many on the TC39 body, as a bad habit. 
- So when ES6 introduced let, they decided to prevent "re-declaration" with an error. 

## Constants? 
- The const keyword is more constrained than let. const cannot be repeated with the same identifier in the same scope 
- The const keyword requires a variable to be initialized, so omitting an assignment from the declaration results in a Syntax Error. 
- const declaration creates variables that cannot be re-assigned. 
- The error thrown when re-assigning is a Type Error, subtle distinction here. 
- Syntax errors represent faults in the program that spot it from even starting execution 
- Type errors represent faults that arise during program execution. 
- TC39 essentially felt that let "re-declaration" should be disallowed as well, for consistency. 

## Loops 
- All the rules of scope (including "re-declaration" of let created variables) are applied per scope instance. 
- Each loop iteration is its own new scope instance. 
- But what about i? Is it being "redeclared"? It may seem that it is in the outer scope, but it's not. 
- It's in the scope of the for-loop body, it is declared exactly once per scope instance, No re-declaration here. 
- Something with `for ... in` and `for ... of `loops: the declared variable is treated as inside the loop body, and thus is handled per iteration. 
- Same behavior is show by the keyword const within the scope of the loop iteration, safe from "re-declaration". 
- `for ... in` and `for ... of `loops are fine with using const. But not with the general for-loop. avoid mixing these two. 

## Uninitialized variables (aka, TDZ) 
- With var declarations, the variable is "hoisted" to the top of its scope, but it's also automatically initialized to the undefined value, so that variable can be used throughout the entire scope. 
- However, let and const declarations are not quite the same. You'll get a Reference Error if you call the let variable before its declaration. 
- For let/const, the only way to do so is with an assignment attached to a declaration statement. 
- The compiler is also adding an instruction in the middle of the program, at the point where the variable was declared, to handle that declaration's auto-initialization. 
- We cannot use the variable at any point prior to that initialization occurring. It goes for both const/let. 
- The term coined by TC39 to refer to this period of time from the entering of a scope to where the auto-initialization of the variable occurs is: Temporal Dead Zone (TDZ). 
- The TDZ is the time window where a variable exists but is still uninitialized, and therefore cannot be accessed in any way. - Only the execution of the instructions left by Compiler at the point of the original declaration can do that initialization. 
- After that moment, the TDZ is done, and the variable is free to be used for the rest of the scope. 
- A var also has technically has a TDZ, but it's zero in length, thus unobservable. Only let and cost have an observable TDZ. - Even though there is this TDZ, both let and const do hoist. The difference is that the declarations do not automatically initialize at the beginning of the scope. 
- They defer the auto-initialization of their variables until the moment in the code's sequencing where the original declaration appeared. 
- Always put your let and const declaration at the top of any scope. 

## Finally initialized 
- Hosting is generally cited as an explicit mechanism of the JS engine, but it's really more a metaphor to describe the various ways JS handle variable declarations during compilation. 

 
 

 