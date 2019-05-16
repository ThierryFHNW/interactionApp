import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITasks} from '../models/tasks';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    private url = '/assets/data/tasks.json';
    private urlPyWall = 'http://localhost:8000';

    constructor(private http: HttpClient) {
    }

    getTasks(): Observable<ITasks[]> {
        return this.http.get<ITasks[]>(this.urlPyWall);
    }

    /*getTasks(): Observable<ITasks[]> {
       return this.http.get<ITasks[]>(this.url);
    }*/
}
