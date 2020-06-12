import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly auth: AuthService) { }

  get userFirstName(): string {
    return this.auth.userInfo.firstName;
  }


  ngOnInit(): void {
  }

  logout(){
    this.auth.logout().subscribe(res => location.reload());
  }

}
