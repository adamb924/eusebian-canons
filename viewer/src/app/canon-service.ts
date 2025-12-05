import { Injectable } from '@angular/core';
import { canon1, canon2, canon3, canon4, canon5, canon6, canon7, canon8, canon9, canon10, sections, canonsByGospel } from '../assets/canon-data';
import { CanonRow, Gospel, GospelCanonRow, GOSPELS, Section } from '../assets/canon-types';

export const gospelTitle: Record<Gospel, string> = { MAT: 'Ματθαίος', MRK: 'Μάρκος', LUK: 'Λουκάς', JHN: 'Ιωάννης' };

export interface FilledCanonRow {
  MAT?: Section;
  MRK?: Section;
  LUK?: Section;
  JHN?: Section;
}

export interface Canon {
  canonNumber: number;
  gospel: Gospel | undefined;
  gospels: Gospel[];
  data: FilledCanonRow[];
};

@Injectable({
  providedIn: 'root',
})
export class CanonService {
  private canonTables = [canon1, canon2, canon3, canon4, canon5, canon6, canon7, canon8, canon9, canon10];

  public getCanon(canonNumber: number, gospel?: Gospel): Canon {
    if (canonNumber == 10 && !gospel) {
      console.error("Canon 10 requested but gospel was not specified.");
      gospel = 'MAT';
    }
    const canonTable = this.canonTables[canonNumber - 1];
    const gospels = Object.keys(canonTable[0]) as Gospel[];
    const data = canonTable.map((row: CanonRow) => {
      let filled: Record<string, Section> = {};
      gospels.forEach((g: Gospel) => {
        const n = row[g] as number;
        filled[g] = sections[g][n - 1];
      });
      return filled;
    });
    return {
      canonNumber: canonNumber,
      gospel: gospel,
      gospels: gospels,
      data: data
    };
  }

  public getGospel(gospel: Gospel): Canon {
    const rows: GospelCanonRow[] = canonsByGospel[gospel];
    const data = rows.map((row: GospelCanonRow) => {
      let filled: Record<string, Section> = {};
      GOSPELS.forEach((g: Gospel) => {
        const n = row[g] as number;
        filled[g] = sections[g][n - 1];
      });
      return filled;
    });
    return {
      canonNumber: -1,
      gospel: gospel,
      gospels: GOSPELS,
      data: data
    };

  }

}
