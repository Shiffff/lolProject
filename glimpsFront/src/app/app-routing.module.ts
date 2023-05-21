import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './Pages/welcome-page/welcome-page.component';
import { ChampionDetailComponent } from './Pages/champion-detail/champion-detail.component';
import { ChampionListComponent } from './Pages/champion-list/champion-list.component';
import { AboutComponent } from './Pages/about/about.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
{
path: '',
component: WelcomePageComponent
},
{
path: '',
component: LayoutComponent,
children: [
{
path: 'champions',
component: ChampionListComponent
},
{
path: 'champion/:id',
component: ChampionDetailComponent
},
{
path: 'about',
component: AboutComponent
},
{
path: '**', 
component: NotFoundComponent
}
]
}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }