import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { MOCK_GESTURES } from '../dashboard/dashboard.component';
import { Gesture } from '../../models/gesture.model';
import { Store } from '@ngrx/store';
import { DELETE_GESTURE, LOAD_GESTURES } from '../../reducers/gesture.reducer';

@Component({
  selector: 'app-gesture-detail',
  templateUrl: './gesture-detail.component.html',
  styleUrls: ['./gesture-detail.component.scss'],
})
export class GestureDetailComponent implements OnDestroy {

  subscriptions: Subscription [] = [];
  gestureID: string;
  gestures: Gesture [] = MOCK_GESTURES;
  selectedGesture: Gesture;

  constructor(private activeRoute: ActivatedRoute, private store: Store<Gesture>, private router: Router) {
    this.subscriptions.push(activeRoute.params.subscribe(params => {
      this.gestureID = params['id'];
      this.selectedGesture = this.gestures.find(item => item.id === this.gestureID);
    }));

    this.subscriptions.push(store.select('gestures').subscribe((data: Gesture[]) => {
      this.gestures = data;
      if (this.gestureID) {
        this.selectedGesture = this.gestures.find(item => item.id === this.gestureID);
      }
    }));

    this.store.dispatch({ type: LOAD_GESTURES });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  deleteGesture(): void {
    this.store.dispatch({ type: DELETE_GESTURE, payload: this.gestureID });
    this.router.navigateByUrl('/platform/dashboard');
  }


}
