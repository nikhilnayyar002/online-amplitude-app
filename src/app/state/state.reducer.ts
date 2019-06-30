import { Test } from '../modals/test';
import * as TestActions from "./state.actions";
import { createReducer, on, Action } from '@ngrx/store';
import { QuestionState } from '../shared/global';

export const initialTestState:Test = {
    name:'',
    questions:[],
    sections:[],
    time:0,
    id:0
};

const testReducer = createReducer(
    initialTestState,
    on(TestActions.SetTest,(state,action)=>(action.test)),
    on(TestActions.SetQuestionState, (state, action)=>{
        state.questions[action.index].state=action.state
        if(action.state==QuestionState.Unvisited)
            state.questions[action.index].checkedAnswerIndex=null
        state.questions=state.questions.slice()
        return state
    }),
    on(TestActions.SetQuestion, (state,action)=> {
        /**
         * Actually the question.checkedAnswerIndex primitive property has changed
         * Anywhere this primitive property i referenced, there changes will be reflected
         * For eg: the checkbox value property in mcq component 
         */
        state.questions[action.index]=action.question
        return state
    })
);

export function tReducer (state:Test|undefined,action:Action) {
    return testReducer(state,action)
}

/**
 * index of currently selected question 
 */
const intialIndexState=0;

const indexReducer = createReducer(
    intialIndexState,
    on(TestActions.SetIndex,(state,action)=>(action.index))
);

export function Ireducer (state:number|undefined,action:Action) {
    return indexReducer(state,action)
}