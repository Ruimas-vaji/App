const express = require("express");
const router = express.Router();
const Campgrounds = require("../models/campgrounds");
const Comment = require("../models/comment");

router.get("/campground/:id/comments/new", isloggedin, function (req, res) {
    Campgrounds.findById(req.params.id, function (err, foundCamp) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: foundCamp });
        }
    })
})
router.post("/campground/:id/comments", isloggedin, function (req, res) {
    Campgrounds.findById(req.params.id, function (err, camp) {
        if (err) {
            console.log(err);
            res.redirect("/campground");
        } else {
            Comment.create(req.body.comment, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    data.author.id = req.user._id;
                    data.author.username = req.user.username;
                    data.save();
                    camp.comments.push(data);
                    camp.save();
                    res.redirect("/campground/" + camp._id);
                }
            })

        }
    })
})
router.get("/campground/:id/comments/:comment_id/edit", function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
            
        }
    })
   
    
})
function isloggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = router;