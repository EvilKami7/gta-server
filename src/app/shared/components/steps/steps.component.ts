import {Component, Input, OnInit} from '@angular/core';
import {steps} from '../../steps';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  //@Input() step: Steps;

  steps = steps

  constructor() { }

  ngOnInit(): void {
  }

}
