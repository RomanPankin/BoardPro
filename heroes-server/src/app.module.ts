import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { HeroesResolver } from './graphql-models/hero.resolver';
import { HeroApiService } from './services/hero-api.service';

@Module({
   imports: [
      ServeStaticModule.forRoot({
         rootPath: join(__dirname, '..', '..', 'heroes-client', 'dist', 'heroes-client'),
      }),
      
      GraphQLModule.forRoot({
         autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
         sortSchema: true,
      })
   ],
   controllers: [],
   providers: [
      HeroesResolver,
      HeroApiService
   ]
})
export class AppModule {}
