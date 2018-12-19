import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, timer } from 'rxjs';
import { Course } from '../model/course';
import { createHttpObservable } from './util';
import { tap, map, shareReplay, retryWhen, delayWhen } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({
    providedIn: 'root'
})
export class Store {

    private subject = new BehaviorSubject<Course[]>([]);

    courses$: Observable<Course[]> = this.subject.asObservable();

    init() {
        const http$ = createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = http$
            .pipe(
                tap(() => console.log('HTTP request executed')),
                map(res => Object.values(res['payload']) ),
            )
            .subscribe( courses => this.subject.next(courses));
    }

    selectBeginnerCourses() {
        return this.courses$
        .pipe(
            map(courses => courses
                .filter(course => course.category === 'BEGINNER'))
        );
    }

    selectAdvancedCourses() {
        return this.courses$
        .pipe(
            map(courses => courses
                .filter(course => course.category === 'ADVANCED'))
        );
    }

    selectCourseById(courseId: number) {
        return this.courses$
        .pipe(
            map(courses => courses
                .find(v => v.id === courseId))
        );
    }

    saveCourse(courseId: number, changes) {
        const courses = this.subject.getValue();
        const courseIndex = courses.findIndex(v => v.id === courseId);
        const newCourses = courses.slice(0);

        newCourses[courseIndex] = {
            ...courses[courseIndex],
            ...changes
        };

        this.subject.next(newCourses);

        return fromPromise(fetch(`api/courses/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {'content-type': 'application/json'}
        }));

    }

}
