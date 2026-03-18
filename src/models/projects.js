import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT sp.project_id, sp.title, sp.description, sp.location, sp.date, o.name AS organization_name
        FROM public.service_projects AS sp
        JOIN public.organization AS o ON sp.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      date
    FROM service_projects
    WHERE organization_id = $1
    ORDER BY date;
  `;
  
  const query_params = [organizationId];
  const result = await db.query(query, query_params);

  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM
      public.service_projects AS sp
    JOIN
      public.organization AS o ON sp.organization_id = o.organization_id
    WHERE
      sp.date > CURRENT_DATE
    ORDER BY
      sp.date
    LIMIT $1;    -- Limit to the specified number of upcoming projects
  `;

  const query_params = [number_of_projects];
  const result = await db.query(query, query_params);

  return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT  
            sp.project_id,
            sp.organization_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            o.name AS organization_name
        FROM
            service_projects AS sp
        JOIN 
            organization AS o ON sp.organization_id = o.organization_id
        WHERE 
            sp.project_id = $1;   -- Use project_id to filter for the specific project
    `;

    const query_params = [id];  // Parameterized query
    const result = await db.query(query, query_params);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };