import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MenuComponent } from '../components/menu/menu.component';
import { MaterialModule } from "./material.module";

export const components: any[]=[
  MenuComponent
]

@NgModule({
    declarations: [
      ...components,
    ],
    imports: [
      FlexLayoutModule,
      MaterialModule
    ],
    providers: [],
    exports:[
      ...components,
      MaterialModule
    ]
  })
  export class SharedModule { }