import { Component, OnInit } from '@angular/core';
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHouse, faUser, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  iconHouse = faHouse;
  iconUser = faUser;
  iconPhone = faPhone;
  iconTwitter = faTwitter;
  iconFB = faFacebookF;
  iconInsta = faInstagram;

  constructor() {}

  ngOnInit(): void {

  }
}
