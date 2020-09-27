import { Args, Query, Resolver } from '@nestjs/graphql';

import { Hero } from './hero.model';
import { IHero } from './../models/hero';
import { HeroApiService } from './../services/hero-api.service';

@Resolver(of => Hero)
export class HeroesResolver {
   constructor(private _heroApiService: HeroApiService) {
   }

   @Query(returns => Hero)
   public async hero(@Args('id', { type: () => String }) id: string): Promise<IHero> {
      return this._heroApiService.getHero(id);
   }

   @Query(returns => [Hero])
   public async heroes(@Args('name', { type: () => String }) name: string): Promise<IHero[]> {
      return this._heroApiService.searchHeroByName(name);
   }

   @Query(returns => Hero)
   public async random(): Promise<IHero> {
      const id = Math.floor(Math.random() * (HeroApiService.MAX_HERO_ID - HeroApiService.MIN_HERO_ID) + HeroApiService.MIN_HERO_ID);
      return this._heroApiService.getHero(id);
   }
}