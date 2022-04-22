import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'


@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    themeChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    private _currentTheme: string;
    private _bodyElement: HTMLBodyElement;
    private _themeDictionary: {[key:number]: string} = {
        0: 'blankTheme',
        2: 'redTheme',
        4: 'greenTheme',
        3: 'blueTheme',
        1: 'pinkTheme'
    };

    public get themeChanges(): Observable<number> {
        return this.themeChanged.asObservable();
    }

    load = (id: number) => {
        this._bodyElement = document.getElementsByTagName('body')[0];
        const newClassTheme: string = this.getTheme(id);
        
        if (this._currentTheme) {
        this._bodyElement.classList.replace(this._currentTheme, newClassTheme);
        } else {
        this._bodyElement.classList.add(newClassTheme);
        }

        this._currentTheme = newClassTheme;
        this.themeChanged.next(id);
    }

    private getTheme = (id: number) => {
        if(!id || !this._themeDictionary[id]) return this._themeDictionary[0];
        else return this._themeDictionary[id]; 
    }

}