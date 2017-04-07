import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestureDetailComponent } from './gesture-detail/gesture-detail.component';
import { PipelineDetailComponent } from './pipeline-detail/pipeline-detail.component';
import { PipelineListComponent } from './pipeline-list/pipeline-list.component';
import { PlatformComponent } from './platform.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    PlatformComponent,
    DashboardComponent,
    GestureDetailComponent,
    PipelineDetailComponent,
    PipelineListComponent,
  ],
  exports: [
    PlatformComponent,
    DashboardComponent,
    GestureDetailComponent,
    PipelineDetailComponent,
    PipelineListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    FlexLayoutModule,
  ],
})
export class PlatformModule {
}
