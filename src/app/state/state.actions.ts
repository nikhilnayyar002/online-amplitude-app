import { createAction, props } from '@ngrx/store';
import { QuestionState } from '../shared/global';
import { Test } from '../modals/test';
import { Question } from '../modals/question';

/**
 * Set the state of question. Eg: Answered, Marked etc.
 */
export const SetQuestionState = createAction(
  '[Question] State',
  props<{state:QuestionState, index:number}>()
);

/**
 * Here we get a test given id.
 * For dev purpose the id is simple as number
 */
export const GetTest = createAction(
    '[Test] Get',
    props<{id:number}>()
);

/**
 * Here we set the state of Test.
 * We actually fetched the test from main service and used effect to dispatch
 * this action.
 */
export const SetTest = createAction(
  '[Test] Set',
  props<{test:Test}>()
);

/**
 * Actions for currently selected question index
 */
export const SetIndex = createAction(
  '[Index] Set',
  props<{index:number}>()
);

/**
 * set the question in backend. For eg. updating options
 */
export const UpdateQuestion =createAction(
  '[Question] Update',
  props<{question:Question, index:number}>()
)

/**
 * set the question in store. For eg. updating options
 */
export const SetQuestion =createAction(
  '[Question] Set',
  props<{question:Question, index:number}>()
)

/** *************************************** Error Actions ******************** */

export const GetError = createAction(
  '[Error] Get'
);

