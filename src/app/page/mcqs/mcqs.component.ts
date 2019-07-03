import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page-component.modal';
import { MainService } from 'src/app/main.service';
import { Question } from 'src/app/modals/question';
import { QuestionState, checkAndGetQuestionState, getNextQuestionIndex } from 'src/app/shared/global';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { GlobalState } from 'src/app/state/global.state';
import { SetQuestionState, SetIndex, UpdateQuestion, ClearResponse } from 'src/app/state/state.actions';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-mcqs',
  templateUrl: './mcqs.component.html',
  styleUrls: ['./mcqs.component.scss']
})
export class McqsComponent extends PageComponent{


  questions:Question[];
  index:number;

  subs=new SubSink();

  constructor(
    private store:Store<GlobalState>
  ) { 
    super()
    this.subs.add(
      store.pipe(select(state=>state.other.index)).subscribe(index => this.index=index)
    )
    this.subs.add(
      this.store.pipe(select(state=>state.test.questions)).subscribe((questions)=>this.questions=questions)
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  onEmit(question:Question) {
   this.store.dispatch(UpdateQuestion({question:question}))
  }

  next() {
    let state=checkAndGetQuestionState(this.questions[this.index])
    if(state == QuestionState.Markedanswered)  state=QuestionState.Answered
    this.store.dispatch(SetQuestionState({state:state, index:this.index}))
    let i=getNextQuestionIndex(this.questions,this.index)
    this.store.dispatch(SetIndex({index:i}))
  }

  mark() {
    this.store.dispatch(SetQuestionState({state:QuestionState.Marked, index:this.index}))
    let i=getNextQuestionIndex(this.questions,this.index)
    this.store.dispatch(SetIndex({index:i}))
  }

  clear() {
    this.store.dispatch(ClearResponse({question:this.questions[this.index]})) 
    this.store.dispatch(SetQuestionState({state:QuestionState.Unvisited, index:this.index})) 
  }

}
