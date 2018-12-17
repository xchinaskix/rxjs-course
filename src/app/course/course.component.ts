import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservabes } from '../common/util';


@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course$: Observable<Course>;
    courseId: string;
    lessons$: Observable<Lesson[]>;

    @ViewChild('searchInput') input: ElementRef;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.courseId = this.route.snapshot.params['id'];
        this.course$ = createHttpObservabes(`/api/courses/${this.courseId}`);
    }

    ngAfterViewInit() {
        this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
        .pipe(
            map(event => event.target.value),
            startWith(''),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(search => this.loadLessons(search))
        );
    }

    loadLessons(search = ''): Observable<Lesson[]> {
        return createHttpObservabes(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
        .pipe(
            map(res => res['payload'])
        );
    }




}
