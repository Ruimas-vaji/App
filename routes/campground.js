const express = require("express");
const router = express.Router();
const Campgrounds = require("../models/campgrounds"); 

router.get("/campground", function (req, res) {
    Campgrounds.find({}, function (err, allCamps) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campground/campground", { camps: allCamps, currentUser: req.user });

        }
    })

})
router.post("/campground", isloggedin, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newbootcamp = { name: name, image: image, description: desc, author: author };
    Campgrounds.create(newbootcamp, function (err, camp) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campground");

        }
    })


})
router.get("/campground/new", isloggedin, function (req, res) {
    res.render("campground/new");
})
router.get("/campground/:id", function (req, res) {
    Campgrounds.findById(req.params.id).populate("comments").exec(function (err, camp) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campground/show", { camp: camp });
            

        }
    })
});
router.get("/campground/:id/edit", authorization, function (req, res) {
    Campgrounds.findById(req.params.id, function (err, camp) {
        if (err) {
            console.log(err);
        } else {
            res.render("campground/edit", { camp: camp });
        }
    })
    
    
   
})
router.put("/campground/:id", authorization, function (req, res) {
    Campgrounds.findByIdAndUpdate(req.params.id, req.body.data, function (err, updatedData) {
        if (err) {
            res.redirect("/");
        } else {
            res.redirect("/campground/" + updatedData._id);
        }
    })
})
router.delete("/campground/:id", authorization, function (req, res) {
    Campgrounds.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            res.redirect("/");
        } else {
            res.redirect("/campground");
        }
    })
})
function isloggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
function authorization(req, res, next) {
    if (req.isAuthenticated()) {
        Campgrounds.findById(req.params.id, function (err, foundCamp) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundCamp.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");

    }
}


module.exports = router;