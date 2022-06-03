import { Component, Input, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  apiServer: string = environment.apiServer;

  @Input() category: any;

  constructor() { }

  ngOnInit(): void {
  }

}
