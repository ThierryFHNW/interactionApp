import { Component, OnInit } from '@angular/core';
import {Playground} from '../../models/playground';
import { PlaygroundService } from '../../services/playground.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.page.html',
  styleUrls: ['./playground.page.scss'],
})
export class PlaygroundPage implements OnInit {
  topics = ['Angular', 'React', 'Flutter'];
  model = new Playground('awmm', 'localhost:8000', 'localhost:9000');
  settingsModel = new Playground('awmm', 'localhost:8000', 'localhost:9000');

  submitted = false;

  constructor(private playgroundService: PlaygroundService) { }
  ngOnInit() {
    // localStorage.setItem('lastname', 'tone');
    // console.log(localStorage.getItem('lastname'));
  }

  onSubmit() {
    console.log('User Model');
    this.playgroundService.enroll(this.model)
        .subscribe(
            data =>  console.log('success', data),
            error => console.log('error', error)
    );
    this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.model); }

  /*
  let sum = (x: number, y: number): number => {
            return x + y;
  }
  In the above example, sum is an arrow function. (x:number, y:number) denotes the parameter types,
  :number specifies the return type.
  The fat arrow =>  separates the function parameters and the function body. The right side of => can contain one or more code statements.

  The Javascript Render:
  var sum = function (x, y) {
            return x + y;
  }
  */

}
