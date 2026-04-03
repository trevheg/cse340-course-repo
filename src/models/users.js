import db from './db.js'
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const query_params = [name, email, passwordHash, default_role];
    
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const query_params = [email];
    const result = await db.query(query, query_params);

    if(result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return null;
    }

    if (await verifyPassword(password, user.password_hash)) {
        delete user.password_hash;
        return user;
    } else {
        return null;
    }
}

const getAllUsers = async() => {
    const query = `
        SELECT u.name, u.email, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id 
    `;
    const result = await db.query(query);
    if(result.rows.length === 0) {
        return null;
    }
    return result.rows;
}

const addUserToProject = async (userId, projectId) => {
    const query = `
        INSERT INTO user_projects (user_id, project_id)
        VALUES ($1, $2);  
    `;
    
    const query_params = [userId, projectId];
    await db.query(query, query_params);
};

const removeUserFromProject = async (userId, projectId) => {
    const query = `
        DELETE FROM user_projects
        WHERE user_id = $1 AND project_id = $2
    `;
};

const getUserProjects = async (userId) => {
    const query = `
        SELECT 
            u.user_id,
            p.project_id,
            p.title AS project_title
        FROM users AS u 
        JOIN user_projects AS up ON u.user_id = up.user_id
        JOIN service_projects AS p ON p.project_id = up.project_id 
        WHERE u.user_id = $1;
    `;
    const query_params = [userId];
    const result = await db.query(query, query_params);
    return result.rows;
};

export { 
    createUser, 
    authenticateUser,
    getAllUsers,
    addUserToProject,
    removeUserFromProject,
    getUserProjects
};