import { createMovieItemTemplate } from '../../templates/template-creator.js';

class FavoriteMovieView {
    getTemplate() {
        return `
        <div class="content">
            <input id="query" type="text">
            <h2 class="content__heading">Your Liked Movie</h2>

            <div id="movies" class="movies">
            </div>
        </div>
        `;
    }

    // eslint-disable-next-line no-unused-vars
    showFavoriteMovies(movies) {
        let html;
        if (movies.length) {
            html = movies.reduce((carry, movie) => carry.concat(createMovieItemTemplate(movie)), '');
        } else {
            html = this._getEmptyMovieTemplate();
        }
        document.getElementById('movies').innerHTML = html;

        document.getElementById('movies').dispatchEvent(new Event('movies:updated'));
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('change', (event) => {
            callback(event.target.value);
        });
    }

    showMovies(movies) {
        this.showFavoriteMovies(movies);
    }

    _getEmptyMovieTemplate() {
        return `
          <div class="movie-item__not__found">
            Tidak ada film untuk ditampilkan
          </div>
        `;
    }
}

export default FavoriteMovieView;