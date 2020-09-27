import { trigger, transition, animate, style } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-page-rules',
   templateUrl: './page-rules.component.html',
   styleUrls: ['./page-rules.component.less'],
   animations: [
      trigger('appearanceAnimation', [
         transition(':enter', [
            style({ transform: 'translate(0px, 50px)', opacity: 0 }),
            animate('200ms', style({ transform: 'translate(0px, 0px)', opacity: 1 })),
         ]),
         transition(':leave', [
            animate('400ms', style({ transform: 'translate(-100%,0px)' }))
         ])
      ])
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageRulesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
