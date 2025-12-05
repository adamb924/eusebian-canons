import { Routes } from '@angular/router';
import { CanonComponent } from './canon-component/canon-component';
import { GospelComponent } from './gospel-component/gospel-component';
import { HomeComponent } from './home-component/home-component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'gospel/:gospel', component: GospelComponent },
    { path: 'canon/:canon', component: CanonComponent },
];
