import { Observable } from 'rxjs';

export function createHttpObservabes(url: string) {
    return Observable.create(observer => {

      const controller = new AbortController();
      const signal = controller.signal;

      fetch(url, {signal})
        .then(res => {
          return res.json();
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error();
        });

        return () => controller.abort();

    });

  }

