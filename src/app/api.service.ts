import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_SERVER = "http://api.programator.sk";

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

  private handleError(error: HttpErrorResponse) {
    const errMsg = error;
    console.error(JSON.stringify(errMsg));
    return observableThrowError(errMsg);
  }
}
