import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fullpagelessons',
  templateUrl: './fullpagelessons.component.html',
  styleUrls: ['./fullpagelessons.component.css']
})
export class FullpagelessonsComponent implements OnInit{

  public lessonType: string
  public department: string

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
      this.lessonType = this.route.snapshot.paramMap.get('type')
      if(this.route.snapshot.paramMap.get('department'))
        this.department = this.route.snapshot.paramMap.get('department')
      else
        this.department = ""
  }
}
