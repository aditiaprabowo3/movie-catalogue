// mengimpor module menggunakan sintaks yang umum digunakan di Node.js, yaitu require.
const assert = require('assert');

Feature('LIKING MOVIES');

Before(({ I }) => {
    I.amOnPage('/#/like');

});

Scenario('showing empty liked movies', ({ I }) => {
    I.seeElement('#query');

    I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');
});

Scenario('liking one movie', async({ I }) => {
    I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

    I.amOnPage('/');

    I.seeElement('.movie__title a');
    const firstMovie = locate('.movie__title a').first();
    const firstMovieTitle = await I.grabTextFrom(firstMovie);
    I.click(firstMovie);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/like');
    I.seeElement('.movie-item');
    const likedMovieTitle = await I.grabTextFrom('.movie__title');

    assert.strictEqual(firstMovieTitle, likedMovieTitle);
});

Scenario('searching movies', async(I) => {
    I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

    I.amOnPage('/');

    I.seeElement('.movie__title a');

    const titles = [];

    for (let i = 1; i <= 3; i++) {
        I.click(locate('.movie__title a').at(i));

        I.seeElement('#likeButton');
        I.click('#likeButton');

        // eslint-disable-next-line no-await-in-loop
        titles.push(await I.grabTextFrom('.movie__title'));

        I.amOnPage('/');
    }

    I.amOnPage('/#/like');
    I.seeElement('#query');

    const visibleLikedMovies = await I.grabNumberOfVisibleElements('.movie-item');
    assert.strictEqual(titles.length, visibleLikedMovies);

    // Baris di bawah akan mengambil potongan judul mulai dari posisi ke-1 hingga ke-2
    const searchQuery = titles[1].substring(1, 3);

    // pencarian di sesi aplikasi
    I.fillField('#query', searchQuery);
    I.pressKey('Enter');

    // mendapatkan daftar film yang sesuai dengan searchQuery
    const matchingMovies = titles.filter((title) => title.indexOf(searchQuery) !== -1);
    const visibleSearchedLikedMovies = await I.grabNumberOfVisibleElements('.movie-item');

    // Untuk memastikan jumlah film yang muncul benar, kita bandingkan kedua nilai di atas.
    assert.strictEqual(matchingMovies.length, visibleSearchedLikedMovies);

    // Pemeriksaan kedua adalah judul-judul film yang diperoleh sesuai.
    for (let i = 0; i < matchingMovies.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const visibleTitle = await I.grabTextFrom(locate('.movie__title').at(i + 1));

        // Jika sudah, kita lakukan perbandingan.
        assert.strictEqual(matchingMovies[i], visibleTitle);
    }
});