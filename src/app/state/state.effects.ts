import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as TestActions from "./state.actions";
import { map, concatMap, catchError, tap, take } from 'rxjs/operators';
import { MainService } from '../main.service';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { GlobalState } from './global.state';
import { onTestNotFetched } from '../shared/global';

@Injectable({
    providedIn:"root"
})
export class TestEffect {

    constructor(
        private actions$: Actions,
        private ms: MainService,
        private store: Store<GlobalState>
    ) { }

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
            this.ms.updateQuestion(action.question).subscribe(
                ()=> this.store.dispatch( TestActions.SetQuestion({ 
                    question:action.question, index:action.index
                })),
                error => console.log(error)
            )
        )
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