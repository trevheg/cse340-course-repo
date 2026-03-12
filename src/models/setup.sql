CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
    ('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
    ('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
    ('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE service_projects(
	project_id SERIAL PRIMARY KEY,
	organization_id INT NOT NULL,
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(255) NOT NULL,
	date DATE NOT NULL,
	FOREIGN KEY(organization_id) REFERENCES 
	organization(organization_id)
);

INSERT INTO service_projects (organization_id, title, description, location, date)
VALUES (1, 'Argonaut Planter Boxes', 'We will build planter boxes at Argonaut Elementary School.', 'Argonaut Elementary School', '2026-03-24'),
	(1, 'Rinconada Park Fences', 'We will install new fences at Rinconada Park', 'Rinconada Park', '2027-04-23'),
	(1, 'Rinconada Park Playground', 'Building a new playground at Rinconada Park', 'Rinconada Park', '2027-04-23'),
	(1, 'Community Garden Shed', 'We will build a shed for gardening tools at Green Valley Community Garden', 'Green Valley Community Garden', '2026-05-15'),
	(1, 'Local Library Renovation', 'We will renovate the community library to create a better learning space', 'Downtown Public Library', '2026-06-10'),
	(2, 'Urban Farm Workshop', 'We will host a workshop on sustainable farming practices in the city', 'City Hall Community Center', '2026-07-14'),
	(2, 'Pollinator Garden', 'We will plant a pollinator garden to support local bees and butterflies', 'Sunny Meadows Park', '2026-08-20'),
	(2, 'Hydroponic System Installation', 'We will install a hydroponic system at the local high school for educational purposes', 'Lincoln High School', '2026-09-12'),
	(2, 'Community Composting Program', 'We will initiate a composting program to reduce waste and enrich soil', 'City Community Recycling Center', '2026-09-30'),
	(2, 'Farm-to-Table Dinner', 'We will organize a farm-to-table dinner to raise funds and awareness for urban farming', 'Central City Pavilion', '2026-10-25'),
	(3, 'Annual Charity Walk', 'We will organize a charity walk to raise funds for local shelters', 'City Park', '2026-11-05'),
	(3, 'Clothing Drive', 'We will collect and distribute clothing to families in need', 'Community Center', '2026-12-03'),
	(3, 'Food Pantry Setup', 'We will set up a food pantry to support low-income families in our community', 'Local Elementary School', '2027-01-10'),
	(3, 'Book Donation Campaign', 'We will collect and donate books to underprivileged children', 'Local Library', '2027-02-15'),
	(3, 'Toys for Tots Drive', 'We will organize a toy drive to provide gifts for children in need during the holidays', 'City Hall', '2027-03-01');

CREATE TABLE categories (
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(100) NOT NULL,
	category_description TEXT
);

INSERT INTO categories (category_name, category_description)
VALUES ('construction', 'Projects that involve building something.'),
       ('gardening', 'Projects that involve gardening in some way.'),
       ('for_kids', 'Projects that benefit children primarily.'),
       ('event', 'Projects that focus on a single, one-time event as opposed to larger projects. Events may involve more casual attendance.'),
       ('fundraising', 'Projects that focus on raising money.'),
       ('distribution', 'Projects that focus on the gathering and distribution of goods for charity.');

-- junction table between service_projects and categories
CREATE TABLE project_categories (
	project_id INTEGER NOT NULL,
	category_id INTEGER NOT NULL,
	PRIMARY KEY (project_id, category_id),
	FOREIGN KEY (project_id) REFERENCES service_projects(project_id),
	FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

INSERT INTO project_categories (project_id, category_id)
VALUES 
(1, 1), -- "Argonaut Planter Boxes" -> construction
(1, 2), -- "Argonaut Planter Boxes" -> gardening
(1, 3), -- "Argonaut Planter Boxes" -> for_kids
(2, 1), -- "Rinconada Park Fences" -> construction
(3, 1), -- "Rinconada Park Playground" -> construction
(3, 3), -- "Rinconada Park Playground" -> for_kids
(4, 1), -- "Community Garden Shed" -> construction
(4, 2), -- "Community Garden Shed" -> gardening
(5, 1), -- "Local Library Renovation" -> construction
(6, 2), -- "Urban Farm Workshop" -> gardening
(6, 4), -- "Urban Farm Workshop" -> event
(7, 1), -- "Pollinator Garden" -> construction
(7, 2), -- "Pollinator Garden" -> gardening
(8, 1), -- "Hydroponic System Installation" -> construction
(8, 3), -- "Hydroponic System Installation" -> for_kids
(9, 2), -- "Community Composting Program" -> gardening
(10, 5), -- "Farm-to-Table Dinner" -> fundraising
(10, 4), -- "Farm-to-Table Dinner" -> event
(11, 5), -- "Annual Charity Walk" -> fundraising
(11, 4), -- "Annual Charity Walk" -> event
(12, 6), -- "Clothing Drive" -> distribution
(12, 4), -- "Clothing Drive" -> event
(13, 6), -- "Food Pantry Setup" -> distribution
(14, 6), -- "Book Donation Campaign" -> distribution
(14, 3), -- "Book Donation Campaign" -> for_kids
(15, 6), -- "Toys for Tots Drive" -> distribution
(15, 3); -- "Toys for Tots Drive" -> for_kids

