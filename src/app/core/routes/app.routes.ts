import { Routes } from "@angular/router";
import { TemplateDetailsPageComponent } from "../../features/template-details/components/template-details-page/template-details-page.component";
import { TemplatePageComponent } from '../../features/templates/components/template-page/template-page.component';



export const routes: Routes = [
    {
        path: '',
        component: TemplatePageComponent,
        loadChildren:  () => import('../../features/templates/modules/template.module').then(m => m.TemplateModule),
        data: { animation: 'isRight' }
    },
    {
        path: 'details/:id',
        component: TemplateDetailsPageComponent,
        loadChildren:  () => import('../../features/template-details/modules/template-details.module').then(m => m.TemplateDetailsModule),
        data: { animation: 'isLeft' }
    }
]