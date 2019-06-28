import { Component, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import config from 'src/config/config';
import { PageItem } from './page/page-items';
import { PageSwitchDirective } from './page-switch.directive';
import { PageService } from './page/page.service';
import { PageComponent } from './page/page-component.modal';
import {take} from 'rxjs/operators';
import { MainService } from './main.service';
import { QuestionState } from './shared/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //local config and mock data
  configData = config;

  //view Elements
  @ViewChild('pauseModalNoBtn',{static: false}) private pauseModalNoBtn:ElementRef;
  @ViewChild('pauseSubmitBtn',{static: false}) private pauseSubmitBtn:ElementRef;

  sideStateOpen = true; //let the side be opened
  shortenArrowMargin = (this.sideStateOpen) ? '-10px' : '0px';
  shortenArrowText = (this.sideStateOpen) ? "&rarr;" : "&larr;";

  //media match state variables
  matchMediaOBject: MediaQueryList;
  mediaQueryFunc1;
  mediaMatch:boolean=false;

  /* constructor  */
  constructor(
    private cdr: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ps:PageService,
    public ms:MainService
    ) { }


  /* Methods to handle display */

  shortenClick() {
    this.sideStateOpen == true ? this.displaySide(false) : this.displaySide(true)
  }

  displaySide(bool: boolean) {
    let main= <HTMLElement> document.querySelector('.main');
    if (bool) {
      this.shortenArrowText = "&rarr;";
      this.shortenArrowMargin = '-10px';
      this.sideStateOpen = true;

      if(this.mediaMatch) {
        // 320px value equal to width of side is hardcoded 
        main.style.width="calc(100% + 320px)";
        main.style.left="-320px";
      }
    }
    else {
      this.shortenArrowText = "&larr;";
      this.shortenArrowMargin = '0px';
      this.sideStateOpen = false;

      if(this.mediaMatch) {
        main.style.width="100%";
        main.style.left="0px";
      }     
    }
    if(!this.mediaMatch) {
      main.style.width="100%";
      main.style.left="0px";
    }
  }

  /* ng methods*/

  ngAfterViewInit(): void {

    /* handling media query */
    this.mediaQueryFunc1 =
      (function (x: MediaQueryList) {
        let main= <HTMLElement> document.querySelector('.main');
        if(x.matches) {
          this.mediaMatch=true;
          this.displaySide(false);
        }
        else {
          this.mediaMatch=false;
          this.displaySide(true);
        }
        this.cdr.detectChanges();
      }).bind(this)

    this.matchMediaOBject = window.matchMedia("(max-width: 900px)");
    this.matchMediaOBject.addListener(this.mediaQueryFunc1);
    setTimeout(() => this.mediaQueryFunc1(this.matchMediaOBject), 0)
    
    /* */
  }

  ngOnDestroy(): void {
    
    /* handling media object */
    if (this.matchMediaOBject && this.mediaQueryFunc1)
      this.matchMediaOBject.removeListener(this.mediaQueryFunc1);
    
    /** Clear the timer */
    this.clearTimer(); 
  }

  ngOnInit() {
    /**
     * get pages component and load default page
     */
    this.pageItems=this.ps.getPages();
    this.loadComponent('');
    /**
     * load questions from backend
     */
    this.ms.getTest().subscribe(
      () => {
        /**
         * Start the timer intially.
         */
        this.start()
      },
      (error: Error) => console.log(error)
    );
  }


  /* Loading the pages dyamically */

  pageItems: PageItem[];
  currentPage:string;
  defaultPage:string="Mcqs";

  @ViewChild(PageSwitchDirective, {static: true}) pageSwitchDirective: PageSwitchDirective;

  loadComponent(name:string) {

    if(!name) name=this.defaultPage;
    this.currentPage=name;
    const pageItem=this.pageItems.find(elem=> elem.data==name);

    const componentFactory = 
      this.componentFactoryResolver.resolveComponentFactory(pageItem.component);

    const viewContainerRef = this.pageSwitchDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<PageComponent>componentRef.instance).closeEvent.pipe(take(1)).subscribe(()=>{
      this.loadComponent(this.defaultPage)
    })

  }

  checkAndLoadComponent(name:string) {
    this.loadComponent(name)
    if(this.mediaMatch) 
      this.shortenClick()
  }

  /**/
  
  getBadgeType(type:QuestionState) {
    switch(type) {
      case QuestionState.Answered: return "badge-success"
      case QuestionState.Unanswered: return "badge-danger"
      case QuestionState.Marked: return "badge-primary"  
      /**
       * Here Markedanswered should have different icon
       */
      case QuestionState.Markedanswered: return "badge-primary"  
      case QuestionState.Unvisited: return "badge-secondary"
      default: return ''
    }
  }

  badgeClick(value:string) {
    let i= +value.split(':')[1]
    this.ms.checkCurrentQuestion()
    this.ms.setQuestionSelected(i)
  }

  /**
   * Error:  When no questions present at
   *    checkCurrentQuestion(), setQuestionSelected():  
   * 
   */
  sectionClick(index:number) {
    this.ms.checkCurrentQuestion()
    this.ms.setQuestionSelected(index)
    return false
  }

  returnSectionOfQuestion() {
    let sectionName='', index= (this.ms.selectedQuestionIndex+1)
    for(let section of this.ms.mockedTest.sections) {
      if(index >= section.startQ && index <= section.endQ) {
          sectionName=section.name
          break
      }
    }
    return sectionName
  }

  /**
   * Timer
   */
    
  intervalId = 0;

  clearTimer() { clearInterval(this.intervalId); }
 
  start() { this.countDown(); }
  stop()  {
    this.clearTimer();
  }
 
  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.ms.mockedTest.time -= 1;
      if ( this.ms.mockedTest.time === 0) {
        this.pause();
      }
    }, 1000);
  }

  pause() {
    this.pauseModalNoBtn.nativeElement.click();
    this.pauseSubmitBtn.nativeElement.click();
    this.stop();
  }


}
