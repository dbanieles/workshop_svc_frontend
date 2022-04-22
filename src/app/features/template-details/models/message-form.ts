import { FormGroup } from "@angular/forms";
import { forkJoin, Observable, of } from "rxjs";
import { catchError, debounceTime, exhaustMap, filter, groupBy, map, mergeMap, startWith, switchMap, takeUntil, tap, withLatestFrom } from "rxjs/operators";
import { MessageFormDataService } from "../services/message-form-data.service";
import { RxjsUnsubscribe } from "../../../core/models/rxjs-unsuscriber";
import { MessageFormHandlerService } from "../services/message-form-handler.service";
import { Notification } from "src/app/core/models/notification.model";
import { Renderer2 } from "@angular/core";

export class MessageForm extends RxjsUnsubscribe{
    readonly initialValue;

    emailFiltered$: Observable<string[]>;
    receiversList: string[]=[];

    constructor(
      private _formGroup: FormGroup,
      private _messageFormData: MessageFormDataService,
      private _messageFormHandler: MessageFormHandlerService,
      private _renderer: Renderer2
    ) {
      super();
      this.initialValue = this._formGroup.value;
      this.emailFiltered$ = this.onSenderChange();
      this.onSendMessage();
      this.onCancel();
    }
  
    get asFormGroup() {
      return this._formGroup;
    }

    get messageHandler() {
      return this._messageFormHandler;
    }

    get messageData() {
      return this._messageFormData;
    }

    get messageFormValue() {
      const { id, content, sender, date, templateId } = this._formGroup.getRawValue() as Notification;
      return <Notification>{
        id,
        content,
        sender,
        date,
        templateId,
        receivers: this.receiversList.join()
      };
    }
  
    isValid = (): Observable<boolean> =>{
      return this._formGroup.statusChanges.pipe(
        map(() => this._formGroup.valid),
        startWith(false),
        takeUntil(this.destroy),
        catchError((error)=>{
          console.error(error);
          return of(error);
        })
      );
    }

    onSenderChange = (): Observable<string[]> =>{
      return this._formGroup.get('receivers').valueChanges.pipe(
        filter((sender)=> !!sender),
        switchMap((sender: string)=> this._messageFormData.searchEmail(of(sender))),
        takeUntil(this.destroy),
        catchError((error)=>{
          console.error(error);
          return of(error);
        })
      );
    }

    onSendMessage = () => {
      this.messageHandler.saveBtnClicked.pipe(
        debounceTime(500),
        groupBy((events: any) => events),
        mergeMap((events: any) => events.pipe(
          exhaustMap((html: any) => forkJoin([
            this._messageFormData.sendMessage(this.messageFormValue),
            of(this.appendHtmlElement(html))
          ]).pipe(
            tap(([response,node])=> this.appendHtmlResponse(node)),
            takeUntil(this.destroy),
            catchError((error)=>{
              this.appendHtmlResponse(html,false);
              console.error(error);
              return of(error);
            })
          ))
      ))).subscribe();
    }

    onCancel = () => {
      this.messageHandler.undoBtnClicked.pipe(
        groupBy((events) => events),
        mergeMap((events) => events.pipe(
          exhaustMap(() => of(this._formGroup.reset())),
          switchMap(()=> of(this.resetReceiversList())),
          takeUntil(this.destroy),
          catchError((error)=>{
            console.error(error);
            return of(error);
          })
      ))).subscribe();
    }

    addReceiverToList = (event: any) => {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) this.receiversList.push(value.toLowerCase().trim());
      if (input) input.value = '';
    }

    removeReceiverToList = (email: string) => {
      const index = this.receiversList.indexOf(email);
      if (index >= 0) this.receiversList.splice(index, 1);
    }

    selectReceiverToList = (event:any, input:any) => {
      this.receiversList.push(event.option.viewValue);
      input.value = '';
    }

    resetReceiversList = () => this.receiversList = [];

    appendHtmlElement = (node: HTMLDivElement): HTMLElement => {
      const child: HTMLDivElement = this._renderer.createElement('div');
      const container: HTMLDivElement = this._renderer.createElement('div');
      const text = this._renderer.createText(this._formGroup.get('content')?.value ?? '');

      this._renderer.addClass(container, 'mCSB_container');
      this._renderer.addClass(child, 'message');
      this._renderer.addClass(child, 'message-personal');
      this._renderer.addClass(child, 'new');
      this._renderer.appendChild(child, text);
      this._renderer.appendChild(container, child);
      this._renderer.appendChild(node, container);
      return container;
    }

    appendHtmlLoading = (node: HTMLDivElement) =>{
      const div: HTMLDivElement = this._renderer.createElement('div');
      const figure: HTMLElement = this._renderer.createElement('figure');
      const image: HTMLImageElement  = document.createElement('img');
      image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxq2FbsI6Kv2x9hSJIzCtNn8Y13HoHMBSyJw&usqp=CAU';
      image.alt = 'alt text';

      this._renderer.addClass(figure, 'avatar');

      const text = this._renderer.createText('');
      this._renderer.addClass(div, 'message');
      this._renderer.addClass(div, 'loading');
      this._renderer.addClass(div, 'new');
      
      this._renderer.appendChild(figure, image);
      this._renderer.appendChild(div, figure);
      this._renderer.appendChild(node, div);

    }

    appendHtmlResponse = (node: HTMLElement, success:boolean=true) => {
      const div: HTMLDivElement = this._renderer.createElement('div');
      const figure: HTMLElement = this._renderer.createElement('figure');
      const image: HTMLImageElement  = document.createElement('img');
      image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxq2FbsI6Kv2x9hSJIzCtNn8Y13HoHMBSyJw&usqp=CAU';
      image.alt = 'alt text';

      this._renderer.removeChild(node, div);
      this._renderer.addClass(figure, 'avatar');

      const text = this._renderer.createText(success ? 'Send message success' : 'Send Message failed');
      this._renderer.addClass(div, 'message');
      this._renderer.addClass(div, 'new');
      this._renderer.appendChild(figure, image);
      this._renderer.appendChild(div, figure);
      this._renderer.appendChild(div, text);
      this._renderer.appendChild(node, div);
      this.setDate(div);
    }

    setDate = (node: HTMLElement) => {
      const date = new Date();
      const child = this._renderer.createElement('div');
      const text = this._renderer.createText(`${date.getHours()}:${date.getMinutes()}`);
      this._renderer.addClass(child, 'timestamp');
      this._renderer.appendChild(child, text);
      this._renderer.appendChild(node, child);
    }

}