import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page-component.modal';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent extends PageComponent{

  constructor(
    public ms:MainService
  ) {
    super()
  }

  ngOnInit() {
  }

}
