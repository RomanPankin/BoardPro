import { trigger, transition, animate, style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.less'],
   animations: [
      trigger('appearanceAnimation', [
         transition(':enter', [
            style({ opacity: 0 }),
            animate('600ms', style({ opacity: 1 })),
         ])
      ])
   ],
})
export class AppComponent {
  title = 'heroes-client';
}
