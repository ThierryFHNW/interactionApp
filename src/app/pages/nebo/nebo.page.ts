import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavController} from "@ionic/angular";
import * as MyScriptJS from 'myscript/dist/myscript.min.js';



@Component({
  selector: 'app-nebo',
  templateUrl: './nebo.page.html',
  styleUrls: ['./nebo.page.scss'],
})
export class NeboPage implements AfterViewInit {

  @ViewChild('editor') editor: ElementRef;

  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {
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
  }
}
