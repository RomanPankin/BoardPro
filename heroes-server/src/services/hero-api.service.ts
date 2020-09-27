import { IHeroApiSearchResponse } from './../models/hero-api-search-response';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

import { IHeroApiStatusResponse } from '../models/hero-api-status-response';
import { IHero } from '../models/hero';

const API_TOKEN = '1001279573653970';
const API_BASE_URL = `https://superheroapi.com/api/${API_TOKEN}`;

@Injectable()
export class HeroApiService {
   public static readonly MIN_HERO_ID = 1;
   public static readonly MAX_HERO_ID = 731;

   public async getHero(id: number | string): Promise<IHero> {
      return await this.fetchData<IHeroApiStatusResponse & IHero>(`${API_BASE_URL}/${id}`);
   }

   public async searchHeroByName(name: number | string): Promise<IHero[]> {
      try {
         return (await this.fetchData<IHeroApiStatusResponse & IHeroApiSearchResponse>(
               `${API_BASE_URL}/search/${encodeURIComponent(name)}`
            )).results;
      
      } catch (e) {
         return [];
      }
   }

   private async fetchData<T extends IHeroApiStatusResponse>(url: string): Promise<T> {
      const response = await fetch(url);
      const body = <T>(await response.json());

      if (body.response !== "success") {
         throw new Error("The response wasn't successful");
      }

      return body;
   }
}