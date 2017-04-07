import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestureDetailComponent } from './gesture-detail/gesture-detail.component';
import { PipelineListComponent } from './pipeline-list/pipeline-list.component';
import { PipelineDetailComponent } from './pipeline-detail/pipeline-detail.component';

export const platformRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'gesture/:id', component: GestureDetailComponent },
      { path: 'pipelines', component: PipelineListComponent },
      { path: 'pipeline/:id', component: PipelineDetailComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
