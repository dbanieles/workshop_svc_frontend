import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageForm } from '../../models/message-form';
import { MessageFormDataService } from '../../services/message-form-data.service';
import { MessageFormHandlerService } from '../../services/message-form-handler.service';
import { MessageFormModelService } from '../../services/message-form-model.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  providers: [
    MessageFormModelService,
    MessageFormDataService,
    MessageFormHandlerService,
    {
      provide: MessageForm,
      useFactory: (factory: MessageFormModelService) => factory.create(),
      deps: [MessageFormModelService]
    }
  ]
})
export class MessageFormComponent implements OnInit {

  @ViewChild('emailInput',{static:true})
  emailInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  @Input()
  config: any = {
    visible: true,
    selectable: true,
    removable: true,
    separatorKeysCodes: [ENTER, COMMA]
  }

  constructor(public messageForm: MessageForm) { }

  ngOnInit(): void { }

}
