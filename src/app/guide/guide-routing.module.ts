import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const guideRoutes: Routes = [
  {
    path: 'guide',
    pathMatch: 'full',
    data: {
      title: 'Contacts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(guideRoutes)]
})
export class GuideRoutingModule { }
