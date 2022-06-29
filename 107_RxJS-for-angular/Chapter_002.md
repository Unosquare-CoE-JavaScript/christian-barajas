 
 


# Chapter 002: RxJS 7 - The Major Features 
- RxJS was released on April 29, 2021. This version came with a lot of improvements. 

## Exploring the bundle size improvements 
- A bundle is an output of a process that merges all of these files into a few (if not single) files in the most optimized way possible. 
- The RxJS core team worked on reducing the bundle size of the library in version 7; they did a lot of refactoring to optimize the code and, consequently, the bundle size. 
- The are a lot of tools that can help you measure and analyze your bundles, one mentioned in this book is **source map explorer**. 
- It shows you an interactive tree map to help you determine where all the code is coming from, in addition to the size of the bundle. 

## Reviewing the TypeScript typing improvements 
- RxJS 7 requires TypeScript 4.2. 
- RxJS core team, improved the package types while making them stricter, more accurate, and more flexible. 
- Providing better types can prevent run-time problems and any mismatched type confusion ahead of time. 
- One improvement was on RxJS 6 you can create a subject of a specific type and call `next()` without passing arguments: while, in RxJS 7, the same instruction will cause a compilation error because the subject's specified type has not been respected. 

## Understanding the toPromise() deprecation. 
- This operator will be deleted permanently after the release of RxJS 8. 
- The major differences between observables and promises is that observables can produce none or more than one value, while promises only produce one value when resolved successfully. 
- Based on the last statement, it will cause that you cannot differentiate between the case where no value was emitted before completion and where an undefined value was emitted last. 
- In favor of this operator use instead `firstValueFrom()` and `lastValueFrom()`. 
    - The `firstValueFrom()`, converts an observable into a promise by subscribing to the observable, and returns the first value emitted by this observable. It will reject with an `EmptyError` error if the observable completes with no values. 
    - The `lastValueFrom()`, similar to the previous operator, only returns the last value emitted by an observable after its completion. 
- `Empty errors`: both operators will throw an error with a default message of no elements in sequence. 
- If you want to customize this behavior, you can use the `defaultValue` parameter, it will be used to resolve a promise when the observable completes without emitting a value. 
    `const value = lastValueFrom(source$, {defaultValue: 'DEFAULT'})` 
- The `lastValueFrom()` is recommended when you're sure an observable will complete. 
- The `firstValueFrom()` is recommended when you're sure an observable will emit at least one value or complete. 

# Highlighting API consistency improvements 
- RxJS 7 also ships with a fix of some weird behavior in the library. 
- The concat operator was deprecated in RxJS 7 and replaced with `concatWith`. It will be removed in the next version. 
