import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';

// Material UI
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

// Custom components
import { InputComponent } from './components/input/input.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

// Layout
import { AppComponent } from './app.component';
import { PageRulesComponent } from './layout/page-rules/page-rules.component';
import { PageFightComponent } from './layout/page-fight/page-fight.component';

// APIs
import { HeroRepository } from './repositories/hero.repository';
import { PageResultComponent } from './layout/page-result/page-result.component';

@NgModule({
   declarations: [
      AppComponent,
      PageRulesComponent,
      PageFightComponent,

      InputComponent,
      SpinnerComponent,
      PageResultComponent
   ],
   imports: [
      FormsModule,
      ReactiveFormsModule,
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,

      MatButtonModule,
      MatInputModule,
      GraphQLModule,
      HttpClientModule,
   ],
   providers: [
      HeroRepository
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
