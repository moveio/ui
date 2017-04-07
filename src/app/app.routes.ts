import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PlatformComponent } from './platform/platform.component';
import { platformRoutes } from './platform/platform.routes';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'landing', component: LandingComponent },
      { path: 'platform', component: PlatformComponent, children: [...platformRoutes] },
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
    ],
  },
];
