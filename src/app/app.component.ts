import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private userService: UserService) { }

  title = 'observables-01';
  activated = false;
  subscription: Subscription = new Subscription;

  ngOnInit(): void {
    this.subscription = this.userService.activatedEmitter.subscribe(didActivate => {
      this.activated = didActivate;
   })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
