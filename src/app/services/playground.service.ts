import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Playground} from '../models/playground';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {

  url = '';
  constructor(private http: HttpClient ) { }

  enroll(playground: Playground ) {
    return this.http.post<any>(this.url, playground);
  }
}
