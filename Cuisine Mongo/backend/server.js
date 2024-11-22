require('./config/dotenv');  

const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
const app = express();
const path = require('path');
const foodRoutes = require('./routes/MainPageRoutes'); 
const AuthRoutes = require('./routes/AuthRoutes'); 
const SignUpRoutes=require('./routes/SignUpRoutes');
const adminRoutes=require('./routes/AdminRoutes');
const { ErrorHandler, CreateError } = require('./middlewares/ErrorHandling'); 

connectDB(); // Connect to MongoDB

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'cuisine123', 
    resave: false,
    saveUninitialized: true
}));

app.use(AuthRoutes);
app.use(SignUpRoutes);
app.use(adminRoutes);
app.use('/', foodRoutes);  

app.use(ErrorHandler);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});