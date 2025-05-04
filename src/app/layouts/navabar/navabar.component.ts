import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navabar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navabar.component.html',
  styleUrl: './navabar.component.css'
})
export class NavabarComponent implements OnInit {
  currentTheme = "";

  constructor(
    @Inject(DOCUMENT) private doc: Document
) {
  }

  ngOnInit(): void {
    const theme = localStorage.getItem("theme");
    if (theme && ["dark", "light"].includes(theme)) {
    this.currentTheme = theme;
    document.documentElement.firstElementChild?.classList?.toggle(theme, true);
  }
}

  toggleTheme() {
    if (this.currentTheme === "dark") {
      this.doc.documentElement.classList.remove("dark");
      this.currentTheme = "light";
      localStorage.setItem("theme", "light");
    } else {
      this.doc.documentElement.classList?.add("dark");
      this.currentTheme = "dark";
      localStorage.setItem("theme", "dark");
    }
  }

}
