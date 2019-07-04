import { Test } from '../modals/test';

export interface TestOtherState {
    index:number;
    isTestOver:boolean;
}

export interface GlobalState {
    test:Test;
    other:TestOtherState;
}