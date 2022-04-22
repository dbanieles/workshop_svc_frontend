

import { Injectable, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";

@Injectable()
export abstract class RxjsUnsubscribe implements OnDestroy{
    subscriptions: Subscription[] = [];
    destroy: Subject<void> = new Subject();

    ngOnDestroy(): void {
      this.subscriptions.forEach((sub:Subscription)=> sub.unsubscribe());
      this.destroy.next();
      this.destroy.complete();
    }
}