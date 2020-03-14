const app = require('express')();
const routes = require('./Routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);


const port = process.env.PORT || 8080;
app.listen(port);
console.log(`todo list RESTful API server started on: ${port}`);