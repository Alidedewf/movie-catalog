import { Routes } from '@angular/router';
import { MovieListComponent } from './pages/movie-list/movie-list';
import { MovieDetail } from './pages/movie-detail/movie-detail';
import { Favorites } from './pages/favorites/favorites';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetail },
  { path: 'favorites', component: Favorites },
];
