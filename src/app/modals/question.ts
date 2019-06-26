import { QuestionState } from '../shared/global';

export interface Question {
    content:string;
    image:string;
    isComprehension:boolean;
    comprehensionContent:string;
    answers:Array<string>;
    state:QuestionState;
    checkedAnswerIndex:number;
    marks:number;

    /*currently for dev. purpose: in-momory-api*/
    id:number; 
    
}
