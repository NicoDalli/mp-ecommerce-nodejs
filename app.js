var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

const mpConfig = require('./config');
const controller = require('./controller');

// START - MercadoPago configuration
var mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: mpConfig.accessToken,
    integrator_id: mpConfig.integratorId
});
// END - MercadoPago configuration

var port = process.env.PORT || 3000

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home', {
        view: "home"
    });
});

app.get('/detail', controller.detail);

app.get('/success', controller.success);

app.get('/pending', function (req, res) {
    res.render('pending');
});

app.get('/failure', function (req, res) {
    res.render('failure');
});

app.post('/ipn', controller.ipnHandler)

app.listen(port, function() {
    console.info(`Listening on port ${port}!`)
});