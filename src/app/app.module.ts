import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PlatformModule } from './platform/platform.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthService } from './auth/auth.service';

import { gesturesReducer } from './reducers';
import { GesturesEffect } from './effects';

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
    PlatformModule,
    FlexLayoutModule,
    StoreModule.provideStore({
      gestures: gesturesReducer,
    }),
    EffectsModule.runAfterBootstrap(GesturesEffect),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
