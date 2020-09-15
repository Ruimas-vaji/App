const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Bootcamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
        console.log('Connected to DB!');

    })
const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});
const Cat = mongoose.model("Cat", catSchema);
const paris = new Cat({
    name: "Pao",
    age: 5,
    temperament: "White"
});
paris.save(function (err, cat) {
    if (err) {
        console.log(err);
    } else {
        console.log("cat has been saved to DB!");
        console.log(cat);
    }
});
   
Cat.find({}, function (err, cats) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("")
        console.log(cats);
    }
})
    .catch(error => console.log(error.message));