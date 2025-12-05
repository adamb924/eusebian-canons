import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Canon, CanonService } from '../canon-service';
import { CanonTableDisplayComponent } from '../canon-table-display-component/canon-table-display-component';
import { Gospel } from '../../assets/canon-types';

@Component({
  selector: 'app-gospel-component',
  imports: [CanonTableDisplayComponent],
  templateUrl: './gospel-component.html',
  styleUrl: './gospel-component.scss',
})
export class GospelComponent {
  private cs = inject(CanonService);
  gospel: Gospel = 'MAT';
  canon: Canon | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.gospel = (params.get('gospel') || "MAT") as Gospel;

      if (this.gospel) {
        this.canon = this.cs.getGospel(this.gospel);
      }
    });
  }

}
