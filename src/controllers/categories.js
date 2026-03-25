import { getAllCategories, getCategoryDetails, getCategoryProjects, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails, getProjectCategories } from '../models/projects.js';

const showCategoriesPage = async (req, res) => {
    const title = 'Categories';
    const categories = await getAllCategories();
    res.render('categories', { title, 
                              currentPage: 'categories',
                              categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const categoryProjects = await getCategoryProjects(categoryId);
    const title = "Category Details";
    
    res.render('category', {
                            title, 
                            currentPage: 'category',
                            categoryDetails,
                            categoryProjects});
}

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await  getAllCategories();
    const assignedCategories = await getProjectCategories(projectId);
    const title = 'Assign Categories to Project';

    console.log("we get as far as showAssignCategoriesForm")
    console.log("projectId is " + projectId)

    res.render('assign-categories', {
                                    projectDetails,
                                    projectId,
                                    categories,
                                    assignedCategories,
                                    title,
                                    currentPage: 'assign-categories'
    });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};