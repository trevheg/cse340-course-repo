import bcrypt from 'bcrypt';
import { 
    createUser,
    authenticateUser
 } from '../models/users.js';

const showUserRegistrationForm = async (req, res) => {
    res.render('register', {title: 'Register', currentPage: 'register'});
};

const processUserRegistrationForm = async (req, res) => {
    const {name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const userId = await createUser(name, email, passwordHash);

        req.flash('success', 'Registration successful!');
        res.redirect('/');

    } catch (error) {
        console.error('Error registering new user: ', error);
        req.flash('error', 'There was an error during registration. Please try again.');
        res.redirect('/register');
    }
};

const showLoginForm = async (req, res) => {
    res.render('login', {title: 'Log in', currentPage: 'login'});
};

const processLoginForm = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await authenticateUser(email, password);

        if(user) {
            req.session.user = user;
            req.flash('success', 'Log in successful.');
            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in: ', user);
            } 
            res.redirect('/dashboard');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }

    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
}

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }
    req.flash('success', 'Logout successful!');
    res.redirect('/login'); 
};

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You are not authorized to be here.');
        return res.redirect('/login');
    }
    next();
};

const showDashboard = async (req, res) => {
    const user = req.session.user;
    res.render('dashboard', {
        title: 'Dashboard', 
        name: user.name, 
        email: user.email, 
        currentPage: 'dashboard'
    });
};

export { 
    showUserRegistrationForm, 
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard 
};