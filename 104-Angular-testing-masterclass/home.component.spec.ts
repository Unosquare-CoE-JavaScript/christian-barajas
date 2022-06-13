import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let component:HomeComponent;
    let el: DebugElement;
    let coursesService: any;

    const beginnerCourses = setupCourses()
        .filter(c => c.category == "BEGINNER");

    const advancedCourses = setupCourses()
        .filter(c => c.category == "ADVANCED");

    beforeEach(waitForAsync(() => {

        const CoursesServiceSpy = jasmine.createSpyObj('CoursesServices', ['findAllCourses']);

        TestBed.configureTestingModule({
            imports:[
                NoopAnimationsModule,
                CoursesModule
            ],
            providers:[
                {provide: CoursesService, useValue: CoursesServiceSpy}
            ]
        }).compileComponents()
            .then( _ => {
                
                fixture = TestBed.createComponent(HomeComponent);
                component = fixture.componentInstance;
                el = fixture.debugElement;
                coursesService = TestBed.inject(CoursesService);
            })
    }));

    it("Should create the component", () => {

        expect(component).toBeTruthy();

    });


    it("Should display only beginner courses", () => {

        coursesService.findAllCourses
            .and.returnValue(of(beginnerCourses));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mat-tab-label"));

        expect(tabs.length).toBe(1, "Unexpected number of tabs found");

    });


    it("Should display only advanced courses", () => {

        coursesService.findAllCourses
            .and.returnValue(of(advancedCourses));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mat-tab-label"));

        expect(tabs.length).toBe(1, "Unexpected number of tabs found");

    });


    it("Should display both tabs", () => {

        coursesService.findAllCourses
            .and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mat-tab-label"));

        expect(tabs.length).toBe(2, "Unexpected number of tabs found");

    });


    it("Should display advanced courses when tab clicked - done", (done: DoneFn) => {

        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mat-tab-label"));
        
        const defaultTitles = el.queryAll(By.css(".mat-card-title"));
        tabs[1].nativeElement.click();
        
        click(tabs[1]);
        
        fixture.detectChanges();

        setTimeout(() => {

            const cardTitles = el.queryAll(By.css(".mat-tab-body-active .mat-card-title"));

            expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");
            expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
            
            done();

        }, 1000)

    });

    it("Should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {

        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mat-tab-label"));
        
        click(tabs[1]);
        
        fixture.detectChanges();

        flush();

        const cardTitles = el.queryAll(By.css(".mat-tab-body-active .mat-card-title"));

        expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");
        expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
        
        
    }));

    it("Should display advanced courses when tab clicked - async", waitForAsync(() => {
        
        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mat-tab-label"));
        
        click(tabs[1]);
        
        fixture.detectChanges();

        fixture.whenStable()
            .then( _ => {

                const cardTitles = el.queryAll(By.css(".mat-tab-body-active .mat-card-title"));
        
                expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");
                
                expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
            
            })

        
    }));


});





















