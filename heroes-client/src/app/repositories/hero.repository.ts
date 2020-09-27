import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IHero } from '../models/hero';

/**
 * Heroes API
 */
@Injectable()
export class HeroRepository {
   constructor(private _apollo: Apollo) {
   }

   public getHero(id: string): Observable<IHero> {
      return this._apollo.query<any>({
         query: gql(`
         {
            hero(id: "${id}") {
               name
               biography {
                 fullName
               }
               image {
                  url
               }
            }
         }`)
      }).pipe(map(response => response.data.hero as IHero));
   }

   public searchHero(name: string): Observable<IHero[]> {
      return this._apollo.query<any>({
         query: gql(`
         {
            heroes(name: "${name}") {
               id
               name
               biography {
                 fullName
               }
            }
         }`)
      }).pipe(map(response => response.data.heroes as IHero[]));
   }

   public randomHero(): Observable<IHero> {
      return this._apollo.query<any>({
         fetchPolicy: 'no-cache',
         query: gql(`
         {
            random {
               id
               name
               biography {
                  alignment
                  fullName
                  placeOfBirth
                  firstAppearance
                  publisher
               }
               image {
                  url
               }
               appearance {
                  gender
                  race
               }
               work {
                  occupation
               }
            }
         }`)
      }).pipe(map(response => response.data.random as IHero));
   }
}
