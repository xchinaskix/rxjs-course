import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {concat, fromEvent, interval, noop, observable, Observable,
     of, timer, merge, Subject, BehaviorSubject, AsyncSubject, ReplaySubject} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {
        // const subject = new Subject; // dont have memory for last value and initial value
        // const subject = new BehaviorSubject(0); // save in memory last value and also have initial value
        // const subject = new AsyncSubject(); // return only last emit value before complete
        // const subject = new ReplaySubject(); // return all emited values for all subscribers

        // const obser$ = subject.asObservable();
        // obser$.subscribe(val => console.log('early sub:' + val));

        // subject.next(1);
        // subject.next(2);
        // subject.next(3);
        // subject.complete();

        // setTimeout(() => {
        //     obser$.subscribe(val => console.log('late sub:' + val));
        //     // subject.next(4);
        // }, 3000);

    }


}






