var express = require("express");
require("./config/db");
// require("./config/localDb");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const cors = require('cors')
const path = require('path')
const userRoutes = require("./routes/userRoutes");
const AdsRoute = require("./routes/adsRoute");
var app = express();

var port = process.env.PORT || 9000;


app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('uploads', path.join(__dirname, 'uploads'));
app.use('/uploads', express.static('static/uploads'));
app.use("/routes", userRoutes);
app.use("/routes", AdsRoute);

app.use((err, req, res, next) => {
    {
        if (err) {
            res.redirect('/token_err')
        }
    }
})
app.use(express.static('./build'))

app.use('*', (req, res) => {

    res.sendfile('./build/index.html');

});
app.listen(port, () => console.log(`App listening on port ${port}`));


