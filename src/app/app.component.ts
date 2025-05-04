import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {FlowbiteService} from './core/services/flowbite.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ars-front';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private flowbite: FlowbiteService,
  ) {
  }

  ngOnInit(): void {
    this.flowbite.loadFlowbite(fb => {
      fb.initDropdowns()
    });

    this.switchTheme();
  }

  //methode de gestion du theme soit dark ou light mode
  private switchTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const themeSession = localStorage.getItem("theme");
      const domTokenList = document.documentElement.classList;
      if (themeSession) {
        domTokenList.toggle(themeSession, true);
      } else {
        domTokenList.toggle(isDarkMode ? "dark" : 'light');
      }
    }
  }
}
