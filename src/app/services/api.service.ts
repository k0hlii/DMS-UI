import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options: Options): Observable<T> {
    return this.http.get(url, options) as Observable<T>;
  }

  post<T>(url: string, body: any, options: Options): Observable<T> {
    return this.http.post(url, body, options) as Observable<T>;
  }

  put<T>(url: string, body: any, options: Options): Observable<T> {
    return this.http.put(url, body, options) as Observable<T>;
  }

  delete<T>(url: string, options: Options): Observable<T> {
    return this.http.delete(url,options) as Observable<T>;
  }
}
