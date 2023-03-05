import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { contants } from 'src/app/shared/global/global.contants';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  navItems: string[] = [];
  url: string = '';
  username: string | null = null;
  filterTerm!: string;
  date: string = new Date().toDateString();
  time: string = new Date().toTimeString();

  constructor(private router: Router) {
    this.username = sessionStorage.getItem(contants.username);

    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url.replace('/', '').replace('-', ' ');
      }
    });

  }

  ngOnInit(): void { console.log(this.filterTerm) }

  logout() {
    sessionStorage.clear();
    window.location.reload();
    sessionStorage.setItem(contants.time, this.time);
    sessionStorage.setItem("date", this.date);

  }

}
