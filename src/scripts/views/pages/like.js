import FavoriteMovieIdb from '../../data/favorite-movie-idb.js';
import FavoriteMovieView from './liked-movies/FavoriteMovieView.js';
import FavoriteMovieSearchPresenter from './liked-movies/favorite-movie-search-presenter.js';
import FavoriteMovieShowPresenter from './liked-movies/FavoriteMovieShowPresenter.js';

const view = new FavoriteMovieView();

const Like = {
    async render() {
        return view.getTemplate();
    },

    async afterRender() {
        new FavoriteMovieSearchPresenter({ view, favoriteMovies: FavoriteMovieIdb });
        new FavoriteMovieShowPresenter({ view, favoriteMovies: FavoriteMovieIdb });
    },
};

export default Like;