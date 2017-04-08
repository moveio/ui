import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MOCK_PIPELINES } from '../dashboard/dashboard.component';
import * as d3 from 'd3';
import { Gesture } from '../../models/gesture.model';
import { Store } from '@ngrx/store';
import { LOAD_GESTURES } from '../../reducers/gesture.reducer';

const ADD_GESTURE = 'ADD_GESTURE';
const REMOVE = 'REMOVE';
const NONE = 'NONE';
const DRAW_LINE = 'DRAW_LINE';

@Component({
  selector: 'app-pipeline-detail',
  templateUrl: './pipeline-detail.component.html',
  styleUrls: ['./pipeline-detail.component.scss'],
})
export class PipelineDetailComponent implements OnDestroy, AfterViewInit {

  subscriptions: Subscription[] = [];
  pipelineID: string;

  gestures: Gesture[];
  pipelines = MOCK_PIPELINES;
  selectedPipeline: any;

  mode: 'ADD_GESTURE' | 'DRAW_LINE' | 'REMOVE' | 'NONE' = 'NONE';
  newGesture: Gesture;

  lineGestureRect: any;

  gestureOrder = 0;
  svg: any;
  mouse: any;

  constructor(private activeRoute: ActivatedRoute, store: Store<any>) {

    store.dispatch({ type: LOAD_GESTURES });

    this.subscriptions.push(activeRoute.params.subscribe((params) => {
      this.pipelineID = params['id'];
      this.selectedPipeline = this.pipelines.find(item => item.id === this.pipelineID);
    }));

    this.subscriptions.push(store.select('gestures').subscribe((data: any) => {
      this.gestures = data;
    }));
  }

  ngAfterViewInit(): void {
    this.svg = d3.select('svg');

    this.svg.on('mousedown', () => {
      if (this.mode === ADD_GESTURE) {
        this.mouse = d3.mouse(d3.event.currentTarget);
        this.addGesture(this.newGesture);
        this.mode = NONE;
        this.newGesture = null;

      }
    });
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  startAdding(gesture: Gesture): void {
    this.newGesture = gesture;
    this.mode = ADD_GESTURE;
  }

  toggleRemoving(): void {
    this.mode = this.mode === REMOVE ? NONE : REMOVE;
  }


  addGesture(gesture: Gesture): void {

    const gestureID = 'gesture_' + this.gestureOrder.toString();
    const textID = 'text_' + this.gestureOrder.toString();
    this.gestureOrder += 1;

    const rect = this.svg.append('rect')
      .attr('x', this.mouse[0])
      .attr('y', this.mouse[1])
      .attr('width', 100)
      .attr('height', 50)
      .attr('fill', '#6699cc')
      .attr('id', gestureID)
      .style('cursor', 'pointer')
      .on('mousedown', () => {
        switch (this.mode) {
          case REMOVE :
            d3.select('#' + gestureID).remove();
            d3.select('#' + textID).remove();
            d3.selectAll('.' + gestureID).remove();
            break;

          case DRAW_LINE:

            this.svg.append('line')
              .attr('stroke-width', 4)
              .attr('x1', this.lineGestureRect.attr('x'))
              .attr('y1', this.lineGestureRect.attr('y'))
              .attr('x2', rect.attr('x'))
              .attr('y2', rect.attr('y'))
              .attr('stroke', 'black')
              .attr('class', this.lineGestureRect.attr('id') + ' ' + gestureID);
            this.mode = NONE;
            break;

          default:
            this.mode = DRAW_LINE;
            this.lineGestureRect = rect;
            break;
        }
      });

    this.svg.append('text')
      .text(gesture.name)
      .attr('fill', 'white')
      .attr('x', (+this.mouse[0] + 10))
      .attr('y', (+this.mouse[1] + 30))
      .attr('id', textID)
      .style('cursor', 'pointer')
      .on('mousedown', () => {
        switch (this.mode) {
          case REMOVE :
            d3.select('#' + gestureID).remove();
            d3.select('#' + textID).remove();
            d3.selectAll('.' + gestureID).remove();
            break;

          case DRAW_LINE:
            this.svg.append('line')
              .attr('stroke-width', 4)
              .attr('x1', this.lineGestureRect.attr('x'))
              .attr('y1', this.lineGestureRect.attr('y'))
              .attr('x2', rect.attr('x'))
              .attr('y2', rect.attr('y'))
              .attr('stroke', 'black')
              .attr('class', this.lineGestureRect.attr('id') + ' ' + gestureID);
            this.mode = NONE;
            break;

          default:
            this.mode = DRAW_LINE;
            this.lineGestureRect = rect;
            break;
        }
      });
  }


}
