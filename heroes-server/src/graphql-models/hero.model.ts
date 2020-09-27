import { HeroConnections } from './hero-connections.model';
import { HeroWork } from './hero-work.model';
import { HeroAppearance } from './hero-appearance.model';
import { IHeroBiographyRaw } from './../models/hero-biography-raw';
import { HeroBiography } from './hero-biography.model';
import { HeroImage } from './hero-image.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { HeroPower } from './hero-power.model';
import { IHero } from './../models/hero';

@ObjectType()
export class Hero implements IHero<IHeroBiographyRaw> {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(type => HeroPower)
  powerstat: HeroPower;

  @Field(type => HeroImage)
  image: HeroImage;

  @Field(type => HeroBiography)
  biography: HeroBiography;

  @Field(type => HeroAppearance)
  appearance: HeroAppearance;

  @Field(type => HeroWork)
  work: HeroWork;

  @Field(type => HeroConnections)
  connections: HeroConnections;
}