import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class Favorites {
  favorites: any[] = [];

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const data = localStorage.getItem('favorites');
    this.favorites = data ? JSON.parse(data) : [];
  }

  removeFromFavorites(id: number) {
    this.favorites = this.favorites.filter(movie => movie.id !== id);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}