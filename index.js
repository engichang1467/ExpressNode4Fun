import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import data from './data/data.json';

const app = express();
const PORT = 3000;

// Adding static route
// this is for public folder on path folder
app.use(express.static('public'));

// method to use JSON
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

// This is for proxies
// for more information: http://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 'loopback');

// this is for images folder on path images
app.use('/images', express.static('images'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// basics of route
// get() - getting the data
app.get('/', (req, res) =>
    // get data first
    res.json(data)
);

// JSON data
// {"hello": "JSON is cool"}
// URLEncoded data
// hello=URLEncoded+is+cool

app.post('/newItem', (req,res) => {
    console.log(req.body);
    res.send(req.body);
});

app.get('/item/:id', (req, res, next) => {
    // this is the middleware that pulls the data
    console.log(req.params.id); // get the params and output it on the server
    let user = Number(req.params.id);       // convert the string into a number
    console.log(user);                      // output the user index number on the server
    console.log(data[user]);                // output the object of the user onto the server
    // middleware that uses the req object
    console.log(`Request from ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    // everything above is middleware
    res.send(data[user]);                   // output the data of that user onto the frontend page
    next(); // this will jump to the next function below
}, (req, res) =>
    console.log('Did you get the right data?')
);

// post() - sending the data to the server
app.put('/newItem', (req, res) =>
    res.send(`a put request with /newItem route on the port ${PORT}`)
);

// put() - update ur system
// app.put('/item', (req, res) =>
//     res.send(`a put request with /item route on the port ${PORT}`)
// );

// to chain your method
app.route('/item')
    .get((req, res) => {
        throw new Error();
        // res.download('images/rocket.jpg')
        // res.send(`a get request with /item route on the port ${PORT}`)
        // res.end() // end the call
        // res.redirect('http://www.youtube.com') // redirect to another website
    })
    .put((req, res) =>
        res.send(`a put request with /newItem route on the port ${PORT}`)
    )
    .delete((req, res) =>
        res.send(`a delete request with /item route on port ${PORT}`)
);

// delete() - delete data
app.delete('/item', (req, res) =>
    res.send(`a delete request with /item route on the port ${PORT}`)
);

// Error handling function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Red alert! Red alert!: ${err.stack}`);
});


app.listen(PORT, () => {
    // we can only see these data in the server
    console.log(`Your server is running on port ${PORT}`);
    // console.log(data);  
});