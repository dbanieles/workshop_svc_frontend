import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Parallax from 'parallax-js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Template } from '../../models/template.model';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss']
})
export class TemplatePageComponent implements OnInit, AfterViewInit {

  templates$: Observable<Template[]>;

  constructor(
    private _router: Router,
    private _templateService: TemplateService
  ) {}

  ngOnInit(): void { 
    this.templates$ = this._templateService.getTemplates()
      .pipe(map((templates:Template[])=> templates.map((template:Template)=>({...template, deph: this.randomNumber()}))));
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      const scene = document.getElementById('js-scene');
      const parallax: Parallax = new Parallax(scene);
    },1000);

  }

  onAllowToDrop = (event: DragEvent): void => event.preventDefault();
  
  onDrag = (event: DragEvent, templateId: number): void => event.dataTransfer.setData("card", String(templateId));

  onDrop = (event: DragEvent): void => {
    event.preventDefault();
    const data = event.dataTransfer.getData("card");
    this._router.navigate(['/details', data]);
  }

  randomNumber = (min: number=0.65, max: number=1.20): number => +(Math.random() * (max - min) + min).toFixed(2);

}
