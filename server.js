// Express is a web application framework for Node.js. A web application framework is a collection of pre-made code designed to help create web applications. "Framework" means that it's designed to organize your file system in a certain way. Express follows the model-view-controller model, which divides functions and files into whether they are part of the model (functions that work directly with the database), views (files for specific web pages), or controllers (functions that serve as go-betweens between the front and backends). 
// Some methods included in Express include the app.use, app.get, and app.post functions.
import express from 'express';
// url is a Node.js module. fileURLToPath converts a file URL into a standard file path. I believe this enables certain links that work on my computer to also work on an external hosting site. 
import { fileURLToPath } from 'url';
// path is a Node.js module that lets you work with file and directory paths. This is so your code works on various operating systems. fileURLToPath gets the path, and "path" helps manipulate it. 
import path from 'path';
// express-session is a middleware package that handles session management. This creates a 'session' when a user visits your site and stores information in a cookie so you don't have to send user data with every server request. Also stores authentication status from logged-in users so they stay logged-in on different pages. 
import session from 'express-session';
// The testConnection function verifies that the application can connect to the PostgreSQL database. It starts with a timestamp query. If successful, it logs a success message to the console with the timestamp. If there's an error it logs the error. 
import { testConnection } from './src/models/db.js';
// When I first started coding this website, I had a list of all the various route functions. This imports a single list of all the routes for my site so I can have them in one separate place. In my case, the routes are all in one file. In a professional environment, there would be a separate routes file for each category of routes. 
import router from './src/controllers/routes.js'
// this is the function that enables flash messaging in web pages which are the one-time messages that are shown after the user does something like "organization added successfully" or "you must be logged in to do this". I didn't write it myself, the file was given in the course. 
import flash from './src/middleware/flash.js';

// Define the the application environment
// process.env.NODE_ENV has the environment the application is running in. This will usually be development or production. This code checks if there is one. If there is, it sets it to lowercase and saves it to NODE_ENV. If not, it sets NODE_ENV to 'production'
// NODE_ENV is part of Node.js
// process.env is an object in Node.js that gives access to environment variables. 
// in development mode, the output will output the logging information which is good for production. In production mode it suppresses those logs to keep sensitive information secure. 
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
// 3000 is commonly set as the default port for development. 
const PORT = process.env.PORT || 3000;

// Stores the path of the current module as a string 
// import.meta.url property provides the URL of the current module file. Thats this server.js file. 
// fileURLToPath converts the URL into a standard file path string 
// a file URL is the file path of a file on a filesystem. 
// this allows the app to work on different file systems since different file systems use different conventions for file paths. 
const __filename = fileURLToPath(import.meta.url);
// similar to above but finds the directory that this file is in. 
// __dirname and __filename are part of Node.js. 
const __dirname = path.dirname(__filename);

// initalizes a new instance of an Express applicaiton. 
// this object lets you configure middleware, set up routing, and handle HTTP requests and responses.
// note how you use it below and in routes.js
const app = express();

/**
  * Configure Express middleware
  */

// Middleware is a convention of the Express framework. 
// It receives request and response objects and uses them to perform actions. It can also modify them. It works as a bridge between the request and the response. 
// For every user request, there is a request object and a response object created. They have various objects in them, some of which are empty and are waiting to be filled. 

// Set up session management
// app.use tells express to pass every request through this middleware 
// session({...}) configures express-session for the entire application
app.use(session({
    // this is a secret key stored in the user's cookie to keep others from tampering with their session data. It's hard coded here in development, but in production it would be a random string
    secret: 'your-secret-key',
    // this only saves the session to memory if the session is modified by the request. It doesn't bother changing the memory if nothing is changed. 
    resave: false,
    // this saves new sessions that haven't been modified, that is if the user doesn't log in. 
    // In a professional application, sessions would be stored in a database so they're not lost in case of power failure, and can be accessed by different servers. 
    saveUninitialized: true,
    // sets the cookie to expire in a certain amount of milliseconds. In this case, one hour. 
    cookie: { maxAge: 60 * 60 * 1000 } // Session expires after 1 hour of inactivity
}));

// Use flash message middleware
// every request now has access to req.flash because they all pass through this 
app.use(flash);

// Allow Express to receive and process common POST data
// In other words, tells Express to parse form data from HTML forms. This converts form data from a url-encoded string into a JS object accessable via req.body. 
// extended: true sets it to use the qs library for parsing for more complex data structures like nested objects and arrays. Setting it to false would limit to the simpler querystring parser. 
app.use(express.urlencoded({ extended: true }));
// tells Express to parse JSON data sent in request bodies. After the conversion it is accessable in req.body. 
app.use(express.json());


// Serve static files from the public directory. Serve means "deliver"
// static files include HTML, CSS, JS, images, etc. They are files that don't change dynamically and can be delivered without processing
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
// lets you make EJS templates for web pages 
app.set('view engine', 'ejs');

// Tell Express where to find your templates
// tells Express to look for the ejs templates in the src/views folder. Remember that __dirname is the directory that this file (server.js) is in, which is the root directory. 
app.set('views', path.join(__dirname, 'src/views'));

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    // sets a default value of false in res.locals. 
    res.locals.isLoggedIn = false;
    // checks if the user exists in req.session.user. If they do, sets isLoggedIn to true. 
    if (req.session && req.session.user) {
        res.locals.isLoggedIn = true;
    }
    // copies the user object from req.session.user to res.locals.user, or sets it to null if no user exists. 
    // req.session is server-side session data. It exists across requests and is stored on the server. 
    // res.locals is data passed to the view templates for rendering HTML 
    res.locals.user = req.session.user || null;
    // copies NODE_ENV into res.locals 
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

// Use the imported router to handle routes
// rather than have all the routes here, put them in another location or locations and link them here. 
app.use(router);

// this is here to block log stacks of a meaningless 404 error. 
app.use((req, res, next) => {
if (req.path === '/.well-known/appspecific/com.chrome.devtools.json') {
return res.status(204).end(); // or res.status(404).end();
}
next();
});

// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});


// Global error handler
app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';
    
    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack,        
        currentPage: 'error'
    };
    
    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
});


app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});