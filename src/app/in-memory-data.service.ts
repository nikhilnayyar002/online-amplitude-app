import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import { mockedTests } from './shared/mock';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const tests=mockedTests;
    return {
      // 'api/tests'
      tests
    }
  }
}
