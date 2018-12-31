    const express = require('express');
    const hbs = require('hbs');
    const fs = require('fs');
    
    const port = process.env.PORT || 3000;
    const app = express();

    hbs.registerPartials(__dirname + '/views/partials/');
    app.set('view engine', 'hbs');
    // app.use(express.static(__dirname + '/public'));

    app.use((req, res, next) => {
        const now = new Date().toString();
        const log = `${now}: ${req.method} ${req.url}`;

        console.log(log);

        fs.appendFileSync('server.log', log + '\n'); 
        
        next();
    });

    // app.use((req, res, next) => {
    //     res.render('maintenance.hbs');
    // });

    hbs.registerHelper('getCurrentYear', () => {
        return new Date().getFullYear();
    });

    hbs.registerHelper('screamIt', (phrase) => {
        return phrase.toUpperCase();
    })

    app.get('/', (req, res) => {
       // res.send('<h1>Hello Express!</h1>');
       res.render('home.hbs',{
           pageTitle: 'Home page.',
           welcomeMessage: 'Hello how are you doing?'
       });
    });

    app.get('/about', (req, res) => {
        res.render('about.hbs', {
            pageTitle: 'About page',
        });
    });

    app.get('/bad', (req, res) => {
        res.send({
            errorMessage: `An error has occured!`
        });
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
