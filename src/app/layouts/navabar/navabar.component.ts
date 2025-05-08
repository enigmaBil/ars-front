// src/app/shared/components/navabar/navabar.component.ts
import { Component, Inject } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navabar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.css']
})
export class NavabarComponent {
  currentTheme = '';

  constructor(@Inject(DOCUMENT) private doc: Document) {}

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
      this.doc.documentElement.classList.add("dark");
      this.currentTheme = "dark";
      localStorage.setItem("theme", "dark");
    }
  }
}
