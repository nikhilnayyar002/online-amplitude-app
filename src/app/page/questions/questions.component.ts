import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page-component.modal';
import { MainService } from 'src/app/main.service';
import { Question } from 'src/app/modals/question';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/state/global.state';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent extends PageComponent{

  questions:Question[];
  subsQ:Subscription;

  constructor(
    private store:Store<GlobalState>
  ) { 
    super()
    this.subsQ=this.store.pipe(select(state=>state.test.questions)).subscribe((questions)=>this.questions=questions)
  }

  ngOnDestroy(): void {
    this.subsQ.unsubscribe()
  }


}
