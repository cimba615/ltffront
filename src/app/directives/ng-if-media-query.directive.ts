import {
  Input,
  Directive,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

/**
* How to use this directive?
*
* ```
* <div *mqIf="'(min-width: 500px)'">
*     Div element will exist only when media query matches, and created/destroyed when the viewport size changes.
* </div>
* ```
*/
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngIfMediaQuery]'
})
export class NgIfMediaQueryDirective implements OnDestroy {
  private prevCondition: boolean = null;
  i = 0;

  private mql: MediaQueryList;
  // private mqlListener: (mql: MediaQueryList) => void;   // reference kept for cleaning up in ngOnDestroy()
  // private mqlistevent: (mql: MediaQueryListEvent) => void;
  private mqlListener: (this: MediaQueryList, ev: MediaQueryListEvent) => void;
  constructor(private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<Object>,
    private ref: ChangeDetectorRef) {
  }

  /**
   * Called whenever the media query input value changes.
   */
  @Input()
  set ngIfMediaQuery(newMediaQuery: string) {
    if (!this.mql) {
      this.mql = window.matchMedia(newMediaQuery);

      /* Register for future events */
      this.mqlListener = (mq) => {
        this.onMediaMatchChange(mq.matches);
      };
      this.mql.addListener(this.mqlListener);
    }

    this.onMediaMatchChange(this.mql.matches);
  }

  ngOnDestroy() {
    this.mql.removeListener(this.mqlListener);
    this.mql = this.mqlListener = null;
  }

  private onMediaMatchChange(matches: boolean) {
    if (matches && !this.prevCondition) {
      this.prevCondition = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!matches && this.prevCondition) {
      this.prevCondition = false;
      this.viewContainer.clear();
    }

    /**
     * Infinitive loop when we fire detectChanges during initialization
     * (first run on that func)
     */
    if (this.i > 0) {
      this.ref.detectChanges();
    } else {
      this.i++;
    }
  }
}
