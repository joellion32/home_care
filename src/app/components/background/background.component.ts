import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
 @Input() category: string;
 @Input() image: any;
  constructor() { }

  ngOnInit() {}

}
