import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'gallery/:name',
    component: GalleryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
