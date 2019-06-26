import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page-component.modal';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent extends PageComponent{

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
