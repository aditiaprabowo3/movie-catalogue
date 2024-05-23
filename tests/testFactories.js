import LikeButtonInitiator from '../src/scripts/utils/LikeButtonPresenter.js';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb.js';

const createLikeButtonPresenterWithMovie = async(movie) => {
    await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteMovies: FavoriteMovieIdb,
        movie,
    });
};

export { createLikeButtonPresenterWithMovie };