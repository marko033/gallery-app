import { Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
    ) {
    this.route.params.subscribe(params => {
      this.galleryName = params['name'] === undefined ? 'movies' : params['name'];
    });
   }

  ngOnInit(): void {
    this.apiService.getGalleryPath(this.galleryName)
      .subscribe( data => {
        console.log(data);
        this.data = data;
      },
      error => {
        console.log(error);
      })
  }

}
