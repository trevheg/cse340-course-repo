const showIndexPage = async (req, res) => {
    const title = 'Home';
    res.render('home', { title, currentPage: 'home' });
}

export { showIndexPage };