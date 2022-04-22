import { Directive, HostListener, Input } from "@angular/core";
import { Subject } from "rxjs";

@Directive({
  selector: '[clickEvent]'
})
export class ClickEventDirective {
    
  @Input() 
  clickEvent: Subject<void>;

  @Input()
  params: any = null;

  @HostListener('click') 
  onClick() {
    this.clickEvent.next(this.params);
  }

  // @HostListener('document:keydown.enter', ['$event']) 
  // onKeydownHandler(event: KeyboardEvent) {
  //   this.clickEvent.next(this.params);
  // }
}