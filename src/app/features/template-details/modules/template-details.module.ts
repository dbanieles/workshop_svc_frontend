import { NgModule } from "@angular/core";
import { SharedModule } from "../../../shared/modules/shared.module";
import { TemplateDetailsPageComponent } from '../components/template-details-page/template-details-page.component';
import { MessageFormComponent } from '../components/message-form/message-form.component';
import { TemplateDetailsRoutingModule } from './template-details-routing.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ClickEventDirective } from '../../../core/directives/click.directive';
import { UserService } from "../../../core/services/user.service";

@NgModule({
    declarations: [
        TemplateDetailsPageComponent,
        MessageFormComponent,
        ClickEventDirective
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        TemplateDetailsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
    ],
    providers: [
        UserService
    ]
})
export class TemplateDetailsModule { }