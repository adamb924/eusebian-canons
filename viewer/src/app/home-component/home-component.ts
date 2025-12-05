import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [
    MatListModule,
    RouterModule
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {

}
