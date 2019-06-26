import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { McqPageComponent } from './mcq-page/mcq-page.component';
import { McqStateBadgeComponent } from './mcq-state-badge/mcq-state-badge.component';
import { OverallTestDetailComponent } from './overall-test-detail/overall-test-detail.component';
import { FormsModule} from '@angular/forms'

@NgModule({
  declarations: [McqPageComponent, McqStateBadgeComponent, OverallTestDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsRoutingModule
  ],
  exports:[McqPageComponent, McqStateBadgeComponent, OverallTestDetailComponent]
})
export class ComponentsModule { }
