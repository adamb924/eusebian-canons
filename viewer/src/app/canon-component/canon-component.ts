import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Canon, CanonService } from '../canon-service';
import { CanonTableDisplayComponent } from '../canon-table-display-component/canon-table-display-component';

@Component({
  selector: 'app-canon-component',
  imports: [CanonTableDisplayComponent],
  templateUrl: './canon-component.html',
  styleUrl: './canon-component.scss',
})
export class CanonComponent {
  private cs = inject(CanonService);
  canonNumber: number = 1;
  canon: Canon | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.canonNumber = parseInt(params.get('canon') || "1");

      if (this.canonNumber) {
        this.canon = this.cs.getCanon(this.canonNumber);
      }

    });
  }

}
