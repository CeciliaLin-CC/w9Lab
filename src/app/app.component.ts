import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movieAng';
  section = 0;

  changeSection(sectionId:number) {
    this.section = sectionId;
  }
}
