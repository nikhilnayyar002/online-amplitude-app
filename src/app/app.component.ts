import { Component, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import config from 'src/config/config';
import { PageItem } from './page/page-items';
import { PageSwitchDirective } from './page-switch.directive';
import { PageService } from './page/page.service';
import { PageComponent } from './page/page-component.modal';
import { take } from 'rxjs/operators';
import { createMediaQuery, MediaQueryState, SideState, checkAndGetQuestionState } from './shared/global';
import { Store, select } from '@ngrx/store';
import { Test } from './modals/test';
import * as TestActions from './state/state.actions'
import { GlobalState } from './state/global.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //new variables
  test: Test ;
  index: number;

  //local config
  configData = config;

  /* constructor  */
  constructor(
    private cdr: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ps: PageService,
    private store: Store<GlobalState>
  ) { }

  // media state and side toggler state
  sideState = new SideState();
  mediaQueryState: MediaQueryState=createMediaQuery(
    "(max-width: 900px)", (x: boolean) => this.sideState.toggler(!x, x), this.cdr
  );

  shortenClick() {
    this.sideState.toggler(null, this.mediaQueryState.isMediaMatched())
  }


  /* ng methods ****************************************************************/

  ngAfterViewInit(): void {
    this.mediaQueryState.runMediaQuery()
  }

  ngOnDestroy(): void {

    /* handling media object disposal*/
    this.mediaQueryState.dispose()

    /** Clear the timer */
    this.clearTimer();
  }

  ngOnInit() {
    /**
    * get pages component and load default page
    */
    this.pageItems = this.ps.getPages();
    this.loadComponent('');
    
    /**
     * load questions from backend
     */
    this.store.dispatch(TestActions.GetTest({id:1}))
    this.store.pipe(select((state)=>state.test)).subscribe((test)=>{
      this.test=test
      if (test.time) this.start()
    })
    this.store.pipe(select((state)=>state.index)).subscribe((index)=> this.index=index)
  }


  /* Loading the pages dyamically ****************************************** */

  pageItems: PageItem[];
  currentPage: string;
  defaultPage: string = "Mcqs";

  @ViewChild(PageSwitchDirective, { static: true }) pageSwitchDirective: PageSwitchDirective;

  loadComponent(name: string) {

    if (!name) name = this.defaultPage;
    this.currentPage = name;
    const pageItem = this.pageItems.find(elem => elem.data == name);

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(pageItem.component);

    const viewContainerRef = this.pageSwitchDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<PageComponent>componentRef.instance).closeEvent.pipe(take(1)).subscribe(() => {
      this.loadComponent(this.defaultPage)
    })

  }

  /**
   * introduced for small screen. So that on loading a different page the side
   * gets closed.
   * 
   * */
  checkAndLoadComponent(name: string) {
    this.loadComponent(name)
    if (this.mediaQueryState.isMediaMatched()) this.shortenClick()
  }

  //******************************************************** section */

  /**
   * section dropdown items click handler
   */
  sectionClick(index: number) {
    let state=checkAndGetQuestionState(this.test.questions[this.index])
    this.store.dispatch(TestActions.SetIndex({index:index}))
    return false
  }
  /**
   * return the section given question
   */
  returnSectionOfQuestion() {
    let sectionName = '', index = (this.index + 1)
    for (let section of this.test.sections) {
      if (index >= section.startQ && index <= section.endQ) {
        sectionName = section.name
        break
      }
    }
    return sectionName
  }

  /**
   * Timer things over here ***********************************************
   */

  intervalId = 0;

  clearTimer() { clearInterval(this.intervalId); }
  start() { this.countDown(); }
  stop() {
    this.clearTimer();
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.test.time -= 1;
      if (this.test.time === 0) {
        this.pause();
      }
    }, 1000);
  }

  /**
   * modal things over here ****************************************************
   */
  @ViewChild('pauseModalNoBtn', { static: false }) private pauseModalNoBtn: ElementRef;
  @ViewChild('pauseSubmitBtn', { static: false }) private pauseSubmitBtn: ElementRef;

  pause() {
    this.pauseModalNoBtn.nativeElement.click();
    this.pauseSubmitBtn.nativeElement.click();
    this.stop();
  }


}
