import express from 'express';

import { showIndexPage } from './index.js';
import { 
    showOrganizationsPage, 
    showOrganizationDetailsPage, 
    showNewOrganizationForm, 
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm  
} from './organizations.js';
import { 
    showProjectsPage, 
    showProjectDetailsPage, 
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
} from './projects.js';
import { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    categoryValidation,
    showEditCategoryForm,
    processEditCategoryForm
} from './categories.js';
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout
} from './users.js';

import { showTestErrorPage } from './errors.js';

const router = express.Router();

router.get('/', showIndexPage);

// Organizations routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Projects routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', showNewProjectForm);
router.get('/edit-project/:projectId', showEditProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.post('/edit-project/:projectId', projectValidation, processEditProjectForm);

// Cateogories routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.get('/new-category', showNewCategoryForm);
router.get('/edit-category/:categoryId', showEditCategoryForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.post('/edit-category/:categoryId', categoryValidation, processEditCategoryForm);

// Users routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.post('/logout', processLogout);

// error-handling routes
router.get('/test-error', showTestErrorPage);

export default router;