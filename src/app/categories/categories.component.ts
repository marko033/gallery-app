import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private apiService: ApiService,
    private readonly router: Router,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getGalleryData();
  }

  getGalleryData() {
    this.apiService.getGallery()
      .subscribe( (data: GalleryData) => {
        this.data = data;
        let dataTemp: Gallery[] = this.data.galleries;
        this.categories = dataTemp.map(({ name: name, image: image }) => ({name, image}));

        this.categories.map((element: any) => {
          this.apiService.getGalleryPath(element.name)
            .subscribe( data => {
              element.imagesCount = data.images.length
            },
            error => {
              console.log(error);
            })

            this.categories.imagesCount = element.imagesCount;
        });
      },
      error => {
        console.log(error);
      });
  }

  onSubmit(categoryForm: any) { 
    this.apiService.addGallery(categoryForm.form.value).subscribe(
      resp => {
        this.getGalleryData();
        this.router.navigate([`gallery/${categoryForm.form.value.name}`]);
        categoryForm.reset();
      },
      error => {
        let errorMsg: string = '';
        switch (error.status) {
          case 400:
            errorMsg = "Invalid request. The request doesn't conform to the schema."
            break;
          case 409:
            errorMsg = "Gallery with this name already exists"
            break;
          case 500:
            errorMsg = "Unknown error"
            break;
        
          default:
            break;
        }
        window.alert(errorMsg);
        categoryForm.reset();
      }
    )
  }

}
