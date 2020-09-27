import { Field, ObjectType } from '@nestjs/graphql';
import { IHeroImage } from './../models/hero-image';

@ObjectType()
export class HeroImage implements IHeroImage {
  @Field()
  url: string;
}