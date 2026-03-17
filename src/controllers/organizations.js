import { getAllOrganizations } from '../models/organizations.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, 
                                  currentPage: 'organizations',
                                  organizations });
}

export { showOrganizationsPage };