import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/modals/question';

@Component({
  selector: 'app-mcq-page',
  templateUrl: './mcq-page.component.html',
  styleUrls: ['./mcq-page.component.scss']
})
export class McqPageComponent {


  @Input() question:Question;
  @Output('emit') questionEmitEvent= new EventEmitter<Question>();
  data=null;

  onClick(event) {
    console.log("index: ",event)
    this.questionEmitEvent.emit(this.question)
  }

  constructor() { }

}
