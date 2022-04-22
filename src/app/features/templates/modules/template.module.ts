import { NgModule } from "@angular/core";
import { SharedModule } from "../../../shared/modules/shared.module";
import { TemplatePageComponent } from '../components/template-page/template-page.component';
import { TemplateRoutingModule } from './template-routing.module';
import { TemplateService } from '../services/template.service';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        TemplatePageComponent
    ],
    imports: [
      CommonModule,
      HttpClientModule,
      TemplateRoutingModule,
      SharedModule
    ],
    providers: [
      TemplateService
    ]
  })
  export class TemplateModule { }