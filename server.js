const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const mongoose    = require("mongoose");
const Campgrounds = require("./models/campgrounds");
const seedDB = require("./seedDB");
const Comment = require("./models/comment");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/User");
const methodOverride = require("method-override");
const campRoutes    = require("./routes/campground"),
      commentroutes = require("./routes/comments"),
      indexroutes   = require("./routes/index");
mongoose.connect("mongodb://localhost:27017/Bootcamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to DB!');

    })
    .catch(error => console.log(error.message));
//seedDB();
app.use(require("express-session")({
    secret: "I dont love her",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(campRoutes);
app.use(commentroutes);
app.use(indexroutes);




app.listen("3000", function (req, res) {
    console.log("server has started");
})