

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CanvasService {

  constructor(private http: HttpClient) {
  }

  getFiles(nazwa: string): Observable<Blob> {
    return this.http.get(`http://localhost:8080/api/files/${nazwa}`, { responseType: 'blob'});
  }
  getResteurant(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/resteurant`);
  }
}
