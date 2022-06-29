# Chapter 010: Sharing Data between Components
- Sharing data between components is a very common use case in web applications. Angular provides many approaches to communicate between parent and child components, such as the popular @Input and @Output decorator patterns.
- The @Input() decorator allows a parent component to update data in a child component.
- The @Output() decorator, on the other hand, allows the child component to send data to a parent component. 

## Exploring the reactive pattern to share data
- Angular services are powerful and efficient for creating common references for sharing both data and business logic between components.
- We will combine Angular services with Observables, more specifically BehaviorSubject, to create stateful, reactive services that will allow us to synchronize the state efficiently across an entire application.

## Reactive Pattern steps
1. Create a shared service.
2. Define BehaviorSubject.
3. Defune a public Observable.
4. Create the update method.
5. Call the update method.
6. Inject the service and subscribe to the Observable.

## Some comments related to exposing a Subject in the Shared Service
- A public observable that is extracted from a Subjectr() to handle data as an observable.
- We used the asObservable() method available in the Subject type. 
- The emissions of this observable are consumed in read-only mode. External processes can only consume its emissions.

## Highlighting other ways for sharing data
- The previous pattern for sharing data has many benefits:
    - Improves the sharing of data between unrelated components
    - Manages mutability risk
    - Makes communication between components easier
- But for big applications where there are a lot of user interactions and multiple data sources, managing states in services can become complicated.
- We can use a state management library to manage the state of our application, which is the main goal of state management libraries.
- All the state management libraries have one thing in common – they are built on top of RxJS Observables and the state is stored in BehaviorSubject.

# Chapter 011: Bulk Operations
- Bulk operations are tasks performed on a large scale, such as uploading many files, deleting many items in one shot, and assigning recipes to the same category on a mass scale.
- In the background, there are two possible behaviors, whether running one network request for all the tasks or running parallel network requests for every task.

## Learning about the reactive pattern for bulk operations

- we only care about the final result (the last emission), whether the file is uploaded successfully, or whether something wrong happens and the upload fails.

## The forkjoin operator
- The forkJoin operator falls under the category of combination operators.
- It takes a list of streams as input, waits for the streams to complete, and then combines the last values they emitted in one array and returns it. The order of the values in the array is the same as the order of the input Observables.
- keep in mind that forkJoin emits once when all the input Observables are complete and preserves the order of the input Observables.
- forkJoin is best used when you have a list of Observables and only care about the final emitted value of each.
- In our case, we will issue multiple upload requests, and we only want to take action when a response is received from all the input streams.

## The pattern in action
- We use switchMap to transform every value emitted by the Subject$ to the Observable that we will build using forkJoin. 
- The forkJoin operator should take the array of streams that will be combined as input. That's what we did inside forkJoin.
- We map every file in the uploadedFiles array to the stream responsible for uploading the file, and the stream responsible for uploading the file is nothing but the fol
- It makes a lot of sense to catch the errors in order to display something significant to the user – for example, in our case, if one of the uploads fails because maxFileSize was reached or the extension of the image is not allowed, then the system should display those exceptions to the user to help them fix the file.
- forkJoin has the following benefits:

    - It is very useful when you are interested in combining results and getting a value only once.
    - It only emits once when all the Observables complete.
    - It preserves the order of the input Observables in the emission.
    - It will complete when one of the streams errors out, so, you should handle the error.

## Learning about the reactive pattern for tracking progress
- In order to track the progress of the bulk upload, we can call a very useful operator.
- The finalize operator allows you to call a function when the Observable completes or errors out.
- This way, every time an Observable completes, the progress will get updated.