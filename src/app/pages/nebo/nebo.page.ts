import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as MyScriptJS from 'myscript/dist/myscript.min.js';
import { HTTP } from '@ionic-native/http/ngx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Platform} from '@ionic/angular';
import {Task} from '../../models/task';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-nebo',
  templateUrl: './nebo.page.html',
  styleUrls: ['./nebo.page.scss'],
})
export class NeboPage {
  fetchedData: any;
  @ViewChild('editor') editor: ElementRef;

  constructor(private http: HttpClient, private nativeHttp: HTTP, private plt: Platform) {
    this.plt.ready().then( () => {
      this.getDataNativeHttp().then(value => {
        console.log(value);
      })
    });
  }

  getDataNativeHttp(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

/*    this.http.get('https://jsonplaceholder.typicode.com/users')
        .subscribe(data => {
        this.fetchedData = JSON.stringify(data);
    });*/


    return this.nativeHttp.get('https://jsonplaceholder.typicode.com/users', {}, {'Content-Type': 'application/json'})
        .then(data => {
          this.fetchedData = JSON.parse(data.data);
        }, err => {
          console.log(err);
        });
  }

  /*ngAfterViewInit() {
    MyScriptJS.register(this.editor.nativeElement, {
      recognitionParams: {
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: '6d9519da-1463-41ca-bd73-def0994121e6',
          hmacKey: '65940d5e-2ae3-45e4-a48c-502c02a5a529',
        },
      },
    });
  }*/
}
