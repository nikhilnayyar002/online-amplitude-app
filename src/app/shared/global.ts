import { ChangeDetectorRef } from '@angular/core';
import { Question } from '../modals/question';

export enum QuestionState {
  Marked = "Marked",
  Unvisited = "Unvisited",
  Markedanswered = "Markedanswered",
  Answered = "Answered",
  Unanswered = "Unanswered"
}

export interface MediaQueryState {
  dispose: () => void;
  isMediaMatched: () => boolean;
  runMediaQuery: ()=> void;
}


export function createMediaQuery(
  queryStr, callback: (x: boolean) => void, cdr: ChangeDetectorRef
): MediaQueryState {
  let mediaQueryObject: MediaQueryList
  let mediaMatch = false

  /* handling media query */
  let mediaQueryFunction: any = function (x: MediaQueryList) {
    mediaMatch = x.matches
    callback(mediaMatch)
    cdr.detectChanges();
  }

  mediaQueryObject = window.matchMedia(queryStr);
  mediaQueryObject.addListener(mediaQueryFunction);
  
  return {
    dispose: () => {
      mediaQueryObject.removeListener(mediaQueryFunction);
    },
    isMediaMatched: () => mediaMatch,
    runMediaQuery:()=> setTimeout(() => mediaQueryFunction(mediaQueryObject), 0)
  }
}

/**
 * @ special
 */

export class SideState {

     sideStateOpen = true;
     shortenArrowMargin = (this.sideStateOpen) ? '-10px' : '0px';
     shortenArrowText = (this.sideStateOpen) ? "&rarr;" : "&larr;";

    toggler = (bool: boolean, mediaMatch: boolean) => {
      let main = <HTMLElement>document.querySelector('.main');
      if (bool == null) bool = !this.sideStateOpen //on shortenClick(). see app.component.ts

      if (bool) {
        this.shortenArrowText = "&rarr;";
        this.shortenArrowMargin = '-10px';
        this.sideStateOpen = true;

        if (mediaMatch) {
          // 320px value equal to width of side is hardcoded 
          main.style.width = "calc(100% + 320px)";
          main.style.left = "-320px";
        }
      }
      else {
        this.shortenArrowText = "&larr;";
        this.shortenArrowMargin = '0px';
        this.sideStateOpen = false;

        if (mediaMatch) {
          main.style.width = "100%";
          main.style.left = "0px";
        }
      }
      if (!mediaMatch) {
        main.style.width = "100%";
        main.style.left = "0px";
      }
    }
}

/**
 * special function
 */
/**
 * Checks the current question and updates it status.
 * This method is to be called before @setQuestionSelected 
 */
export function checkAndGetQuestionState(question: Question) {
  let state: QuestionState;
  if (question.checkedAnswerIndex != null) {
    if (question.state == QuestionState.Marked)
      state = QuestionState.Markedanswered;
    if (question.state != QuestionState.Markedanswered)
      state = QuestionState.Answered;
  }
  else {
    if (question.state == QuestionState.Markedanswered)
      state = QuestionState.Marked;
    if (question.state != QuestionState.Marked)
      state = QuestionState.Unanswered;
  }
  return state
}

/**
* returns next question @index relative to current index
* 
*/
export function getNextQuestionIndex(questions: Question[], index: number): number {
  return (index < questions.length - 1) ? (index + 1) : 0
}

/**
 * this is what we do when test is not fetched
 * Also this is function is called when test is over. see @isTestOverNotif parameter.
 */
export function onTestNotFetched(error:string, isTestOverNotif=false) {
  if(!isTestOverNotif) {
    (<HTMLElement>document.querySelector("#error-message")).innerText=error;
    (<HTMLButtonElement>document.querySelector("#error-btn")).click();
  }
  let btns=document.querySelectorAll('[type="button"]')
  btns.forEach((btn)=> (<HTMLButtonElement>btn).disabled=true)
}

/**
 * Toggle Full Screen
 */
function openFullscreen(elem:any) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((<any>document).mozCancelFullScreen) {
    (<any>document).mozCancelFullScreen();
  } else if ((<any>document).webkitExitFullscreen) {
    (<any>document).webkitExitFullscreen();
  } else if ((<any>document).msExitFullscreen) {
    (<any>document).msExitFullscreen();
  }
}


export function toggleFullScreen(bool:boolean,elem=document.documentElement) {
  if(bool) openFullscreen(elem)
  else closeFullscreen()
}