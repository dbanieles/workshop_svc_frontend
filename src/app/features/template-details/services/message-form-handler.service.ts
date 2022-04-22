import { Injectable, Renderer2 } from "@angular/core";
import { Subject } from "rxjs";
import { MessageForm } from "../models/message-form";

@Injectable()
export class MessageFormHandlerService {

  saveBtnClicked = new Subject<void>();
  undoBtnClicked = new Subject<void>();
  
  constructor() { }

}