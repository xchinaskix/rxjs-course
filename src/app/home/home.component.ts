import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {interval, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservabes } from '../common/util';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public beginnersCourses$: Observable<Course[]>;
    public advancedCourses$: Observable<Course[]>;

    ngOnInit() {
        const http$ = createHttpObservabes('/api/courses');

        const courses$: Observable<Course[]> = http$.pipe(
          tap(() => console.log('only once')),
          map(res => Object.values(res['payload'])),
          shareReplay()
        );

        this.beginnersCourses$ = courses$.pipe(
            map(courses => courses.filter(i => i.category === 'BEGINNER'))
        );

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(i => i.category === 'ADVANCED'))
        );
    }

}
