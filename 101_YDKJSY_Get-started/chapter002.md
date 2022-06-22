
- [Chapter 001](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/chapter001.md) - What is Javascript?
- Chapter 002 - Surveying JS
- [Chapter 003](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/chapter003.md) - Digging to the Roots of JS
- [Chapter 004](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/chapter004.md) - The Bigger Picture
- [Appendix A](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/AppendixA.md) -  Exploring Further stuff

# Chapter 2: Surveying JS 

## Each File is a Program 

  

- In JS, each standalone file is its own separate program. 

- The execution of the application allows these individual programs to cooperate and act as one. 

- One of the reasons for this perspective is primarily around error handling. 

- The only way multiple standalone JS files act as a single program is by sharing their state via the global scope. 

  

## Values 

- Come in two forms: Primitive and Object 

- Values are embedded in programs using literals: `greetings("Hello");` 

- For Primitive values: strings, numbers, Booleans, null and undefined. 

- JS also has symbol, behaves as a hidden unguessable value. not used often. 

- For Arrays and Objects 

    - Arrays are a special type of objects that's comprised of an ordered and numerically indexed list of data. They can hold any value type. 

    - Objects are an unordered, keyed collection of any various values, that you can access each element by a string location name "key" or "property" 

  

## Declaring and Using Variables 

- In JS programs, values can either appear as literal values, or they can be held in variables. 

- For let, allows a more limited access to the variable than a var (Block scoping). 

- Block scoping is very useful for limiting how widespread variable declarations are in our program. 

- For Const, it´s like let, but has an additional limitation. It must be given a value at the moment it's declared and cannot be re-assigned later. 

- It's recommended not use const with object values, those values can still be changed even though the variable can't be re-assigned. and stick to using primitive values. 

  

## Comparations 

- We must be aware of the nuanced differences between an equality comparation and an equivalence comparison. 

- Strict equality operator (===) 

    - checks both the value and the type of data and disallows any type of conversion/coercion 

    - In case of NaN, the operator lies and says that is not equal to another NaN, 

    - In case of -0, the operator lies and says it's equals to the regular 0 value 

    - Alternatively, you can use Number.isNaN or Object.is() 

    - When we consider Comparisions of object values, consider, JS does not define === as structural equality for object values, instead uses identity/reference equality for object values 

  

## Coercive Comparisions 

- Coercion means a value of only type being converted to its respective representation in another type, if this is viable. 

- Loose equality operator (==) 

    - both loose and strict operators consider the type of values being compared. and if the comparison is between the same value type, both do exactly the same thing, no difference whatsoever. 

    - If the values types being compared are different, they do differ, in that it allows coercion before the comparison. 

    - Allows type conversions first, and once the types have been converted to be the same on both sides, described as coercive equality. 

    - It prefers to handle primitive and numeric Comparisions. Trying to avoid cases such as "" == 0 or 0 == false. 

  

## Organization in JS 

- Two major patterns for organizing code (data and behavior) are used broadly across the JS ecosystem: classes and modules. 

- These patters are not mutually exclusive; many programs can and do use both. Other programs will stick with just one pattern, or even neither. 

### Classes 

- A "type" of custom data structure that includes both data an behaviors that operate on that data. 

- To get a concrete value that you can use in the program, a class must be instantiated one or more times. 

- This mechanism allows packaging data to be organized together with their behaviors. 

- Inheritance with a touch of polymorphism 

- Inheritance is a powerful tool for organizing data/behavior in separate logical units (classes), but allowing the child class to cooperate with the parent by accessing/using its behavior and data. 

- When both the inherited and overridden methods can have the same name and co-exist it is called polymorphism 

  

### Modules 

- This pattern has essentially the same goal as the class pattern, also like classes, modules can include or access the data a behavior of other modules for cooperation's sake. 

- But modules have some important differences, such as the syntax is entirely different. 

  

#### Classic Modules 

- Before ES6, modules were an important and common pattern that was leverage in countless JS programs. 

- It's an outer function that runs at least once, which returns an instance of the module with one or more functions exposed that can operate on the internal hidden data. 

- Another description for the classic modules will be "module factories", because a module of this form is just a function, and calling it produces and "instance" of the module. 

- With modules, the methods and data are accessed as identifier variables in scope, without any this. prefix. 

- Can create and return an object with any publicly exposed methods, and any data or other unreferenced methods remain private inside the factory function. 

- Other forms in JS Programs: AMD(Asynchronous Module Definition), UMD (Universal Module Definition) and CommonJS (Classic Node.js-style modules) 

  

#### ES Modules  

- Introduced in ES6, meant to serve the same purpose as the classic modules, but differs on the implementation approach. 

- For starters, the wrapping context is a file, ESMs are always file-based; one file, one module. 

- Not direct interaction with the Modules API, rather use of export, if something is defined but not exported in a module, it's stay hidden. 

- You don't "instantiate" an ES Module, you import it to use it as a single instance. 

             