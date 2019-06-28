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

  constructor(
    public ms:MainService
  ) { 
    super()
  }

  onEmit(question:Question) {
    this.ms.updateQuestion(question)
  }

  next() {
    let i=this.ms.getNextQuestionIndex();
    if(this.ms.checkCurrentQuestion() == QuestionState.Markedanswered)
      this.ms.setQuestionState(QuestionState.Answered)
    this.ms.setQuestionSelected(i)
  }

  mark() {
    this.ms.markCurrentQuestion()
    let i=this.ms.getNextQuestionIndex();
    this.ms.setQuestionSelected(i)
  }

  clear() {
    this.ms.clearCurrentQuestion()
  }

}
