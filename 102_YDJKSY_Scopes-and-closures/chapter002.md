
- [Chapter 001](chapter001.md) - What’s the Scope? 
- [Chapter 002](chapter002.md) - Illustrating Lexical Scope 
- [Chapter 003](chapter003.md) - The Scope Chain 
- [Chapter 004](chapter004.md) - Around the Global Scope 
- [Chapter 005](chapter005.md) - The (Not So) Secret Lifecycle of Variables 
- [Chapter 006](chapter006.md) - Limiting Scope Exposure 
- [Chapter 007](chapter007.md) - Using Closures 
- [Chapter 008](chapter008.md) - The Module Pattern 

# Chapter 2: Illustrating Lexical Scope 
- Scope bubbles are determined during compilation based where the functions/blocks of scope are written, the nesting inside each other and so on. 
- Each scope bubble is entirely contained within its parent scope bubble; a scope is never partially in two different outer scopes. 
- As the JS engine processes a program during compilation, and finds a declaration for a variable, it designates to who belongs. 
- References (non-declarations) to variables/identifiers are allowed if there's a matching declaration either in the current scope or any scope above/outside the current scope, but not with declarations from lower/nested scopes. 
- We can say that:  
    - Variables are declared in specific scopes,  
    - Any variables reference that appears in the scope where it was declared, or appears in any deeper nested scopes, will be labeled as the same scope unless an intervening scope shadows the variable declaration. 
    - the determination of the block scopes and what will contain happens during compilation, this information us used for variable lookups during code execution. 

## A conversation among friends 
- Let's meet the members of the JS engine that will have conversations as they process the program: 
    - Engine: responsible for start-to-finish compilation and execution of our JS Programs. 
    - Compiler: Handles all the dirty work of parsing and code-generation 
    - Scope Manager: Collects and maintains a lookup list of all the declared variables/identifiers and enforces a set of rules as to how these are accessible to the current execution code. 
- Let's focus on `var items = [ .. ]` declaration and initialization-assignment parts, JS treats these as two distinct operations: 
    - Compiler will handle during compilation, it will perform lexing to break it down into tokens which will be parsed into an AST tree.  
    - Steps that somehow will follow: 
        - Encounters the declaration, it will ask the Scope Manager if such variable already exists for the particular block, if so, would ignore this and continue. Otherwise, will produce code that at execution time asks the Scope Manager to create a new variable in the current scope. 
        - The code generated later at execution will initialize it to undefined and ask the Scope manager if there is such variable at the current scope, if not Engine keeps looking elsewhere, once engine finds a variable it assigns the references to it. 
    - Compiler also signals when it runs across functions or block scopes, so that a new scope block and manager can be instantiated. 

## Nested Scope 
- When it comes to functions and loops the block scope is gradually nested, being the top-level Global scope. 
- Scopes can be nested to any arbitrary depth as the program defines. 
- Each scope gets its own Scope Manager instance each time that scope is executed. 
- Each scope automatically has all its identifiers registered at the start of the scope being executed. (Hoisting) 
- At the beginning of a scope, if any identifier came from a function declaration, that variable is automatically initialized to its associated function reference. 
- If any identifier came from a var declaration (not counting let / const), it will automatically be initialized to undefined so that it can be used. 
- Otherwise, the variable remains uninitialized and cannot be used until its full declaration-and-initialization are executed. 
- One of the key aspects of lexical scope is that any time an identifiers reference cannot be found in the current scope, that process is repeated until and answer is found or there are no more scopes to consult. 

## Lookup Failures 
- When an Engine exhaust all lexically available scopes(outwards) and still cannot resolve the lookup of an identifier an error condition then exists. 
- Depending on the mode of the program (Strict-mode or not) and the role of the variable (target vs source), this error condition will be handled differently 

## Undefined Mess 
- If the variable is a source, an unresolved identifier lookup is considered an undeclared variable, which will result in a Reference Error. 
- If the variable is a target and the code at that moment is running in strict-mode, the variable is considered undeclared and similarly throws a Reference Error. 
- The error message for an undeclared variable condition, in most JS envs: `Reference Error: XYZ is not defined`, the phrase "not defined" seems almost identical to the word "undefined", but they are very different in JS. 
- "Not defined" means "not declared"/"undeclared" as in, a variable that has no matching formal declaration in any lexically available scope. 
- "undefined" means a variable was found(declared), but has no other value in it at the moment, so it defaults to the undefined value. 
- To add salt to the wound, type of operator returns the string "undefined" for both cases. 

## Global... What?! 
- If the variable is a target and strict-mode is not in effect, a confusing and surprising legacy behavior kicks in. 
- The global scope's Scope manager will create an accidental global variable to fulfill that target assignment. 
- Never rely on accidental global variables. 
