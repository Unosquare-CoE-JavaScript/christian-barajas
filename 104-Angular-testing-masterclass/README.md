# Angular testing course 

 
 

- I decided to only add the files that I worked through the course instead of adding all the repo 

 
 

## Troubleshooting 

 
 

- At the moment on Jun 10th 2022, the source material that is in a Github repository has some problem with modules version between internal dependencies such as angular/webpack and cypress/webpack, upgrading to Angular v 14.0.1 helped. 

 
 

## This are my notes (Things that I found worth to write down) 

 
 

- Gives a indication that this test is not ready to be executed `pending()`.

- To simulate a failing test use `fail()`. 

- For running ng test without hot reload use `ng test --no-watch` 

- You can add an extra message in the assertion like this `expect(result).toBe(4, "Unexpected value assertion")`.

- To track the number of calls in an assertion use `.toHaveBeenCalledTimes()`.

- Whenever we are implementing a unit test to a certain element the only actual instance of the flow should be only the element, others dependencies should be mocked and replaced with a fake test implementation.

- When mocking a dependency, use `jasmine.createSpyObj('LoggerService', [ 'log' ])`.

- To fake a return of a certain method, use `.and.returnValue("value")`.

- Using TestBed, we can inject dependencies instead of calling constructor directly.

- If you want to ignore certain cases you can add an "x" before (`xit, xdescribe`). 

- If you want to give more weight and isolate certain cases you can add an "f" before (`fit, fdescribe`). 

- Using TestBed we can configure a component taking care of all the dependecies, set `fixtures` and `DebugElement`. 

- To Mocking a Http call, we can use `HttpClientTestingModule` and `HttpTestingController`. 

- We can emulate a request using `const req = httpTestingCtrl.expectOne('/route')` and using `req.flush` to set up a status and request. 

- To test async behavior we have multiple ways: 

    - `(Done: DoneFn)` - adding a callback function to the case so that we can tell manually when the assertions are finished. 

    - `FakeAsync` - wrapper function that allows to use several methods at our favor such a tick and flush: 

        - `tick` - takes a parameter that will be milliseconds. Ideal for setTimeout or for events in the DOM. 

        - `flushMicroTask` - can be use for promises. 

        - `flush` - will delegate all queue events. can be use for events in the DOM or promises. 

     

    - `waitForAsync` - Ideal for cases with external calls, it adds the functionality to fixture, `whenStable()`. that we can add a .then() a complete or assertions. 

 

 