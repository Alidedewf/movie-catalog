import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css']
})
export class MovieListComponent {
  private http = inject(HttpClient);

  movies: any[] = [];
  genres: any[] = [];
  loading: boolean = true;

  // Фильтры
  searchTerm: string = '';
  selectedGenre: string = '';
  selectedYear: string = '';
  selectedRating: string = '';
  selectedSort: string = ''; // '', 'title', 'year', 'rating'

  private apiKey = '101af39f6a539e03531b2af4fe5bfd36';

  ngOnInit() {
    this.fetchGenres();
    this.fetchMovies();
  }

  // Получение жанров
  fetchGenres() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=ru-RU`;
    this.http.get(url).subscribe((res: any) => {
      this.genres = res.genres;
    });
  }

  // Получение фильмов с учетом фильтров и сортировки
  fetchMovies() {
    this.loading = true;

    const query = this.searchTerm.trim();
    const genreId = this.selectedGenre;
    const year = this.selectedYear;
    const rating = this.selectedRating;
    const sort = this.selectedSort;

    let url = '';

    if (query) {
      // Поиск по названию
      url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=ru-RU&query=${encodeURIComponent(query)}`;
    } else {
      // Discover с фильтрами и сортировкой
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=ru-RU`;

      // Сортировка
      switch (sort) {
        case 'title':
          url += `&sort_by=original_title.asc`;
          break;
        case 'year':
          url += `&sort_by=primary_release_date.desc`;
          break;
        case 'rating':
          url += `&sort_by=vote_average.desc`;
          break;
        default:
          url += `&sort_by=popularity.desc`;
      }

      // Фильтры
      if (genreId) url += `&with_genres=${genreId}`;
      if (year) url += `&primary_release_year=${year}`;
      if (rating) url += `&vote_average.gte=${rating}`;
    }

    this.http.get(url).subscribe((res: any) => {
      this.movies = res.results;
      this.loading = false;
    });
  }

  // Поиск по кнопке или вводу
  onSearch() {
    this.fetchMovies();
  }

  // Генерация списка годов для фильтра
  getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let y = currentYear; y >= 1980; y--) {
      years.push(y);
    }
    return years;
  }

  // Генерация значений рейтинга от 1 до 9
  getRatings(): number[] {
    return Array.from({ length: 9 }, (_, i) => i + 1);
  }
}
