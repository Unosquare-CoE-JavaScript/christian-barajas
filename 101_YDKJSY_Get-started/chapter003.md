
- [Chapter 001](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/chapter001.md) - What is Javascript?
- [Chapter 002](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/chapter002.md) - Surveying JS
- Chapter 003 - Digging to the Roots of JS
- [Chapter 004](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/chapter004.md) - The Bigger Picture
- [Appendix A](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/AppendixA.md) -  Exploring Further stuff

# Chapter 3: Digging to the Roots of JS 

## Iteration 
- A pattern that has been around for decades, and suggests a "standardized" approach to consuming data from a source one chunk at a time. 
- Defines a data structure called an "iterator" that has a reference to an underlying data source, which exposes a method like next().  
- Calling next() returns the next piece of data. 
- ES6 Standardized a specific protocol for the iterator pattern directly in the language. The protocol defines a next() method whose return is an object called an iterator result. The object has value and done properties. 

## Consuming Iterators 
- With the ES6 iteration protocol it's workable to consume a data source one value at a time checking after each next() call for done to be true to stop the iteration. It's a bit manual, so ES6 included several syntaxes and APIs for consumption. 
- One mechanism is the for .. of loop. 
- Another mechanism is the ... operator, that has two symmetrical forms, as spread or rest/gather. 
- The spread form is an iterator-consumer. 
- Internally it follows the iterator-consumption protocol to retrieve all available values from an iterator and place them into the receiving context. 

## Iterables 
- The iterator-consumption protocol is technically defined for consuming iterables; The protocol automatically creates an iterator instance from an iterable, and consumes just that iterator instance to its completion. 
- This includes strings, arrays, maps, sets and others. 
- For maps, that use objects as keys, associating a value, have a different default iteration that are entries. An entry is a tuple (2-element array) including both a key and a value. 
- For the most part, all built-in iterables in JS have three iterator forms available: keys-only(keys()), values-only(values()) and entries(entries()).

## Closure 
- When a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope.
- It's part of the nature of a function and to observe a closure, yo must execute a function in a different scope than where that function was originally defined. 
- They are a direct link and preservation of the variable itself.
- That means closure can actually observe or make updates to these variables over time. 

## `this` keyword 
- When a function is defined, it is attached to its enclosing scope via closure. Scope is the set of rules that controls how references to variables are resolved. 
-  But functions also have another characteristic besides their scope that influences what they can access. This characteristic is best described as an execution context, and it's exposed to the function via the `this` keyword. 
- Scope is static and contains a fixed set of variables available at the moment and location you defined a function, but a function's execution context is dynamic entirely dependent on how it is called. 
- `this` is not a fixed characteristic but rather a dynamic characteristic that's determined each time the function is called. 
- Another way to invoke a function is with the call () method, which takes an object to use for setting the this reference for the function call. 
- A function that closes over a scope can never reference a different scope or set of variables.  
- But a function that has dynamic `this` context awareness can be quite helpful for certain task. 

## Prototypes 
- Where this is a characteristic of function execution, a prototype is a characteristic of an object, and specifically resolution of a property access. 
- Think about a prototype as a linkage between two objects; the linkage is hidden behind the scenes, though there are ways to expose and observe it. This prototype linkage occurs when an object is created; it’s linked to another object that already exists. 
- A series of objects linked together via prototypes is called the "prototype chain".
- The purpose of this prototype linkage is so that accesses against B for properties/methos that B does not have are delegated to A to handle. 

## Object Linkage 
- To define an object prototype linkage, you can create the object using the Object.create() utility. 
- The first argument to Object.create() specifies an object to link the newly created object to, and then returns the newly created and linked object. 
- Object.create(null) creates an object that is not prototype linked anywhere, so it’s purely just a standalone object. 
- Shadowing is when a property of the same name on a linked object has a different value than the original object. 

 ## `this` Revisited 
- Indeed, one of the main reasons `this` supports dynamic context based on how the function is called is so that method calls on objects which delegate through the prototype chain still maintain the expected this. 
