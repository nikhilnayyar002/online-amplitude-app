import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { QuestionsComponent } from './questions/questions.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { McqsComponent } from './mcqs/mcqs.component';
import { PageDirective } from '../page.directive';
import { ComponentsModule } from '../components/components.module';
import { MymoduleModule } from '../mymodule.module';


@NgModule({
  declarations: [QuestionsComponent, InstructionsComponent, McqsComponent, PageDirective],
  imports: [
    CommonModule,
    PageRoutingModule,
    ComponentsModule,
    MymoduleModule
  ]
})
export class PageModule { }
