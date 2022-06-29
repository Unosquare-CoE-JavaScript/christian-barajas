# Chapter 005: Error Handling 
- In RxJS, there are a lot of error handling strategies that you need to learn in order to handle errors efficiently. 

## Exploring error handling patterns and strategies 
- The subscribe() method takes as input the object Observer, which has three callbacks: 
    - A success callback: This is called every time the stream emits a value and receives as input the value emitted 
    - An error callback: this is called when an error occurs and receives as input the error itself 
    - A completion callback: This is called when the stream completes without parameters. 
- In this context, the Autor says, in most cases, we will not be using subscribe() explicitly. 
- Handling errors using the ubscribe89 method has its limitations, mainly that it is impossible to recover from the error or emit an alternative fallback. 

## The catchError operator 
- catchError, catches errors on the observable to be handled by returning a new observable or throwing an error. 
- This operator subscribes to the source Observable that might error out and emit values to the observer until an error occurs. 
- When it happens, the operator executes a callback function, passing in the error. 
    ```javascript stream$.pipe(catchError( error => /** Handle Errors **/))``` 

- When it comes to handling errors, there are some other strategies:  
    - A replacement strategy 
    - A rethrow strategy 
    - A retry strategy 

## Replace strategy 
- The error handling operator returns an Observable which is going to be a replacement Observable for the stream that just errored out. This replacement Observable is then going to be subscribed to, and its values are going to be used in place of the errored-out input Observable. 
    ```javascript 
        stream$ 
            .pipe( 
                map(value => {/** Handles value and an error happens/is thrown**/}), 
                catchError(error => of() ) 
            ) 
    ``` 
- catchError will subscribe under the good to then return an Observable. The of() Observable will emit a value and complete. - Therefore, when an error occurs, the current stream that errored out will get replaced by the stream returned from the catchError(). 

## Rethrow strategy 
- Consist in rethrowing the error or propagating the error to the subscribers of the output Observable of catchError(). 
    ```javascript 
        stream$ 
            .pipe( 
                map(value => {/** Handles value and an error happens/is thrown**/}), 
                catchError(error => throwError(() => error) ) 
            ) 
            .subscribe({ 
                next: res => console.log("Success", res), 
                error: error => console.log("Error:", error), 
                complete: _ => console.log("Completed") 
            }) 
    ``` 

## Retrying strategy 
- The retry operator gives another chance to the steam. The operator retries an Observable an specific number of times. 
- It is useful for retrying HTTP Request. 
    ```javascript 
        stream$ 
            .pipe( 
                map(value => {/** Handles value and an error happens/is thrown**/}), 
                retry(2), 
                catchError(error => throwError(() => error) ) 
            ) 
            .subscribe({ 
                next: res => console.log("Success", res), 
                error: error => console.log("Error:", error), 
                complete: _ => console.log("Completed") 
            }) 
    ``` 
- In this case, its retrying immediately.  

### retryWhen Operator 
- This operator retires the source Observable each time the notifier emits a value. 
- You can use this notifier Observable to emit values at the moment you want your source Observable to get retried and complete it all the moment you want your retry attempts to stop. 
    ```javascript 
        stream$ 
            .pipe( 
                map(value => {/** Handles value and an error happens/is thrown**/}), 
                retryWhen( errors => errors 
                    .pipe( 
                        tap(_ => console.log('Retrying' )) 
                    )) 
            ) 
            .subscribe({ 
                next: res => console.log("Success", res), 
                error: error => console.log("Error:", error), 
                complete: _ => console.log("Completed") 
            }) 
        // This code may runs infinitely 
    ``` 
- This code may run infinitely, A Source may always error out, and the operator will consequently subscribe infinitely to the source Observable. 
- It is not correct to retry immediately. In that case you can delay the retry. 

### delayWhen Operator 
- Every value emitted by the source Observable will be delayed before being emitted to the output Observable. 
- The delay is completely flexible through the durationSelector function. 
- The timer function can be useful in the delayed retry strategy. 
- This timer function returns and Observable and takes two arguments. 
    - due: A time period or exact date, before which no value will be emitted 
    - scheduler: A periodic interval, in case we want to emit new values periodically. 
    ```javascript 
        streamHTTPCall$ 
            .pipe( 
                retryWhen( errors => errors 
                    .pipe( 
                        delayWhen( _ => timer(5000)) 
                        // OR  
                        // delayWhen( _ => timer(5000, 1000)) 
                        tap(_ => console.log('Retrying' )) 
                    )),
            ) 
            .subscribe({ 
                next: res => console.log("Success", res), 
                error: error => console.log("Error:", error), 
                complete: _ => console.log("Completed") 
            }) 
    ``` 

## Error handling in action 
- In the previous example of retrying multiple times at failure, IF we choose the rethrow or retry strategy, we will block the display, meaning the user will wait for the request in order to see the UI. 
- This is not correct; it is correct when you have processes in the background or processes that are not related to the UI display. 
- You should provide a replacement for the data to continue rendering the page. 
- So, an appliance to this case will be returning in a catchError() an empty Observable, which will be our fallback value. 
