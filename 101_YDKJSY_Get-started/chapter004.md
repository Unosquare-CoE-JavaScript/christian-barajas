
- [Chapter 001](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/chapter001.md) - What is Javascript?
- [Chapter 002](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/chapter002.md) - Surveying JS
- [Chapter 003](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/chapter003.md) - Digging to the Roots of JS
- Chapter 004 - The Bigger Picture
- [Appendix A](https://github.com/Unosquare-CoE-JavaScript/christian-barajas/blob/YDKJSY/101_YDKJSY_Get-started/AppendixA.md) -  Exploring Further stuff

# Chapter 4: The Bigger Picture 

## Pillar 1: Scope and closure 
- The organization of variables into units of scope (functions, blocks) is one of the most foundational characteristics of any language. 
- The scope model of a language is like the rules that help you determine which element go in which matching-element scope. 
- Scopes nests inside each other, and for any given expression or statement, only variables at the level of scope nesting, or in higher/outer scopes, are accessible, variables from lower/inner scopes are hidden and inaccessible. which is called lexical scope. 
- The scope unit boundaries and how variables are organized in them is determined at the time the program is parsed. 
- In other words, it's an author-time decision; where you locate a function/scope in the program determines what the scope structure of that part of the program will be. 
- JS is Lexically scope, because of two particular characteristics: 
    - The first one `hoisting` when all variables declared anywhere in a scope are treated as if they're declared at the beginning of the scope.
    - The other is that var-declared variables are function scoped, even if they appear inside a block. 
- let/const declarations have a peculiar error behavior called the "Temporal Dead Zone" (TDZ) which results in observable but unusable variables. 
- Closure is a natural result of lexical scope when the language has functions as first-class values.
- When a function makes references to variables from an outer scope and that function is passed around as a value and executed in other scopes, it maintains access to its original scope variables; this is closure. 

## Pillar 2: Prototypes 
- JS is one of very few languages where you have the option to create objects directly and explicitly, without first defining their structure in a class. 
- Before people used to implement the class design pattern on top of prototypes, so called "prototypal inheritance", a then ES6 brought the class keyword, and doubled down towards Object Oriented as a class style programming. 
- Another approach is to simply embrace objects as objects, forget classes altogether an let objects cooperate through the prototype chain. This is called behavior delegation. 
- In the opinion of the Autor believes that is more powerful than class inheritance as a means for organizing behavior and data. 

## Pillar 3: types and Coercion 
- JS Developers should learn more about types, and so should learn more about how JS manages type conversions. 
- Type-aware tooling such as Typescript can help developers assuming they have gained and used this basic knowledge in the first place. 
- And all this pillar is to promote the other other book 4. 

 