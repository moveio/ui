import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MOCK_PIPELINES } from '../dashboard/dashboard.component';
import * as d3 from 'd3';
import { Gesture } from '../../models/gesture.model';
import { Store } from '@ngrx/store';
import { LOAD_GESTURES } from '../../reducers/gesture.reducer';
import { LOAD_HOOKS } from 'app/reducers/hooks.reducer';
import { Hook } from '../../models/hook.model';

const ADD_ELEMENT = 'ADD_ELEMENT';
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
  hooks: Hook[];
  pipelines = MOCK_PIPELINES;
  selectedPipeline: any;

  mode: 'ADD_ELEMENT' | 'DRAW_LINE' | 'REMOVE' | 'NONE' = 'NONE';
  newElement: Gesture | Hook;
  newElementType: string;

  lineGestureRect: any;

  elementOrder = 0;
  svg: any;
  mouse: any;

  constructor(private activeRoute: ActivatedRoute, store: Store<any>) {

    store.dispatch({ type: LOAD_GESTURES });
    store.dispatch({ type: LOAD_HOOKS });

    this.subscriptions.push(activeRoute.params.subscribe((params) => {
      this.pipelineID = params['id'];
      this.selectedPipeline = this.pipelines.find(item => item.id === this.pipelineID);
    }));

    this.subscriptions.push(store.select('gestures').subscribe((data: any) => {
      this.gestures = data;
    }));

    this.subscriptions.push(store.select('hooks').subscribe((data: any) => {
      this.hooks = data;
    }));
  }

  ngAfterViewInit(): void {
    this.svg = d3.select('svg');

    this.svg.on('mousedown', () => {
      if (this.mode === ADD_ELEMENT) {
        this.mouse = d3.mouse(d3.event.currentTarget);
        this.addElement(this.newElement);
        this.mode = NONE;
        this.newElement = null;

      }
    });
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  startAdding(element: Gesture | Hook, type: 'gesture' | 'hook' = 'gesture'): void {
    this.newElementType = type;
    this.newElement = element;
    this.mode = ADD_ELEMENT;
  }

  toggleRemoving(): void {
    this.mode = this.mode === REMOVE ? NONE : REMOVE;
  }

  mouseDownHandler(rect: any, elementID: string, textID: string) {
    switch (this.mode) {
      case REMOVE :
        console.log(elementID, textID);
        d3.select('#' + elementID).remove();
        d3.select('#' + textID).remove();
        d3.selectAll('.' + elementID).remove();
        break;

      case DRAW_LINE:

        this.svg.append('line')
          .attr('stroke-width', 4)
          .attr('x1', this.lineGestureRect.attr('x'))
          .attr('y1', this.lineGestureRect.attr('y'))
          .attr('x2', rect.attr('x'))
          .attr('y2', rect.attr('y'))
          .attr('stroke', 'black')
          .attr('class', this.lineGestureRect.attr('id') + ' ' + elementID);
        this.mode = NONE;
        break;

      default:
        this.mode = DRAW_LINE;
        this.lineGestureRect = rect;
        break;
    }
  }

  addElement(element: Gesture | Hook): void {
    const color = this.newElementType === 'gesture' ? '#6699cc' : '#33bb25';
    const elementID = 'element_' + this.elementOrder.toString();
    const textID = 'text_' + this.elementOrder.toString();
    this.elementOrder += 1;

    const rect = this.svg.append('rect')
      .attr('x', this.mouse[0])
      .attr('y', this.mouse[1])
      .attr('width', 150)
      .attr('height', 50)
      .attr('fill', color)
      .attr('id', elementID)
      .style('cursor', 'pointer');

    rect.on('mousedown', () => {
      this.mouseDownHandler(rect, elementID, textID);
    });

    this.svg.append('text')
      .text(element.name)
      .attr('fill', 'white')
      .attr('x', (+this.mouse[0] + 10))
      .attr('y', (+this.mouse[1] + 30))
      .attr('id', textID)
      .style('cursor', 'pointer')
      .on('mousedown', () => {
        this.mouseDownHandler(rect, elementID, textID);
      });
  }


}
