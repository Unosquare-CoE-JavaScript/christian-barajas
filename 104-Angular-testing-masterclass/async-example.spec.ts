import { fakeAsync, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async Testing Examples", ()=> {


    it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {

        let test = false;

        setTimeout(() => {

            test = true;

            expect(test).toBeTruthy();

            done();
        }, 1000)
    });

    it("Asynchronous test example - setTimeout()", fakeAsync(() => {

        let test = false;

        setTimeout(() => {

            test = true;
        
        },1000);

        tick(1000);

        // flush();

        expect(test).toBeTruthy();

    }))

    it("Asynchronous test example - plain promise", fakeAsync(() => {

        let test = false;

        Promise.resolve()
            .then( _ => {
                test = true;
            })

        flushMicrotasks();
        
        expect(test).toBeTruthy();
    }))

    it("Asynchronous test example - Promise + setTimeout()", fakeAsync(()=> {

        let counter = 0;

        Promise.resolve()
            .then(_ => {
                counter+= 10;

                setTimeout(() => {
                    counter += 1;
                }, 1000)
            })

        expect(counter).toBe(0);

        flushMicrotasks();

        expect(counter).toBe(10);

        tick(500);

        expect(counter).toBe(10);

        tick(500);

        expect(counter).toBe(11);
    }));

    it("Asynchrounous test example - Observables", fakeAsync(() => {

        let test = false;

        const test$ = of(test)
            .pipe(delay(1000))

        // A Subscription to a observable will be executed inmediatly
        test$.subscribe( _ => {

            test = true;

        })

        tick(1000);

        expect(test).toBe(true);
        
    }))
})