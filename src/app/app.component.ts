import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from './core/animations/router.animation';
import { RouterEventService} from './core/services/routing.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader]
})
export class AppComponent{ 


  constructor(private _routerEventService: RouterEventService) { 
    this._routerEventService.listen();
  }

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}