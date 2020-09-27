import { Field, ObjectType } from '@nestjs/graphql';
import { IHeroBiographyRaw } from './../models/hero-biography-raw';

@ObjectType()
export class HeroBiography implements IHeroBiographyRaw {
  @Field()
  url: string;

  @Field({ name: 'fullName'})
  'full-name': string;
  
  @Field({ name: 'placeOfBirth'}) 
  'place-of-birth': string;

  @Field({ name: 'firstAppearance'})
  'first-appearance': string;

  @Field(type => [String])
  aliases: string[];

  @Field()
  publisher: string;   

  @Field()
  alignment: string;
}