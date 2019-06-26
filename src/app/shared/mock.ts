import { QuestionState } from './global';
import { Question } from '../modals/question';
import { Test } from '../modals/test';

const mockedQuestions:Array<Question>=[
    {
        content:"MCQ 1",
        image:"",
        isComprehension:false,
        answers:[
            "1",
            "2",
            "3",
            "4"
        ],
        state:QuestionState.Unvisited,
        checkedAnswerIndex:null,
        marks:3,
        id:0
    },
    {
        content:"MCQ 2",
        image:"",
        isComprehension:false,
        answers:[
            "1",
            "2",
            "3",
            "4"
        ],
        state:QuestionState.Unvisited,
        checkedAnswerIndex:null,
        marks:3,
        id:1
    },
    {
        content:"MCQ 3",
        image:"",
        isComprehension:false,
        answers:[
            "1",
            "2",
            "3",
            "4"
        ],
        state:QuestionState.Unvisited,
        checkedAnswerIndex:null,
        marks:3,
        id:2
    },
        
];

export const mockedTest:Test={
    name:"mockedTest",
    questions:mockedQuestions,
    sections:null
};

