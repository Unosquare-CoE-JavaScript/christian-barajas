import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() bookTitle: string;
  @Output() onBookClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClicked(){
    this.onBookClicked.emit("");
  }
}
