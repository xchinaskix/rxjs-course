import { Component, OnInit } from '@angular/core';
import { of, interval } from 'rxjs';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { createHttpObservabes } from '../common/util';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const sourse1$ = interval(1000);
    // const sourse2$ = sourse1$.pipe(map(val => val * 10));
    // const result$ = merge(sourse1$, sourse2$);
    // result$.subscribe(console.log);

    const http$ = createHttpObservabes('/api/courses');

    const sub = http$.subscribe(console.log);

    setTimeout(() => sub.unsubscribe(), 0);

  }


}
