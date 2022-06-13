import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';
import {Test} from 'tslint';


describe('CoursesCardListComponent', () => {

    let component: CoursesCardListComponent;
    let fixture: ComponentFixture<CoursesCardListComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(()=>{

        TestBed.configureTestingModule({
            imports: [CoursesModule]
        })
            .compileComponents()
            .then( _ => {
                fixture = TestBed.createComponent(CoursesCardListComponent);
                component = fixture.componentInstance;
                debugElement = fixture.debugElement;
            });

        
    }))

    it('Should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('Should display the course list', () => {

        component.courses = setupCourses();

        fixture.detectChanges();

        const cards = debugElement.queryAll(By.css('.course-card'));

        expect(cards).toBeTruthy("Could not find cards");
        expect(cards.length).toBe(12, "Unexpected number of courses");

    });

    it('Should display the first course', () => {
        
        component.courses = setupCourses();

        fixture.detectChanges();

        const course = component.courses[0];

        const card = debugElement.query(By.css(".course-card:first-child"));
        const cardTitle = card.query(By.css("mat-card-title"));
        const cardImage = card.query(By.css("img"));
        
        expect(card).toBeTruthy("Could not find course card");

        expect(cardTitle.nativeElement.textContent).toBe(course.titles.description);

        expect(cardImage.nativeElement.src).toBe(course.iconUrl);
        
    });

});


