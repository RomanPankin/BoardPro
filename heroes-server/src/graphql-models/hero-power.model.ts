import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IHeroPowerStat } from '../models/hero-powerstat';

@ObjectType()
export class HeroPower implements IHeroPowerStat<number> {
  @Field(type => Int)
  intelligence: number;

  @Field(type => Int)
  strength: number;

  @Field(type => Int)
  speed: number;

  @Field(type => Int)
  durability: number;

  @Field(type => Int)
  power: number;

  @Field(type => Int)
  combat: number;
}