import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, category_name, category_description
      FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategory = async() => {
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

const getCategoryProjects = async(categoryId) => {
  const query = `
    SELECT 
      c.category_id,
      c.category_name,
      c.category_description,
      p.project_id,
      p.title AS project_title,
      p.description AS project_description
    FROM categories AS c
    JOIN project_categories AS pc ON c.category_id = pc.category_id
    JOIN service_projects AS p ON p.project_id = pc.project_id
    WHERE c.category_id = $1;
  `

  const query_params = [categoryId];
  const result = await db.query(query, query_params);

  return result.rows;
}

export { getAllCategories, getCategory, getCategoryProjects }