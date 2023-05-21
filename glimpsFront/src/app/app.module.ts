import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './Pages/welcome-page/welcome-page.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { AboutComponent } from './Pages/about/about.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { ChampionDetailComponent } from './Pages/champion-detail/champion-detail.component';
import { ChampionListComponent } from './Pages/champion-list/champion-list.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    NotFoundComponent,
    ChampionDetailComponent,
    ChampionListComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
