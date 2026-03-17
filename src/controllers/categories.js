import { getAllCategories } from '../models/categories.js'

const showCategoriesPage = async (req, res) => {
    const title = 'Categories';
    const categories = await getAllCategories();
    res.render('categories', { title, 
                              currentPage: 'categories',
                              categories });
}

export { showCategoriesPage };