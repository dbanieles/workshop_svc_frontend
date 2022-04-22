import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators';
import { RestApiResponse } from 'src/app/core/models/response.model';
import { Template } from '../models/template.model'


@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor(private _httpClient: HttpClient) { }


    getTemplates(): Observable<Template[]> {
        return this._httpClient.get(`http://localhost:8080/api/v1/templates`).pipe(map((response: RestApiResponse<Template[]>)=> response.data));
    }
}