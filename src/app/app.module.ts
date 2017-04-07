import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PlatformModule } from './platform/platform.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    PlatformModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
