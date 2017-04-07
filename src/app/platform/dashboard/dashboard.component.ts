import { Component } from '@angular/core';
import { Router } from '@angular/router';

export const MOCK_PIPELINES = [
  {
    id: 'dsd5a5s3d5as5da1sd454as',
    name: 'Pipeline1',
    description: 'Lorem ipsum...',
  },
  {
    id: 'dsd5a5s3d5a89s31sd454as',
    name: 'Pipeline2',
    description: 'Random description',
  },
  {
    id: 'dsd5a5s3d5a89s31yt854as',
    name: 'Pipeline3',
    description: 'Random description asdfa',
  },
  {
    id: 'dsd3f3f3d5a89s31sd454as',
    name: 'Pipeline4',
    description: 'A tiny little bit longer description just to ensure text wrapping',
  }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  pipelines = MOCK_PIPELINES;

  constructor(private router: Router) {
  }

  redirectToPipeline(id: string) {
    this.router.navigateByUrl('/platform/pipeline/' + id);
  }

}
