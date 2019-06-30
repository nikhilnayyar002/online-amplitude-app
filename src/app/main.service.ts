import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Question } from './modals/question';
import config from 'src/config/config';
import { catchError, tap } from 'rxjs/operators';
import { Test } from './modals/test';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  mockedTest:Test;
  selectedQuestionIndex: number;

  constructor(private http: HttpClient) { }

  /**
   * Fetches questions and sets the questions array locally
   */
  getTest(id:number): Observable<Test> {
    return this.http.get<Test>(config.api.baseURL +'/' + id)
      .pipe(
        catchError(this.handleError)
      )
  }

  /**
   * 
   * @param updatedQuestion 
   * It is the question containing modified "checkedAnswerIndex" property.
   * 
   * The method currently updates the mocked Array @question having id same
   * as that of @updatedQuestion .
   * 
   */
  updateQuestion(updatedQuestion: Question) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(config.api.baseURL, updatedQuestion, httpOptions)
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `Message: ${error.statusText}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try reloading the page');
  };

}
