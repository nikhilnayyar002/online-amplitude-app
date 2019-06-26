import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page-component.modal';
import { MainService } from 'src/app/main.service';
import { Question } from 'src/app/modals/question';
import { QuestionState } from 'src/app/shared/global';

@Component({
  selector: 'app-mcqs',
  templateUrl: './mcqs.component.html',
  styleUrls: ['./mcqs.component.scss']
})
export class McqsComponent extends PageComponent{

  updatedQuestion:Question=null;

  constructor(
    public ms:MainService
  ) { 
    super()
  }

  onEmit(question:Question) {
      this.updatedQuestion=question;
  }


}
