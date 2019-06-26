import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import { mockedTest } from './shared/mock';
import { Question } from './modals/question';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const questions=mockedTest.questions;
    return {
      questions
    }
  }
  genId(questions: Question[]): number {
    return questions.length > 0 ? Math.max(...questions.map(question => question.id)) + 1 : 0;
  }
}
