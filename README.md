# cse340-course-repo

GitHub page: https://github.com/trevheg/cse340-course-repo
Render page: https://cse340-tgh.onrender.com/
Username: qwer@asdf.net 
password: asdfasdf

Render database resets April 9

Monday: 1:30
Tuesday: 2:40
Wednesday: 3
Thursday:
Friday:

1. Users and Login Functionality
0 pts
1) Complete
All register, log in, and log out functionality works correctly, including password hashing and link visibility. The users page displays all registered users with their name, email, and role.

2. Protected Access
0 pts
1) Complete
Pages that require login or admin permissions are protected by requireLogin and requireRole middleware functions. This is implemented for the dashboard (requires login) and creating/editing organizations, projects, and categories (requires admin role). Also implemented for /users page (requires admin role).

3. Link Visibility
0 pts
1) Complete
Links for restricted access pages are only visible to users with the appropriate roles. This is implemented for links to create/edit organizations, projects, and categories. Also implemented for the like to the users list page.

4. Code Organization and Standards
0 pts
1) Complete
All Node.js functions follow the MVC pattern and are in the appropriate files. All files and functions follow the naming conventions demonstrated in the learning activities. All code standards are followed.

5. Deployment and Professional Style
0 pts
1) Complete
The application is fully functional at the hosting server and looks professional.

6. Overall Score
100 pts
1) Complete
All rubric rows are at the Complete level.

W06 Assignment: Additional Feature
<!-- Update your database schema to include a new table to track which users have volunteered for which projects. -->
<!-- Users should be able to volunteer for more than one project and projects should be able to have multiple volunteers. -->
<!-- Remember to update your setup.sql file to include this new table. -->
<!-- Create the necessary model functions to add and remove volunteers from projects, as well as to retrieve the list of projects a user has volunteered for. -->
<!-- Update the project details view to include a volunteer link that only appears if the user is logged in. -->
<!-- When a logged-in user clicks the volunteer link, they should be added as a volunteer for that project. -->
If the user has selected to volunteer for the project, the link should change to indicate that they are now a volunteer (For example, "You are volunteering for this project"). Then there should be a link to remove themselves as a volunteer.
When a user clicks the link to remove themselves as a volunteer, they should be removed as a volunteer for that project.
<!-- If a user is not logged in, they should not see any volunteer functionality. -->
Ensure that the the routes for adding and removing volunteering projects are protected by middleware and only accessible to logged-in users.
On the dashboard page, show a list of all the projects that the user has signed up to volunteer for. Next to each project, provide an option to remove themselves as a volunteer.
Test all new functionality thoroughly to ensure it works as expected.