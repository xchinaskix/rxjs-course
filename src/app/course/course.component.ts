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
    lessons$: Observable<Lesson[]>;
    @ViewChild('searchInput') input: ElementRef;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        const courseId = this.route.snapshot.params['id'];
        this.course$ = createHttpObservabes(`/api/courses/${courseId}`);
        this.lessons$ = createHttpObservabes(`/api/lessons?courseId=${courseId}&pageSize=100`)
        .pipe(
            map(res => res['payload'])
        );
    }

    ngAfterViewInit() {
        fromEvent<any>(this.input.nativeElement, 'keyup')
        .pipe(
            map(event => event.target.value),
            debounceTime(400),
            distinctUntilChanged()
        )
        .subscribe(console.log);
    }




}
