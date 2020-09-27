import { Field, ObjectType } from '@nestjs/graphql';

import { IHeroWork } from './../models/hero-work';

@ObjectType()
export class HeroWork implements IHeroWork {
  @Field()
  occupation: string;
}