import { Injectable, Renderer2 } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith, distinctUntilChanged } from "rxjs/operators";
import { MessageForm } from '../models/message-form';
import { MessageFormDataService } from "./message-form-data.service";
import { MessageFormHandlerService } from "./message-form-handler.service";


@Injectable()
export class MessageFormModelService {

    constructor(
        private _formBuilder: FormBuilder,
        private _formData: MessageFormDataService,
        private _FormHandler: MessageFormHandlerService,
        private _activateRoute: ActivatedRoute,
        private _renderer: Renderer2
    ){  }

    create = (): MessageForm => new MessageForm(this.buildForm(), this._formData, this._FormHandler, this._renderer);

    buildForm = (): FormGroup =>{
        return this._formBuilder.group({
            id: new FormControl({
                value: null,
                disabled: true
            }),
            sender: new FormControl({
                value: 'daniele.baggio@bitsrl.net',
                disabled: true
            }),
            receivers: new FormControl({
                value: null,
                disabled: false
            }, [Validators.required]),
            content: new FormControl({
                value: null,
                disabled: false
            }, [Validators.required]),
            templateId: new FormControl({
                value: Number(this._activateRoute.snapshot.params['id']),
                disabled: true
            }),
            date: new FormControl({
                value: new Date(),
                disabled: true
            }),
        });
    }
}