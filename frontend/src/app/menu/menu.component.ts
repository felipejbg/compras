import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  adm: boolean = true;

  mostrarMenu: boolean = true;

  constructor(
  ) { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
  }

}
