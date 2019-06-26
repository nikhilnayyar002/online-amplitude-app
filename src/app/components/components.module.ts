import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { McqPageComponent } from './mcq-page/mcq-page.component';
import { OverallTestDetailComponent } from './overall-test-detail/overall-test-detail.component';
import { FormsModule} from '@angular/forms'
import { MymoduleModule } from '../mymodule.module';

@NgModule({
  declarations: [McqPageComponent, OverallTestDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsRoutingModule,
    MymoduleModule
  ],
  exports:[McqPageComponent, OverallTestDetailComponent]
})
export class ComponentsModule { }
