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
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    showUsersPage,
    processAddUserToProject,
    processRemoveUserFromProject,
    showVolunteeringPage
} from './users.js';

import { showTestErrorPage } from './errors.js';

const router = express.Router();

router.get('/', showIndexPage);

// Organizations routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Projects routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.get('/edit-project/:projectId', requireRole('admin'), showEditProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.post('/edit-project/:projectId', requireRole('admin'), projectValidation, processEditProjectForm);

// Cateogories routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.get('/edit-category/:categoryId', requireRole('admin'), showEditCategoryForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.post('/edit-category/:categoryId', requireRole('admin'), categoryValidation, processEditCategoryForm);

// Users routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
// by putting requireLogin before showDashboard, we ensure that only authenticated users can access the dashboard
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireRole('admin'), showUsersPage);
router.get('/volunteer/:projectId', requireLogin, processAddUserToProject);
router.get('/unvolunteer/:projectId', requireLogin, processRemoveUserFromProject);
router.get('/volunteering', requireLogin, showVolunteeringPage);

// error-handling routes
router.get('/test-error', showTestErrorPage);

export default router;