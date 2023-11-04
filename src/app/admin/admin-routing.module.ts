import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SearchComponent } from './pages/search/search.component';
import { SaveComponent } from './pages/save/save.component';

const routes: Routes = [
  { 
    path: '', component: AdminComponent,
    children: [
      {
        path: '',
        component: SearchComponent
      },
      {
        path: 'save',
        component: SaveComponent
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
