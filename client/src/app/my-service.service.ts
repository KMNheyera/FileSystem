import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  baseUrl: string = "http://localhost:5000/api"
  constructor(
    private http: HttpClient,
  ) { }

  getInitFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ServerFiles`).pipe(
      catchError(this.handleError)
    );
  }

  getFileInfo(filePathString: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/ServerFiles/FileInfo/${filePathString}`).pipe(
      catchError(this.handleError)
    );
  }

  getFolderFiles(folderName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/ServerFiles/${folderName}`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if(error.status == 401){
    }
    return throwError(error);
  }
}
