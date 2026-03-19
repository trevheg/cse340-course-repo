import express from 'express';

import { showIndexPage } from './index.js';
import { showOrganizationsPage, showOrganizationDetailsPage  } from './organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './categories.js';
import { showTestErrorPage } from './errors.js';

const router = express.Router();

router.get('/', showIndexPage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

// error-handling routes
router.get('/test-error', showTestErrorPage);

export default router;