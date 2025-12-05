import { Component, Input } from '@angular/core';
import { Gospel, Section } from '../../assets/canon-types';
import { gospelTitle } from '../canon-service';

@Component({
  selector: 'app-section-component',
  imports: [],
  templateUrl: './section-component.html',
  styleUrl: './section-component.scss',
})
export class SectionComponent {
  @Input() section!: Section | undefined;
  @Input() gospel!: Gospel;

  get sectionNumber(): number {
    return this.section?.sectionNumber || -1;
  }

  get reference(): string {
    if (this.section) {
      const first = this.section.from_reference.slice(4);
      const second = this.section.to_reference.slice(4);
      return `${first} - ${second}`;
    }
    return "";
  }

  get title(): string {
    return gospelTitle[this.gospel];
  }

}
