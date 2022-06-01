import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  data!: any;
  galleryName!: string;

  file: any;
  files: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
    ) {
    this.route.params.subscribe(params => {
      this.galleryName = params['name'] === undefined ? 'movies' : params['name'];
    });
   }

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.apiService.getGalleryPath(this.galleryName)
      .subscribe( data => {
        this.data = data;
      },
      error => {
        console.error(error);
      })
  }

  openModal() {
    this.files = null;
  }

  onFileChanged(event: any) {
    this.files = null;
    this.files = event.target.files;
  }

  onUpload() {
    for(const file of this.files) {
      this.apiService.uploadImages(file, this.data.gallery.name)
        .subscribe(event => {
          this.getImages();
        },
        error => {
          let errorMsg: string = '';
          switch (error.status) {
            case 400:
              errorMsg = "Invalid request - file not found."
              break;
            case 404:
              errorMsg = "Gallery not found"
              break;
          
            default:
              break;
          }
          window.alert(errorMsg);
        });
    }
    this.files = null;
  }

}
