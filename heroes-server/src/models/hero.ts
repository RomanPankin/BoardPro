import { IHeroConnections } from './hero-connections';
import { IHeroWork } from './hero-work';
import { IHeroAppearance } from './hero-appearance';
import { IHeroBiography } from './hero-biography';
import { IHeroImage } from './hero-image';
import { IHeroPowerStat } from './hero-powerstat';

export interface IHero<BiographyType = IHeroBiography> {
   id: string;
   name: string;
   powerstat: IHeroPowerStat;
   image: IHeroImage;
   biography: BiographyType;
   appearance: IHeroAppearance;
   work: IHeroWork;
   connections: IHeroConnections;
}