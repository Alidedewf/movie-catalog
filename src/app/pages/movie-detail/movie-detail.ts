import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css'],
})
export class MovieDetail implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  movie: any = null;
  loading = true;

  private apiKey = '101af39f6a539e03531b2af4fe5bfd36';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      alert('ID фильма не найден в маршруте');
      return;
    }

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=ru-RU`;

    this.http.get(url).subscribe({
      next: (res) => {
        this.movie = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки фильма:', err);
        this.loading = false;
        alert('Ошибка загрузки данных фильма');
      }
    });
  }

  getGenreNames(): string {
    return this.movie?.genres?.map((g: any) => g.name).join(', ') || '—';
  }

  addToFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = favorites.find((f: any) => f.id === this.movie.id);
    if (!exists) {
      favorites.push(this.movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Добавлено в избранное!');
    } else {
      alert('Уже в избранном!');
    }
  }
}