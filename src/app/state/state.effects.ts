import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, act } from "@ngrx/effects";
import * as TestActions from "./state.actions";
import { map, concatMap, catchError, tap, take } from 'rxjs/operators';
import { MainService } from '../main.service';
import { Observable, of } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { GlobalState } from './global.state';
import { onTestNotFetched, QuestionState } from '../shared/global';

@Injectable({
    providedIn:"root"
})
export class TestEffect {

    testID:number;

    constructor(
        private actions$: Actions,
        private ms: MainService,
        private store: Store<GlobalState>
    ) {
        store.pipe(select((state)=>state.test.id)).subscribe((id)=>{
            this.testID=id
        })
    }

    /**
     * This is version 2.
     * You can check version 1 down below in this file as commented.
     */
    GetTest$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(TestActions.GetTest),
        tap((action)=> 
                this.ms.getTest(action.id).pipe(
                    take(1),
                ).subscribe(
                    test => this.store.dispatch( TestActions.SetTest({ test })),
                    error => onTestNotFetched(error as string)
                )
        ),
    ), {dispatch:false});

    updateQuestion:Observable<Action> = createEffect(()=> this.actions$.pipe(
        ofType(TestActions.UpdateQuestion),
        tap((action) => 
            this.ms.updateQuestion(
                   this.testID ,action.question.id, action.question.checkedAnswerIndex
                ).subscribe(
                ()=> this.store.dispatch( TestActions.SetQuestion({ 
                    question:action.question
                })),
                error => console.log(error)
            )
        )
    ), { dispatch: false})

    clearResponse$:Observable<Action> = createEffect(()=> this.actions$.pipe(
        ofType(TestActions.ClearResponse),
        tap((action) => {
                this.ms.updateQuestion(this.testID, action.question.id, null).subscribe(
                    null,
                    error => console.log(error)
                )

        })
    ), { dispatch: false})    

    pauseTest$:Observable<Action> = createEffect(()=> this.actions$.pipe(
        ofType(TestActions.PauseTestServer),
        tap((action) => {
                this.ms.updateTime(this.testID, action.time).subscribe(
                    ()=> this.store.dispatch(TestActions.PauseTest({time:action.time})),
                    error => console.log(error)
                )

        })
    ), { dispatch: false})   


}

/**
 * Version one
 */
// GetTest$: Observable<Action> = createEffect(() => this.actions$.pipe(
//     ofType(TestActions.GetTest),
//     concatMap((action) =>
//         this.ms.getTest(action.id).pipe(
//             map(test => TestActions.SetTest({ test }))
//         )
//     ),
//     catchError(()=>of(TestActions.GetError()))
// ));