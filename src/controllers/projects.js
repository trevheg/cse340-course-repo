import { getAllProjects, getUpcomingProjects, getProjectDetails, getProjectCategories } from '../models/projects.js'

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, 
                            currentPage: 'projects', 
                            projects});
}

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const projectCategories = await getProjectCategories(projectId);

    const title = 'Project Details';

    res.render('project', {title, 
                           currentPage: 'project',
                           projectDetails,
                           projectCategories} 
    );

}

export { showProjectsPage, showProjectDetailsPage };