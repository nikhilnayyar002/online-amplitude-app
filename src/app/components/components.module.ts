import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McqPageComponent } from './mcq-page/mcq-page.component';
import { OverallTestDetailComponent } from './overall-test-detail/overall-test-detail.component';
import { FormsModule} from '@angular/forms'
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [McqPageComponent, OverallTestDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports:[McqPageComponent, OverallTestDetailComponent]
})
export class ComponentsModule { }
