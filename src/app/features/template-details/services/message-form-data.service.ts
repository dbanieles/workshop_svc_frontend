import { Injectable, TemplateRef } from "@angular/core";
import { Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, map, takeUntil } from "rxjs/operators";
import { UserService } from "../../../core/services/user.service";
import { User } from "../../../core/models/user.model";
import { Notification } from "../../../core/models/notification.model";
import { NotificationService } from "../../../core/services/notification.service";

@Injectable()
export class MessageFormDataService {

  constructor(
    private _userService: UserService,
    private _messageService: NotificationService
  ) {}

  searchEmail = (termChanged: Observable<string>): Observable<string[]> =>
    termChanged.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => term.length < 3 ? of([]) : this._userService.getFilteredUsers(term)),
      map((users:User[]) => users.map((user: User) => user.email))
    );

  sendMessage = (message: Notification) => this._messageService.sendMessage(message);

}