const   express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    path = require('path'),
    flash = require('connect-flash'),
    groupRoutes = require('./routes/group'),
    methodOverride = require('method-override');
const   mask = require('./model/maskDB');
let app = express()
/*-----------------------------------------------------------------------------------------------*/
mongoose.connect('mongodb+srv://admin:trNv5BMSQ0iGv9Nr@mask.jkxyw.mongodb.net/mask?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true });
/*-----------------------------------------------------------------------------------------------*/
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('express-session')({
    secret: 'NoOneKnow',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride("_method"))
mongoose.set('useFindAndModify', false);
// seedDB()

/*-----------------------------------------------------------------------------------------------*/
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})
/*-----------------------------------------------------------------------------------------------*/
// let dinsorSchema = new mongoose.Schema({
//     title: String
// })
// let home = mongoose.model("home",dinsorSchema);
/*-----------------------------------------------------------------------------------------------*/
// mask.create({
//     mask_name : "test 1",
//     mask_number : 1,
//     count : "1"
//     }
// )
// mask.create({
//     mask_name : "test 2",
//     mask_number : 1,
//     count : "1"
//     }
// )
// mask.create({
//     mask_name : "test 3",
//     mask_number : 1,
//     count : "1"
//     }
// )
// mask.create({
//     mask_name : "test 4",
//     mask_number : 1,
//     count : "1"
//     }
// )
// mask.create({
//     mask_name : "test 5",
//     mask_number : 1,
//     count : "1"
//     }
// )
// mask.create({
//     mask_name : "test 6",
//     mask_number : 1,
//     count : "1"
//     }
// )
/*-----------------------------------------------------------------------------------------------*/
app.use('/', groupRoutes);
// app.listen(3000, function (req, res) {
//     console.log("Server is ready")
// })
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is ready on port :${ PORT }`);
});