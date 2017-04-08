import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CREATE_GESTURE, LOAD_GESTURES } from '../../reducers';
import { Resource, Gesture } from '../../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
  },
];

export const MOCK_GESTURES = [
  {
    id: 'dsd5a5s3d5as5da1asd84ass',
    name: 'Gesture1',
    description: 'Lorem ipsum...',
  },
  {
    id: 'dsd5a5dasd4asd31sd454as',
    name: 'Gesture2',
    description: 'Random description',
  },
  {
    id: 'dsd5a5s3d5a89s31ydsa84d',
    name: 'Gesture3',
    description: 'Random description asdfa',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  pipelines = MOCK_PIPELINES;

  gestures: Observable<Resource<Gesture>>;

  constructor(private router: Router, private store: Store<any>) {
    this.gestures = store.select('gestures');

    this.store.dispatch({ type: LOAD_GESTURES });
  }

  redirectToPipeline(id: string) {
    this.router.navigateByUrl('/platform/pipeline/' + id);
  }

  redirectToGesture(id: string) {
    this.router.navigateByUrl('/platform/gesture/' + id);
  }

}
