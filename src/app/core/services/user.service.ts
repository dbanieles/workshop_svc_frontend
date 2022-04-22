import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { RestApiResponse } from '../models/response.model';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _httpClient: HttpClient){ }

    getUsers(): Observable<User[]> {
        return this._httpClient.get('http://localhost:8080/api/v1/users').pipe(map((response: RestApiResponse<User[]>)=> response.data));
    }

    getFilteredUsers(term: string): Observable<User[]> {
        return this._httpClient.get(`http://localhost:8080/api/v1/users/filter/${term}`).pipe(map((response: RestApiResponse<User[]>)=> response.data));
    }
}