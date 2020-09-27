import { NumberUtils } from './../../utils/number-utils';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

import { GameStatus } from './../../models/game-status';
import { DisposableDirective } from './../../common/disposable';
import { IHero } from '../../../../../heroes-server/src/models/hero';
import { HeroRepository } from './../../repositories/hero.repository';

@Component({
   selector: 'app-page-result',
   templateUrl: './page-result.component.html',
   styleUrls: ['./page-result.component.less'],
   changeDetection: ChangeDetectionStrategy.OnPush,
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
   ]
})
export class PageResultComponent extends DisposableDirective implements OnInit {
   public status: GameStatus = null;
   public score: number;
   public hero: Observable<IHero>;
   public heroPreview: Observable<SafeStyle>;

   private _heroId: BehaviorSubject<string> = new BehaviorSubject<string>(null);

   public get GameStatus(): typeof GameStatus {
      return GameStatus;
   }

   public constructor(private _route: ActivatedRoute,
                      private _heroRepository: HeroRepository,
                      private _sanitizer: DomSanitizer) {
      super();
   }

   public ngOnInit(): void {
      this.addDisposable(
         this._route.params.subscribe(params => {
            this.status = params.status;
            this.score = NumberUtils.parseNum(params.score) || 0;

            this._heroId.next(params.id as string);
         })
      );

      this.hero = this._heroId
            .pipe(filter((x) => x != null))
            .pipe(switchMap(id => {
               return this._heroRepository.getHero(id);
            }));

      this.heroPreview = this.hero
         .pipe(filter(hero => hero?.image?.url != null))
         .pipe(map(hero => {
            return this._sanitizer.bypassSecurityTrustStyle(`url(${hero.image?.url})`);
         }));
   }
}
