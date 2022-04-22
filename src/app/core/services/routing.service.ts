import { Injectable } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators'
import { ThemeService } from './theme.service';


@Injectable({
    providedIn: 'root'
})
export class RouterEventService {

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _themeService: ThemeService
    ) {}

    listen=()=>{

        this._router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
           const paramId: number = Number(event.urlAfterRedirects.split('/details/')[1] || 0);
           this._themeService.load(paramId);
        });
    }
}