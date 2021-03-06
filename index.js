const 
    express = require('express'), 
    mongoose = require('mongoose'), 
    bodyParser = require('body-parser'),
    http = require('http')
    app = express();


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/divigramalytics"
);

const port = process.env.port || 1450;
// const routes = require('./db/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.Promise = Promise;

require('./api')(app);
require('./bot/bot');

app.listen(port, () => {
    console.log('Server listening on port:', port)
});
