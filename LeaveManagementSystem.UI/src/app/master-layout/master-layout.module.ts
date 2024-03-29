import { MasterLayoutComponent } from './master-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { MasterLayoutRoutingModule } from './master-layout.routing';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from '../shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    MasterLayoutComponent,
    TopNavComponent,
    ContentAreaComponent,
    SideNavComponent,
  ],
  imports: [CommonModule, MasterLayoutRoutingModule, MaterialModule,PipesModule],
})
export class MasterLayoutModule {}
