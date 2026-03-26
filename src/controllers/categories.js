import { 
    getAllCategories, 
    getCategoryDetails, 
    getCategoryProjects, 
    updateCategoryAssignments,
    createCategory 
} from '../models/categories.js';
import { getProjectDetails, getProjectCategories } from '../models/projects.js';
import { body, validationResult } from 'express-validator';


const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 50 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Category description is required')
        .isLength({ max: 500 })
        .withMessage('Category description cannot exceed 500 characters')
];

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

const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';
    res.render('new-category', { title, currentPage: 'new-category'});
};

const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new category form
        return res.redirect('/new-category');
    }

    const { name, description } = req.body;
      console.log("category name " + name)
  console.log("category description " + description)

    try {
        // Create the new category in the database
        const newCategoryId = await createCategory(name, description);

        req.flash('success', 'New category created successfully!');
        res.redirect(`/category/${newCategoryId}`);
    } catch (error) {
        console.error('Error creating new category:', error);
        req.flash('error', 'There was an error creating the category.');
        res.redirect('/new-category');
    }    
};

export { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    categoryValidation
};