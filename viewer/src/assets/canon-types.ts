export type Gospel = 'MAT' | 'MRK' | 'LUK' | 'JHN';

export const GOSPELS: Gospel[] = ['MAT', 'MRK', 'LUK', 'JHN'];

export interface CanonRow {
    MAT?: number;
    MRK?: number;
    LUK?: number;
    JHN?: number;
}

export interface GospelCanonRow {
    MAT: number | null;
    MRK: number | null;
    LUK: number | null;
    JHN: number | null;
    canon: number;
}

export interface Sections {
    MAT: Section[];
    MRK: Section[];
    LUK: Section[];
    JHN: Section[];
}

export interface Section {
    sectionNumber: number;
    reference: string;
    from_reference: string;
    to_reference: string;
    from_sblgnt: number;
    to_sblgnt: number;
    greek: string | null;
}