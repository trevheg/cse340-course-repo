import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, category_name, category_description
      FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryDetails = async(categoryId) => {
  const query = `
    SELECT 
      category_id,
      category_name,
      category_description
    FROM categories
    WHERE category_id = $1;
  `

  const query_params = [categoryId];
  const result = await db.query(query, query_params);

  return result.rows.length > 0 ? result.rows[0] : null;
};

// get all the projects associated with a category
const getCategoryProjects = async(categoryId) => {
  const query = `
    SELECT 
      c.category_id,
      c.category_name,
      p.project_id,
      p.title AS project_title
    FROM categories AS c
    JOIN project_categories AS pc ON c.category_id = pc.category_id
    JOIN service_projects AS p ON p.project_id = pc.project_id
    WHERE c.category_id = $1;
  `

  const query_params = [categoryId];
  const result = await db.query(query, query_params);

  return result.rows;
}

const assignCategoryToProject = async (projectId, categoryId) => {
  const query = `
    INSERT INTO project_categories (project_id, category_id)
    VALUES ($1, $2);
  `;

  const query_params = [projectId, categoryId];
  await db.query(query, query_params);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
  const query = `
    DELETE FROM project_categories
    WHERE project_id = $1;
  `;
  const query_params = [projectId];
  await db.query(query, query_params);

  for (const categoryId of categoryIds) {
      await assignCategoryToProject(projectId, categoryId);
  }
}

const createCategory = async(categoryName, categoryDescription) => {


  const query = `
    INSERT INTO categories (category_name, category_description)
    VALUES ($1, $2)
    RETURNING category_id;
  `;

  const query_params = [categoryName, categoryDescription];
  const result = await db.query(query, query_params); 
  
  if (result.rows.length === 0) {
      throw new Error('Failed to create category');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
      console.log('Created new category with ID:', result.rows[0].category_id);
  }

  return result.rows[0].category_id;
}

export { 
  getAllCategories, 
  getCategoryDetails, 
  getCategoryProjects,
  assignCategoryToProject,
  updateCategoryAssignments,
  createCategory 
}