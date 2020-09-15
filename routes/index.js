const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");



router.get("/", function (req, res) {
    res.render("campground/landing");
})
router.get("/register", function (req, res) {
    res.render("user/register");
})
router.post("/register", function (req, res) {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campground");
        })
    })
})
router.get("/login", function (req, res) {
    res.render("user/login");
})
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campground",
    failureRedirect: "/login"
}), function (req, res) {

})
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
})
function isloggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = router;