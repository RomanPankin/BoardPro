import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, filter, switchMap, tap, finalize } from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

import { DisposableDirective } from './../../common/disposable';
import { HeroRepository } from './../../repositories/hero.repository';
import { IHero } from '../../../../../heroes-server/src/models/hero';
import { StringUtils } from './../../utils/string.utils';
import { GameStatus } from './../../models/game-status';

const TOTAL_TIME_IN_SEC = 59;

const HERO_DELAY_IN_MSEC = 300;
const HERO_REQUEST_MIN_LENGTH = 2;

@Component({
   selector: 'app-page-fight',
   templateUrl: './page-fight.component.html',
   styleUrls: ['./page-fight.component.less'],
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
export class PageFightComponent extends DisposableDirective implements OnInit, OnDestroy {
   // questions
   public allQuestions: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
   public currentQuestion: BehaviorSubject<number> = new BehaviorSubject<number>(1);
   public visibleQuestions: Observable<string[]>;
   public leftTime: BehaviorSubject<number> = new BehaviorSubject<number>(TOTAL_TIME_IN_SEC);

   public correctHero: BehaviorSubject<IHero> = new BehaviorSubject<IHero>(null);
   public correctHeroPreview: Observable<SafeStyle>;

   // user's input
   public heroSearchValue: BehaviorSubject<string> = new BehaviorSubject<string>(null);
   public heroOptions: BehaviorSubject<IHero[]> = new BehaviorSubject<IHero[]>([]);
   public heroSelectedId: BehaviorSubject<IHero['id']> = new BehaviorSubject<IHero['id']>(null);

   public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

   private _timer: any;
   private _startTime: Date;

   constructor(private _heroRepository: HeroRepository,
               private _router: Router,
               private _sanitizer: DomSanitizer) {
      super();

      this.visibleQuestions = combineLatest([this.allQuestions, this.currentQuestion])
         .pipe(map(([questions, currentQuestion]) => {
            return (questions || []).filter((value, index) => index < currentQuestion);
         }));

      this.correctHeroPreview = this.correctHero
         .pipe(filter(hero => hero?.image?.url != null))
         .pipe(map(hero => {
            return _sanitizer.bypassSecurityTrustStyle(`url(${hero.image.url})`);
         }));

      this.addDisposable(
         this.heroSearchValue
            .pipe(distinctUntilChanged())
            .pipe(filter((value) => value?.length >= HERO_REQUEST_MIN_LENGTH))
            .pipe(debounceTime(HERO_DELAY_IN_MSEC))
            .pipe(tap(() => {
               this.isLoading.next(true);
            }))
            .pipe(switchMap((searchText: string): Observable<IHero[]> => {
               return this._heroRepository.searchHero(searchText);
            }))
            .pipe(finalize(() => {
               this.isLoading.next(false);
            }))
            .subscribe(hero => {
               this.heroOptions.next(hero);

               if (!(hero || []).some(x => x.id === this.heroSelectedId.value)) {
                  this.heroSelectedId.next(null);
               }

               this.isLoading.next(false);
            })
      );

      this.addDisposable(
         _heroRepository.randomHero()
            .subscribe(hero => {
               this.correctHero.next(hero);

               const placeOfBirth = StringUtils.filterEmptyOrDash(hero.biography?.placeOfBirth);
               const gender = StringUtils.filterEmptyOrDash(hero.appearance?.gender);
               const race = StringUtils.filterEmptyOrDash(hero.appearance?.race);
               const occupation = StringUtils.filterEmptyOrDash(hero.work?.occupation);
               const publisher = StringUtils.filterEmptyOrDash(hero.biography?.publisher);
               const firstAppearance = StringUtils.filterEmptyOrDash(hero.biography?.firstAppearance);
               const alignment = StringUtils.filterEmptyOrDash(hero.biography?.alignment);

               const questions = [
                  placeOfBirth ? `Was born in ${placeOfBirth}` : null,
                  gender || race ? [gender, race].filter(x => x).join(', ') : null,
                  occupation ? `Works in ${occupation}` : null,
                  alignment ? `The character alignment: ${alignment}` : null,
                  publisher || firstAppearance ? `First appeared in ${[publisher, firstAppearance].filter(x => x).join(', ')}` : null,
               ].filter(x => x);
               this.allQuestions.next(questions);

               this.startTimer();
            })
      );
   }

   public ngOnInit(): void {
   }

   public ngOnDestroy(): void {
      this.stopTimer();
   }

   public nextQuestion(): void {
      this.currentQuestion.next(this.currentQuestion.value + 1);
   }

   public selectHero(hero: IHero): void {
      this.heroSelectedId.next(hero?.id);
   }

   public sendResult(): void {
      this.goToResults(this.heroSelectedId.value === this.correctHero.value.id ? GameStatus.Success : GameStatus.Fail);
   }

   private startTimer() {
      this._startTime = new Date();

      this._timer = setInterval(() => {
         const diffInSec = Math.max(TOTAL_TIME_IN_SEC - Math.floor(((new Date().getTime()) - this._startTime.getTime()) / 1000), 0);
         if (diffInSec <= 0) {
            this.goToResults(GameStatus.Timeout);
         }

         this.leftTime.next(diffInSec);
      }, 1000);
   }

   private goToResults(status: GameStatus) {
      this.stopTimer();

      const questions = this.allQuestions.value?.length;

      const score = questions && status === GameStatus.Success ?
         Math.round(
            ((TOTAL_TIME_IN_SEC - this.leftTime.value) / TOTAL_TIME_IN_SEC * 0.5 +
            (questions - this.currentQuestion.value) / questions * 0.5) * 100
         ) : 0;

      this._router.navigate([
         'result',
         status,
         this.correctHero.value.id,
         score
      ]);
   }

   private stopTimer() {
      if (this._timer) {
         clearInterval(this._timer);
         this._timer = null;
      }
   }
}
