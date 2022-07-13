import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  firstObsSubscription!: Subscription;
  constructor() {}

  ngOnInit() {
  //this.firstObsSubscription = interval(1000).subscribe(count => console.log(count));

    const customObservable = new Observable<number>((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("Count is more then 3!"));
        }
        count++;
      }, 1000);
    });


    this.firstObsSubscription = customObservable
      .pipe(filter(data => {
        return data > 0;
      })
        ,map((data: number) => {
          return 'Round:' + (data + 1);
        })
      )
      .subscribe(
        num => {
          console.log(num);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => console.log('Completed!')
      );
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
