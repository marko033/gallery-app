import { Component, OnInit } from '@angular/core';

import { Gallery, GalleryData } from '../api.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  data!: GalleryData;
  categories: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getGalleryData();
  }

  getGalleryData() {
    this.apiService.getGallery()
      .subscribe( (data: GalleryData) => {
        this.data = data;
        let dataTemp: Gallery[] = this.data.galleries;
        this.categories = dataTemp.map(({ name: name, image: image }) => ({name, image}));
      },
      error => {
        console.log(error);
      });
  }

  onSubmit(categoryForm: any) {  
    this.apiService.addGallery(categoryForm.form.value).subscribe(
      resp => {
        this.getGalleryData();
      },
      error => {
        console.log(error);
      }
    )
  }

}
