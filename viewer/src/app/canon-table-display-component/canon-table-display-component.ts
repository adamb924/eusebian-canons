import { Component, Input } from '@angular/core';
import { Canon, gospelTitle } from '../canon-service';
import { SectionComponent } from '../section-component/section-component';
import { Gospel } from '../../assets/canon-types';

@Component({
  selector: 'app-canon-table-display-component',
  imports: [SectionComponent],
  templateUrl: './canon-table-display-component.html',
  styleUrl: './canon-table-display-component.scss',
})
export class CanonTableDisplayComponent {
  @Input() canon!: Canon;

  get fourGospels(): boolean {
    return this.canon?.gospels.length == 4;
  }

  get threeGospels(): boolean {
    return this.canon?.gospels.length == 3;
  }

  get twoGospels(): boolean {
    return this.canon?.gospels.length == 2;
  }

  get oneGospel(): boolean {
    return this.canon?.gospels.length == 1;
  }

  public title(g: Gospel): string {
    return gospelTitle[g];
  }

}
