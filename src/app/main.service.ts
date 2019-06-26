import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Question } from './modals/question';
import config from 'src/config/config';
import { catchError, tap } from 'rxjs/operators';
import { QuestionState } from './shared/global';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  questions: Question[];
  selectedQuestionIndex: number;
  error: Error;



  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  /**
   * Intially called. Fetches questions and sets the questions array locally
   */
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(config.api.baseURL)
      .pipe(
        tap((questions: Question[]) => {
          /**
           * initialize the stage
           */
          this.questions = questions;
          this.selectedQuestionIndex = 0;
        }),
        catchError(this.handleError)
      )
  }

  /**
   * 
   * @param id is the id of question to be selected right now.
   */
  setQuestionSelected(id: number) {
    if (this.selectedQuestionIndex == id) return;
    this.selectedQuestionIndex = id;
  }

  /**
   * returns next question @index relative to current index
   * 
   */
  getNextQuestionIndex(): number {
    return (this.selectedQuestionIndex < this.questions.length - 1) ?
      (this.selectedQuestionIndex + 1) : 0
  }

  /**
   * Checks the current question and updates it status.
   * This method is to be called before @setQuestionSelected 
   */
  checkCurrentQuestion() {
    let currentQ = this.questions[this.selectedQuestionIndex];
    /** Added for next button basically */
    if (currentQ.checkedAnswerIndex != null) {
      if (currentQ.state == QuestionState.Marked)
        currentQ.state = QuestionState.Markedanswered;
      if (currentQ.state != QuestionState.Markedanswered)
        currentQ.state = QuestionState.Answered;
    }
    else {
      if (currentQ.state == QuestionState.Markedanswered)
        currentQ.state = QuestionState.Marked;
      if (currentQ.state != QuestionState.Marked)
        currentQ.state = QuestionState.Unanswered;
    }
    return  currentQ.state
  }

  setQuestionState(state:QuestionState) {
    this.questions[this.selectedQuestionIndex].state=state;
  }

  /**
   * set status @Marked on the current question.
   * Does not set for @Markedanswered as @checkCurrentQuestion handles it.
   */
  markCurrentQuestion() {
    this.questions[this.selectedQuestionIndex].state = QuestionState.Marked;
  }

  /**
   * marks the question as @Unvisited and clears it @checkedAnswerIndex property
   */
  clearCurrentQuestion() {
    let q = this.questions[this.selectedQuestionIndex];
    q.state = QuestionState.Unvisited;
    q.checkedAnswerIndex = null
  }

  /**
   * 
   * @param updatedQuestion 
   * It is the question containing modified "checkedAnswerIndex" property.
   * 
   * The method currently updates the mocked Array @question having id same
   * as that of @updatedQuestion .
   * Then subscribe and updates local @questions array in this service.
   * 
   */
  updateQuestion(updatedQuestion: Question) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.put(config.api.baseURL, updatedQuestion, httpOptions).pipe(
      catchError(this.handleError)
    )
      .subscribe(() => {
        this.questions[this.selectedQuestionIndex].checkedAnswerIndex = updatedQuestion.checkedAnswerIndex
        /**
         *  X- Whole array will be reupdated on every click on radio button 
         *  Since array items remain same, only Q updates therefore
         *  no need for slice() etc.
         */
        //this.questions[this.selectedQuestionIndex]= {...updatedQuestion}
        //this.questions=this.questions.slice();
        this.questions[this.selectedQuestionIndex] = updatedQuestion;
      },
        (error: Error) => this.error = error
      );
  }


}
