import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, category_name, category_description
      FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllCategories}

