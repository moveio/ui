import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LOAD_GESTURES } from '../../reducers';
import { Gesture, Resource } from '../../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CREATE_GESTURE } from '../../reducers/gesture.reducer';
import { Pipeline } from '../../models/pipeline.model';
import { Subscription } from 'rxjs/Subscription';
import { CREATE_PIPELINE, LOAD_PIPELINES } from '../../reducers/pipeline.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {

  pipelines: Pipeline[];

  gestures: Observable<Resource<Gesture>>;

  gestureAdding = false;
  pipelineAdding = false;

  newGesture: Gesture = this.createNewGesture();
  newPipeline: Pipeline = this.createNewPipeline();

  subscriptions: Subscription[] = [];

  gestureTypes: string[] = [
    'left',
    'right',
  ];


  constructor(private router: Router, private store: Store<any>) {
    this.store.dispatch({ type: LOAD_GESTURES });
    this.store.dispatch({ type: LOAD_PIPELINES });

    this.gestures = store.select('gestures');

    this.subscriptions.push(this.store.select('pipelines').subscribe((data: any) => {
      this.pipelines = data;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  createNewGesture(): Gesture {
    return {
      name: '',
      description: '',
      meta: '',
    };
  }

  createNewPipeline(): Pipeline {
    return {
      name: '',
      description: '',
    };
  }

  redirectToPipeline(id: string) {
    this.router.navigateByUrl('/platform/pipeline/' + id);
  }

  redirectToGesture(id: string) {
    this.router.navigateByUrl('/platform/gesture/' + id);
  }

  toggleAddingGesture(): void {
    this.gestureAdding = !this.gestureAdding;
  }

  toggleAddingPipeline(): void {
    this.pipelineAdding = !this.pipelineAdding;
  }

  addPipeline(): void {
    this.store.dispatch({ type: CREATE_PIPELINE, payload: this.newPipeline });
    this.newPipeline = this.createNewPipeline();
    this.toggleAddingPipeline();
  }

  addGesture(): void {
    this.store.dispatch({ type: CREATE_GESTURE, payload: this.newGesture });
    this.newGesture = this.createNewGesture();
    this.toggleAddingGesture();
  }

}
