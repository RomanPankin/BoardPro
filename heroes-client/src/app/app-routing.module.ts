import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layout
import { PageFightComponent } from './layout/page-fight/page-fight.component';
import { PageResultComponent } from './layout/page-result/page-result.component';
import { PageRulesComponent } from './layout/page-rules/page-rules.component';

const routes: Routes = [
   { path: 'fight', component: PageFightComponent },
   { path: 'result/:status/:id/:score', component: PageResultComponent },
   { path: '**', component: PageRulesComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
