import { Question } from './question';

export interface Test {
    name:string;
    questions:Array<Question>;
    sections:null;
}