const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

var app = express();

//method 3
hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('makeUpperCase', (text) =>{
    return text.toUpperCase();
});
app.set('view engine', 'hbs');

app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url} `;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (error) => {
        if(error) { console.log('Unable to append to server.log'); }
    });
    next();
});

app.use( (req, res, next) => {
    res.render('maintenance.hbs');
   
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home', 
        welcomeMessage: 'Welcome to my website',
        currentYear: new Date().getFullYear()
    });
});


app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Us',
        currentYear: new Date().getFullYear()
    });
});
// Mehod 2
// app.use(express.static(__dirname+'/public'));


// Method 1
// app.get('/', (req, res) => {
//    // res.send('<h1>Hello! express!!</h1>');
//    res.send({
//        name: 'Anup Kumar',
//        likes: [
//            'coding',
//            'playing chess'
//        ]
//    });
// });

// app.get('/about', (req, res) => {
//     res.send('About Page!!');
// });

// app.get('/bad', (req, res) =>{
//     res.send({
//         errorMessage: 'Unable to handle request'
//     });
// });

app.listen(3000, () =>{
    console.log('Server Running at http://127.0.0.1:3000');
});