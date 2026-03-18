import express from 'express';

import { showIndexPage } from './index.js';
import { showOrganizationsPage } from './organizations.js';
import { showProjectsPage } from './projects.js';
import { showCategoriesPage } from './categories.js';
import { showTestErrorPage } from './errors.js';
import { showOrganizationDetailsPage } from './organizations.js';
import { showProjectDetailsPage } from './projects.js';

const router = express.Router();

router.get('/', showIndexPage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);

// error-handling routes
router.get('/test-error', showTestErrorPage);

export default router;