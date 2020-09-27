import { Field, ObjectType } from '@nestjs/graphql';
import { IHeroAppearance } from './../models/hero-appearance';

@ObjectType()
export class HeroAppearance implements IHeroAppearance {
  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  race: string;
}