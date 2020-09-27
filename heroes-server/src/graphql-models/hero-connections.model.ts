import { Field, ObjectType } from '@nestjs/graphql';
import { IHeroConnections } from './../models/hero-connections';

@ObjectType()
export class HeroConnections implements IHeroConnections {
  @Field()
  relatives: string;
}