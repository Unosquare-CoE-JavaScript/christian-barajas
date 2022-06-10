# Appendix A: Exploring Further stuff 
## Values vs References 
- The way if a value is passed or references is entirely determined by the kind of value. 
- If you assign/pass a primitive value itself the values is always copied. 
- Now for references, two or more variables are pointing at the same value, such that modifying this shared value would be reflected by an access via any of those references 
- In JS, only object values such as Arrays, Objects, Functions, etc.; are treated as references. 
- In summary, JS chooses the value-copy vs reference-copy behavior based on the value type, Primitives are held by value, objects are held by reference.  
- There's no way to override this in JS, in either direction. 

## About Functions Forms 
- If a function has no name identifier between the function keyword and the () parameter list, is referred to as an "anonymous function expression". 
- Since ES6, performs a "name inference" on an anonymous function. 
- The name property of a function will reveal either its directly given name or its inferred name in the case of an anonymous function expression. 
- Even if a name is inferred, it's still an anonymous function, because the inferred name is a metadata string value, not an available identifier to refer to the function. 
- Reminder, arrow functions expressions are syntactically anonymous, they don't provide directly a name identifier. 

## Coercive Conditional Comparison 
- If and ternary statements, as well as the test clauses in while and for loops, all perform an implicit value comparison. strict or coercive validation. 

## Prototypal "Classes" 
- Another way of wiring up such prototype linkages served as the predecessor to class system is Prototypal classes. 
- All functions by default reference an empty object a a property named prototype. 
- This is not the functions' prototype (where the function is prototype linked to),  
- But rather the prototype object to link to when other objects are created by calling the function with new. 
- This "prototypal class" pattern is now strongly discouraged, in favor of using ES6's classes. 
- Under the covers, the same prototype linkage is wired up, but this class syntax fits the class-oriented design pattern much more cleanly than “prototypal classes”. 

 