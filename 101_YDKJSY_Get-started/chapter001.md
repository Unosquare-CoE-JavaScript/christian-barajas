# Chapter 1: What is Javascript? 

- JS is a broad and sophisticated language, with many features and capabilities. 

- Original planned to called Mocha, ended up calling it JS to appeal Java Devs. 

- Oracle has rights to the full name, so using abbreviations such as JS works but you could call it ECMAScript(ES2019) designated by TC39. 

     

## About Environments 

- JS can be run in different environments such as browsers, servers, robots even light bulbs. 

- It's still the one language that rules the web. 

- Often TC39 will backtrack a simply choose to conform the specification to the reality of the web. 

- Different environments add APIs into the global scope of their JS program that give environment specific capabilities. 

- Most of the cross-browser differences complains are actually due to differences in how those environment behaviors works. 

 
 

## The many faces of JS 

- We can call them paradigms, that guide and mold how they approach problems and solutions. 

 
 

    > Procedural style organizes code in a top-down. linear progression through a pre-determinate set of operations, usually collected together in related units called procedures. 

    > Object Oriented style organizes code by collecting logic a data together into units called classes 

    > Function Programing organizes code into functions (pure computations as opposed to procedures), and the adaptations of those functions as values. 

 
 

- JS is most definitely a multi paradigm language. 

 
 

## Compatibility 

### Backwards compatibility 

- Once something is accepted as valid in JS, there will not be a future change to the language that causes that code to become invalid. 

 
 

### Forwards compatibility 

- Including a new addition to the language in a program would not cause that program to break if it were run in an older JS engine. 

 
 

### Transpiling 

- For new and incompatible syntax, the solution is transpiling, contrived and community-invented term to describe using a tool to convert the source code of a program from one form to another. 

- Typically to resolve problems related to syntax using a transpiler such as Babeljs 

 
 

### Polyfills aka Shims 

- When a missing API Method that was recently added, a solution is to provide the definition that stands in and acts as if the older environment had already had it natively. 

- Transpilers detect which polyfills your code needs and provide them automatically for you. also, you can include or define them explicitly 

 
 

## Use Strictly 

- For ES5, JS added strict mode as an opt-in mechanism for encouraging better JS programs. 

- Sadly, it's still optional. 

 
 

         

 
 

 