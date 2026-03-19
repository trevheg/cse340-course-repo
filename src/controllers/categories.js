import { getAllCategories, getCategoryDetails, getCategoryProjects } from '../models/categories.js'

const showCategoriesPage = async (req, res) => {
    const title = 'Categories';
    const categories = await getAllCategories();
    res.render('categories', { title, 
                              currentPage: 'categories',
                              categories });
}

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const categoryProjects = await getCategoryProjects(categoryId);
    const title = "Category Details";
    
    res.render('category', {
                            title, 
                            currentPage: 'category',
                            categoryDetails,
                            categoryProjects}
    );

}

export { showCategoriesPage, showCategoryDetailsPage };