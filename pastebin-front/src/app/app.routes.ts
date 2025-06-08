import { Routes } from '@angular/router';
import { PasteDetailComponent } from './features/paste-detail/paste-detail';
import { RecentPastesComponent } from './features/recent-pastes/recent-pastes';
import { CreatePasteComponent } from './features/create-paste/create-paste';

export const routes: Routes = [
  { path: '', component: CreatePasteComponent, title: 'Create Paste' },
  { path: 'paste/:id', component: PasteDetailComponent, title: 'View Paste' },
  { path: 'recent', component: RecentPastesComponent, title: 'Recent Pastes' },
  { path: '**', redirectTo: '' } // Redirect any unknown paths to the home/create page
];