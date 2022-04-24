import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { } // search

  onSubmit(f: any) { // only f before.
    console.log('param : ' + f)
    location.reload();
    this.router.navigate(['search/' + f.value.search])
      .then(() => {
        window.location.reload();
      });
  }

  ngOnInit(): void {
  }

}
