
- [Chapter 001](./chapter001.md) - What’s the Scope? 
- [Chapter 002](./chapter002.md) - Illustrating Lexical Scope 
- [Chapter 003](./chapter003.md) - The Scope Chain 
- [Chapter 004](./chapter004.md) - Around the Global Scope 
- [Chapter 005](./chapter005.md) - The (Not So) Secret Lifecycle of Variables 
- [Chapter 006](./chapter006.md) - Limiting Scope Exposure 
- [Chapter 007](./chapter007.md) - Using Closures 
- [Chapter 008](./chapter008.md) - The Module Pattern 

# Chapter 8: The Module Pattern 
- Modules are inherently built from what we've already covered: the payoff for lexical scope and closure. 

## Encapsulation and least exposure (POLE) 
- The goal of encapsulation is the bundling or co-location of information (data) and behavior (functions) that together serve a common purpose. 
- The spirit of encapsulation can be realized in something as simple as using separate files to hold bits of the overall program with common purpose. 
- Another key goal is the control of visibility of certain aspects of the encapsulated data and functionality. 
- The idea is to group alike program bits together, and selectively limit programmatic access to the parts we consider private details. What's not considered private is then marked as public, accessible to the whole program. 

## What is a module? 
- A module is a collection of related data and functions (often referred to as methods in this context), characterized by a division between hidden private details and publicly accessible detail, usually called the "public API". 
- A module is also stateful: it maintains some information over time, along with functionality to access and update that information. 

## Namespaces (Stateless grouping) 
- If you group a set of related functions together, without data, then you don't really have the expected encapsulation a module implies. The best term for this grouping of stateless functions is a namespace. 
- functionality such as state-independent functions. Also gathering functionality together is generally good practice. but that doesn't make this a module. 

## Data Structures (Stateful grouping) 
- Even if you bundle data and stateful grouping together, if you're not limiting the visibility of any of it then you're stopping short of the POLE aspect of encapsulation; it's not particularly helpful to label that a module. 
- It does have the data-and-functionality aspect of encapsulation, but no the visibility-control aspect. 

## Modules (stateful access control) 
- We not only need grouping and state, but also access control through visibility (private vs public). 
- A typical module will receive this data from an outside source then injected into the instance through methods. 
- A classic module instance is created by an IIFE function being executed. This IIFE returns an object that has property on it referencing the inner function. 
- By virtue of how lexical scope works, defining variables and functions inside your outer module definition function makes everything by default private. Only properties added to the public API object returned from the function will be exported for external public use. 
- Th use of an IIFE implies that our program only ever needs a single central instance of the module commonly referred to as a "singleton". 

## Module Factory (Multiple Instances) 
- If we want to define a module that supported multiple instances, rather than specifying a module as an IIFE, we just define it as a normal standalone function, which is commonly referred to in this context as a "module factory" function. Calling the module factory, produce an instance of the module. 
- This module instance implies a new instance of the inner scope and thus a new closure that holds data. 

## Classic Module Definition 
- Clarifying what makes a classic module 
    - There must be an outer scope, typically from a module factored function running at least once. 
    - The module's inner scope must have at least one piece of hidden information that represents the state for the module. 
    - The module must return on its public API a reference to at least one function that has closure over the hidden module state. 

## Node CommonJS Modules 
- Unlike the classic module format, CommonJS modules are file-based, one module per file. 
- Everything on the file is not in the global scope, by default it is private to the module. 
- To expose something on the public API of a CommonJS module, you add a property to the empty object provided as `module.exports`. 
- If you want to assign multiple exports at once, using object literal style definition, you can do this instead: 
    ```sh 
        Object.assign(module.exports, { /** WHAT TO EXPORT **/ }) 
    ``` 
- It's performing a shallow copy of all those properties onto the existing `module.exports` object. Instead of replacing it. 
- To include another module instance into your module/program, use Node's `require(...)`method 
- CommonJs modules behave as singleton instances, similar to the IIFE module definition style presented before. 
- Similar to the classic module format, the publicly exported methods of a CommonJs module's API hold closures over the internal module details. 

## Modern ES Modules (ESM) 
- The ESM format shares several similarities with the CommonJS format. ESM is file-based, and module instances are singletons, with everything private by default. 
- One notable difference is that ESM files are assumed to be strict-mode, without needing a "use strict" pragma at the top. 
- There's no way to define an ESM as non-strict-mode. 
- Instead of module.exports in CommonJS, ESM uses an export keyword to expose something on the public API of the module. 
- The import keyword replaces the require(...) statement. 
- ESM offers a fair bit of variation on how to export statements: 
    - `export function getSingleItem(itemId) { ... }`, this form is still a function declaration that also happens to be exported. an the getSingleItem identifier is function hoisted. 
    - `export default function getSingleItem(itemId) { ... }`, so-called "default export. In essence it is shorthand for consumers for the module when they import, giving them a terser syntax when they only need this single default API member. 
- Non-default exports are referred to as "named exports". 

## Exit Scope 
- Bye! 

 