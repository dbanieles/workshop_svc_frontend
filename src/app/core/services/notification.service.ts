import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators';
import { Notification } from '../models/notification.model';
import { RestApiResponse } from '../models/response.model';


@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private _httpClient: HttpClient){ }

    sendMessage = (message: Notification): Observable<any> => {
        return this._httpClient.post('http://localhost:8080/api/v1/notifications',message).pipe(map((response: RestApiResponse<any>)=> response.data));
    }

}