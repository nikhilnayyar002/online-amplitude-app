import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/modals/question';
import { QuestionState, checkAndGetQuestionState } from 'src/app/shared/global';
import { Store, select } from '@ngrx/store';
import { GlobalState } from 'src/app/state/global.state';
import { Observable, Subscription } from 'rxjs';
import { SetQuestionState, SetIndex } from 'src/app/state/state.actions';
import {SubSink} from 'subsink'

@Component({
  selector: 'app-mcq-states',
  templateUrl: './mcq-states.component.html',
  styleUrls: ['./mcq-states.component.scss']
})
export class McqStatesComponent {

  questions:Question[];
  index:number;
  private isTestOver=false;
  
  subs=new SubSink();

  constructor(
    private store:Store<GlobalState>
  ) { 
    this.subs.add(
      store.pipe(select(state=>state.other)).subscribe(other => {
        this.index=other.index;
        this.isTestOver=other.isTestOver;
      })
    )
    this.subs.add(
      this.store.pipe(select(state=>state.test.questions)).subscribe((questions)=>this.questions=questions)
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  /**
   * Get a bootstrap badge class 
   * given the state of Question. This gives badges color.
   * Eg: Unanswered question are red in color.
   */
  getBadgeType(type: QuestionState) {
    switch (type) {
      case QuestionState.Answered: return "badge-success"
      case QuestionState.Unanswered: return "badge-danger"
      case QuestionState.Marked: return "badge-primary"
      /**
       * Here Markedanswered should have different icon
       */
      case QuestionState.Markedanswered: return "badge-primary"
      case QuestionState.Unvisited: return "badge-secondary"
      default: return ''
    }
  }

  /**
   * click the badge and get a question selected.
   */
  badgeClick(value: string) {
    if(this.isTestOver) return
    let i = +value.split(':')[1]
    let state=checkAndGetQuestionState(this.questions[this.index])
    this.store.dispatch(SetQuestionState({state:state, index:this.index}))
    this.store.dispatch(SetIndex({index:i}))
  }


}
