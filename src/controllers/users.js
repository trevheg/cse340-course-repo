import bcrypt from 'bcrypt';
import { createUser } from '../models/users.js';

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
}

export { showUserRegistrationForm, processUserRegistrationForm };