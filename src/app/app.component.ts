import { RouterOutlet } from '@angular/router';

import { Component } from '@angular/core';
import { NavbarComponent } from "./component/navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent {

  title = 'ccde_project';
}