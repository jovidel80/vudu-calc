import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('linio') linio: HTMLElement;
  @ViewChild('falabella') falabella: HTMLElement;
  gananciaToChild: any;

  constructor() {
    this.gananciaToChild = {};
  }

  gananciaToParent(event) {
    this.gananciaToChild = event;
  }

  tabChange(event) {
    if (event.index === 0 || event.index === 2) {
      this.linio['_snackBar'].dismiss();
      this.falabella['_snackBar'].dismiss();
    }
  }

  agregarProducto() {
    return new AppComponent();
  }
}
