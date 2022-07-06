# The Typescript Jumpstart

## Section 001 and 002 - Introduction & The Typescript Type System
- Typescript type system is at the same time:
    - Very simular to currently statically typed type systems like Java, C# or Scala
    - At the same time fundamentally different than those type systems, and designed for maximum compatibility with existing dynamically typed Javascript codebases.

### Key Concept 001 - Type inference is Always on
- An example with a defined empty object-first called user and then tried to assign it the name property later. 
- So the user variable was automatically assigned a type even if we didn't add any explicit type annotation.
- user variable will have an inferred type of `type: {}`
- You might have heard of the type Any an the compiler property noImplicitAny. We can see that the Any type is not related to this situation, because inferred type is not Any.
- Using the interface keyword for defining a custom object type, the user type. In typescript the interface keyword is not just an object oriented concept, it has been generalized to include objects also:
    - In Typescript, a custom object type can also implement an Interface

### Key concept 002 - Types are defined by the collection of their properties
- In the current version of Typescript, the type sustem is said to be based on structural subtyping.
- It means that what defines a type is not so much its name (Like nominal type systems that are common in other languages). Instead, what defines a type is a collection of specific properties and their types.
- And, IF a variable has no type annotation associated to it, Typescript will look into its collection of properties and infer a type on the fly which contains that particular set of properties.
 
 ### Key Concept 3 - Type compatibility depends on the list of properties of a type
 - What defines a type in Typescript is its list of properties: 
    - So that same list of properties and their types is also what defines if two types are compatible
- Lets say that we have two interfaces, first one called **User**, with this values `{name: string, createdAt: string}`, and the second called **Lesson**, with values `{name: string}`. If we try to assign a variable type **User** to a **Lesson** it will be valid, because  all the mandatory properties needed by **User** are there. But if we reverse the assignation (**Lesson**  to a **User**) because the two types are not compatible, and not because the two types are different.
- By designating the type Any to a variable, we can assign it any property we need, that's how Any works.
- Another thing about the Any type is that it can be take a variable and also assign it to anything.
- Annotating a variable with type Any is essentially telling the compiler to bypass the type system, and in general not check type compatibility for this variable.
- Another wat of fixing the previous example is to mark variables as optional `{name: string, createdAt?: string}`. 
- Everything is based on type inference as much as possible, although there are places like function arguments where we need to add type annotation if setting **noImplicityAny** to true, because there is no way for the compiler to infer those types.
- Another key feature is that in Typescript the type annotations are optional, and if we want to work with Javascript Libraries that where not written in Typescript, we will need to bring our own Type Definitions.

## Section 003 - Typescript Type Definitions
- In Typescript 2 and beyond, when using a Javascript library there are now essentially 4 scenarios in what concerns type definitions:
    - no type definitions of any kind are available.
    - type definitions are available and shipped together with the compiler itself.
    - A library does not ship with type definitions, but they can be installed separately.
    - A library ships with its own type definition built-in.
- You can setup a Typescript compiler config file like: 
    ```sh
        ./node_modules/.bin/tsc --init
    ```
- You don't have to install typescript globally, and its probably better to avoid version confusions between projects, command line and IDE 
- If we have a CommonJS module available inside node_modules that has no type definitions available, we will still be able to impor it and use it.
- For a library like uuid, is being imported and implicitly assigned to the Any type.
- Any Type allows up to essentially bypass the type-safety of the Typescript type system: 
    - We can use Any as a function and call it using parantheses like we did with uuid.
    - A variable of type Any is assumed to potentially have property, like a plain JS Object.
    - We can also take a variable of Type Any and assign it to essentially anything else (without getting an error)
- Using Type Any, we won't have reliable auto-completion or refactoring.
- There are more and more modules each day that get shipped in npm (Inside the node module) with their own type-definitions already built-in.
- If we use libraries that provide their own built-in types, we can have aout-completion, refactoring and fin isage almost everywhere in our program.
- The Biggest exception for this will be function parameters, where there is no way for the compiler to infer what is the type of a function parameter.
- If you want to leverage Typescript type inference to is maximum an d have it aout-detect the type of the largets amount possible of variables, the best wat is to go to the tsconfig.json and set the noImplicitAny property to true.
- The Node runtime does not ship with its own type definitions, so we need to impor those types separately (@types/node)
- This @types scoped package is where we can find a ton of useful type definitions, all the content Defintively Typed is now available under the @types scoped package.
- Now simply use npm and the Typescript compiler will implicitly take any type definitions installed inside the node_modules/@types folder and include it during compilation transparently.
- The @types scope package contains type definitions for a lot of libraries, make sure of two things first:
    - Check if the package you are using already has types built-in, and if so prefer those
    - Check if type definitions are already shipped with the compiler. 
- Some of those types might not be approriate anymore in certain situations.
- Not all type definitions leverage the type system to its maximum extend.
