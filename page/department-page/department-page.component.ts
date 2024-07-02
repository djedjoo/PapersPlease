import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/model/photo/photo.service';
import { LessonText } from 'src/app/model/lessonText/lessonText';
import { Photo } from 'src/app/model/photo/photo';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.css']
})
export class DepartmentPageComponent implements OnInit{

  constructor(private photoService: PhotoService, private route: ActivatedRoute, private router: Router){}

  public department: string;

  ngOnInit(): void {
    this.department = this.route.snapshot.paramMap.get('department')
  }

}
