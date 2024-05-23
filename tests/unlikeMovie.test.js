import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb.js';
import * as TestFactories from './testFactories.js';

describe('Unliking A Movie', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    // nambahkan movie ID 1 pada daftar film yang disukai sebelum tiap test case dijalankan
    beforeEach(async() => {
        addLikeButtonContainer();
        await FavoriteMovieIdb.putMovie({ id: 1 });
    });

    // Setelah tiap metode tes dijalankan, kita hapus movie ID 1 dari daftar tersebu
    afterEach(async() => {
        await FavoriteMovieIdb.deleteMovie(1);
    });

    it('should display unlike widget when the movie has been liked', async() => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

        expect(document.querySelector('[aria-label="unlike this movie"]')).toBeTruthy();
    });

    it('should not display like widget when the movie has been liked', async() => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
        expect(document.querySelector('[aria-label="like this movie"]')).toBeFalsy();
    });

    //! Untuk menguji film dihapus dari daftar film disukai ketika widget-nya ditekan, kita simulasikan user menekan tombol tersebut dengan cara membangkitkan event click
    it('should be able to remove liked movie from the list', async() => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

        document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'));

        expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
    });

    //! membatalkan film yang disukai ketika tidak ada di dalam daftar
    it('should not throw error when user click unlike widget if the unliked movie is not in the list', async() => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

        // Hapus dulu film dari daftar film yang disukai
        await FavoriteMovieIdb.deleteMovie(1);

        // Kemudian, simulasikan pengguna menekan widget batal menyukai film
        document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'));
        expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
    });
});