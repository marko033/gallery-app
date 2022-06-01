import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  @Input() name!: string;
  @Input() modal!: string;

  @Output() openModal = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
