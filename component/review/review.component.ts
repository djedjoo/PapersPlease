import { Component, OnInit, ViewChild} from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{

  @ViewChild('carosello', {static: true}) carosello!: NgbCarousel;

  constructor(){}

  ngOnInit(): void {
  }


}
