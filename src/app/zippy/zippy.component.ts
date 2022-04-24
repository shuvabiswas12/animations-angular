import { Component, Input, OnInit } from '@angular/core';
import { expandCollapse } from './zippy.component.animation';

@Component({
  selector: 'zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css'],
  animations: [expandCollapse],
})
export class ZippyComponent implements OnInit {
  @Input('title') title: string;
  isExpanded: boolean;

  constructor() {
    this.title = '';
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {}
}
