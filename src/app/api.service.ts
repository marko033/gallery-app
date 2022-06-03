import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_SERVER = environment.apiServer;

  constructor(private httpClient: HttpClient) { }

  public getGallery(): Observable<any>{
    return this.httpClient.get(this.REST_API_SERVER + '/gallery');
  }

  public getGalleryPath(path: string): Observable<any>{
    return this.httpClient.get(this.REST_API_SERVER + '/gallery/' + path);
  }

  public addGallery(name: {name: string}): Observable<any> {
    return this.httpClient.post(`${this.REST_API_SERVER}/gallery`, name, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public uploadImages(file: any, path: string): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('image', file, file.name)
    // for(const file of files) {
    // }
    return this.httpClient.post(this.REST_API_SERVER + '/gallery/' + path, uploadData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    const errMsg = error;
    console.error(JSON.stringify(errMsg));
    return observableThrowError(errMsg);
  }
}
