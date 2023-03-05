import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveUnderscorePipe } from './remove-underscore.pipe';



@NgModule({
  declarations: [ RemoveUnderscorePipe ],
  exports: [ RemoveUnderscorePipe ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
