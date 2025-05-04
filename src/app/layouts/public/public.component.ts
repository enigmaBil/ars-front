import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavabarComponent } from "../navabar/navabar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public',
  imports: [FooterComponent, NavabarComponent, RouterOutlet],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css'
})
export class PublicComponent {

}
