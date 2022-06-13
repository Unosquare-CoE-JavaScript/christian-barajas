import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from "./courses.service"
import { COURSES, findLessonsForCourse, LESSONS } from "../../../../server/db-data";
import { Course } from "../model/course";
import { HttpErrorResponse } from "@angular/common/http";


describe("CoursesService", () => {

    let coursesService: CoursesService;
    let httpTestingCtrl: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CoursesService,
                
            ]
        });

        httpTestingCtrl = TestBed.inject(HttpTestingController);
        coursesService = TestBed.inject(CoursesService);
    })

    it("Should retrieve all courses", () => {
        coursesService.findAllCourses()
            .subscribe(courses => {

                expect(courses).toBeTruthy('No courses returned');

                expect(courses.length).toBe(12, "Incorrect number of courses");

                const course = courses.find(c => c.id == 12);

                expect(course.titles.description).toBe("Angular Testing Course");
            
            });

        const req = httpTestingCtrl.expectOne('/api/courses');
        
        expect(req.request.method).toEqual('GET');

        req.flush({payload: Object.values(COURSES)});

    })

    it("Should retrieve Single course by id", () => {
        coursesService.findCourseById(12)
            .subscribe(course => {

                expect(course).toBeTruthy('No course returned');

                expect(course.id).toBe(12, "Incorrect number of course");
            
            });

        const req = httpTestingCtrl.expectOne('/api/courses/12');
        
        expect(req.request.method).toEqual('GET');

        req.flush( COURSES[12] )

    })

    it("Should save new course", () => {

        const changes = {titles:{description: 'Just Testint'}}
        coursesService
            .saveCourse(12, changes)
            .subscribe(saved => {
                expect(saved.id).toBe(12);
            })

        const req = httpTestingCtrl.expectOne('/api/courses/12');
    
        expect(req.request.method).toEqual('PUT');

        expect(req.request.body.titles.description)
            .toEqual(changes.titles.description)

        req.flush({
            ...COURSES[12],
            ...changes
        })

    })

    it("Should give an error if save course fails", () => {

        const changes: Partial<Course> = 
            {titles:{description: 'Just Testint'}}

        coursesService.saveCourse(12, changes)
            .subscribe(
                _ => {
                fail("The save course operation should have failed");
                },
                (error: HttpErrorResponse) => {
                    expect(error.status).toBe(500);
                });
        
        const req = httpTestingCtrl.expectOne('/api/courses/12');
    
        expect(req.request.method).toEqual('PUT');

        expect(req.request.body.titles.description)
            .toEqual(changes.titles.description)

        req.flush('Save course failed', {
            status: 500, 
            statusText: "Internal Server Error"
        })        
    })

    it("Should retrieve all lessons", () => {

        coursesService.findLessons(12)
            .subscribe(lessons => {

                expect(lessons).toBeTruthy();
                expect(lessons.length).toBe(3);

            })

        const req = httpTestingCtrl.expectOne(req => {
            return req.url == '/api/lessons'
        });
    
        expect(req.request.method).toEqual('GET');

        expect(req.request.params.get("courseId"))
            .toEqual("12");
        expect(req.request.params.get("filter"))
            .toEqual("");
        expect(req.request.params.get("sortOrder"))
            .toEqual("asc");
        expect(req.request.params.get("pageNumber"))
            .toEqual("0");
        expect(req.request.params.get("pageSize"))
            .toEqual("3");

        req.flush({
            payload: findLessonsForCourse(12).slice(0,3)
        })      
        
    })

    afterEach(() => {

        httpTestingCtrl.verify();

    })
})