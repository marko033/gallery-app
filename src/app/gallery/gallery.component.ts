import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Lightbox } from 'ngx-lightbox';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  data!: any;
  galleryName!: string;

  files: any;

  private _album: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private _lightbox: Lightbox
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
        this.createAlbumOfImages(this.data.images);
      },
      error => {
        console.error(error);
      })
  }

  createAlbumOfImages(images: any) {

    for(const image of images) {
      const src = 'http://api.programator.sk/images/1212x909/' + image.fullpath;
      const caption = image.name;
      const thumb = 'http://api.programator.sk/images/304x295/' + image.fullpath;
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this._album.push(album);
    }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
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
