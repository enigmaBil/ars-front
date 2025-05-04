import { Component } from '@angular/core';
import { NavabarComponent } from "../navabar/navabar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-back-office',
  imports: [NavabarComponent, FooterComponent, RouterOutlet],
  templateUrl: './back-office.component.html',
  styleUrl: './back-office.component.css'
})
export class BackOfficeComponent {

}
