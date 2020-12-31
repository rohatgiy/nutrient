const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const validator = require('express-validator');
const bcrypt = require('bcrypt');
var User = require('../models/user');

const males11to14 = [{"Energy (kcal)":2500, "Protein":45, "Retinol": 1000, "Vitamin D": 10, 
"Tocopherol, alpha": 10, "Vitamin K": 45, "Vitamin C": 50, "Thiamin": 1.3, "Riboflavin": 1.5, "Niacin": 17, 
"Vitamin B-6": 1.7, "Folate, naturally occurring": 150, "Vitamin B-12": 2, "Calcium, Ca": 1200, "Phosphorus, P": 1200, 
"Magnesium, Mg": 270, 
"Iron, Fe": 12, "Zinc, Zn": 15, "Selenium, Se": 40, "Total Fat": 85}]

const females11to14 = [{"Energy (kcal)":2200,"Protein":46, "Retinol": 800, "Vitamin D": 10, 
"Tocopherol, alpha": 8, "Vitamin K": 45, "Vitamin C": 50, "Thiamin": 1.1, "Riboflavin": 1.3, "Niacin": 15, 
"Vitamin B-6": 1.4, "Folate, naturally occurring": 150, "Vitamin B-12": 2, "Calcium, Ca": 1200, "Phosphorus, P": 1200, 
"Magnesium, Mg": 280, 
"Iron, Fe": 15, "Zinc, Zn": 12, "Selenium, Se": 45, "Total Fat": 70}]


const males15to18 = [{"Energy (kcal)":3000,"Protein":59, "Retinol": 1000, "Vitamin D": 10, 
"Tocopherol, alpha": 10, "Vitamin K": 65, "Vitamin C": 60, "Thiamin": 1.5, "Riboflavin": 1.8, "Niacin": 20, 
"Vitamin B-6": 2.0, "Folate, naturally occurring": 200, "Vitamin B-12": 2, "Calcium, Ca": 1200, "Phosphorus, P": 1200, 
"Magnesium, Mg": 400, 
"Iron, Fe": 12, "Zinc, Zn": 15, "Selenium, Se": 50, "Total Fat": 95}]

const females15to18 = [{"Energy (kcal)":2200,"Protein":44, "Retinol": 800, "Vitamin D": 10, 
"Tocopherol, alpha": 8, "Vitamin K": 55, "Vitamin C": 60, "Thiamin": 1.1, "Riboflavin": 1.3, "Niacin": 15, 
"Vitamin B-6": 1.5, "Folate, naturally occurring": 180, "Vitamin B-12": 2, "Calcium, Ca": 1200, "Phosphorus, P": 1200, 
"Magnesium, Mg": 300, 
"Iron, Fe": 15, "Zinc, Zn": 12, "Selenium, Se": 50, "Total Fat": 70}]


const males19to24 = [{"Energy (kcal)":2900,"Protein":58, "Retinol": 1000, "Vitamin D": 10, 
"Tocopherol, alpha": 10, "Vitamin K": 70, "Vitamin C": 60, "Thiamin": 1.5, "Riboflavin": 1.7, "Niacin": 19, 
"Vitamin B-6": 2.0, "Folate, naturally occurring": 200, "Vitamin B-12": 2, "Calcium, Ca": 1200, "Phosphorus, P": 1200, 
"Magnesium, Mg": 350, 
"Iron, Fe": 10, "Zinc, Zn": 15, "Selenium, Se": 70, "Total Fat": 95}]

const females19to24 = [{"Energy (kcal)":2200,"Protein":46, "Retinol": 800, "Vitamin D": 10, 
"Tocopherol, alpha": 8, "Vitamin K": 60, "Vitamin C": 60, "Thiamin": 1.1, "Riboflavin": 1.3, "Niacin": 15, 
"Vitamin B-6": 1.6, "Folate, naturally occurring": 180, "Vitamin B-12": 2, "Calcium, Ca": 1200, "Phosphorus, P": 1200, 
"Magnesium, Mg": 280, 
"Iron, Fe": 15, "Zinc, Zn": 12, "Selenium, Se": 55, "Total Fat": 70}]


const males25to50 = [{"Energy (kcal)":2900,"Protein":63, "Retinol": 1000, "Vitamin D": 5, 
"Tocopherol, alpha": 10, "Vitamin K": 80, "Vitamin C": 60, "Thiamin": 1.5, "Riboflavin": 1.7, "Niacin": 19, 
"Vitamin B-6": 2.0, "Folate, naturally occurring": 200, "Vitamin B-12": 2, "Calcium, Ca": 800, "Phosphorus, P": 800, 
"Magnesium, Mg": 350, 
"Iron, Fe": 10, "Zinc, Zn": 15, "Selenium, Se": 70, "Total Fat": 95}]

const females25to50 = [{"Energy (kcal)":2200,"Protein":50, "Retinol": 800, "Vitamin D": 5, 
"Tocopherol, alpha": 8, "Vitamin K": 60, "Vitamin C": 60, "Thiamin": 1.1, "Riboflavin": 1.3, "Niacin": 15, 
"Vitamin B-6": 1.6, "Folate, naturally occurring": 180, "Vitamin B-12": 2, "Calcium, Ca": 800, "Phosphorus, P": 800, 
"Magnesium, Mg": 280, 
"Iron, Fe": 15, "Zinc, Zn": 12, "Selenium, Se": 55, "Total Fat": 70}]


const malesOver51 = [{"Energy (kcal)":3000,"Protein":63, "Retinol": 1000, "Vitamin D": 5, 
"Tocopherol, alpha": 10, "Vitamin K": 80, "Vitamin C": 60, "Thiamin": 1.2, "Riboflavin": 1.4, "Niacin": 15, 
"Vitamin B-6": 2.0, "Folate, naturally occurring": 200, "Vitamin B-12": 2, "Calcium, Ca": 800, "Phosphorus, P": 800, 
"Magnesium, Mg": 350, 
"Iron, Fe": 10, "Zinc, Zn": 15, "Selenium, Se": 70, "Total Fat": 95}]

const femalesOver51 = [{"Energy (kcal)":1900,"Protein":50, "Retinol": 800, "Vitamin D": 5, 
"Tocopherol, alpha": 8, "Vitamin K": 60, "Vitamin C": 60, "Thiamin": 1, "Riboflavin": 1.2, "Niacin": 13, 
"Vitamin B-6": 1.6, "Folate, naturally occurring": 180, "Vitamin B-12": 2, "Calcium, Ca": 800, "Phosphorus, P": 800, 
"Magnesium, Mg": 280, 
"Iron, Fe": 10, "Zinc, Zn": 12, "Selenium, Se": 55, "Total Fat": 70}]

passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, {message: { success: false, message: 'Incorrect username.' }});
            }

            bcrypt.compare(password, user.password, (err, result) => {

                if (result) {
                    console.log("logged in");
                    return done(null, user);
                }
                else {
                    console.log("login failed");
                    return done(null, false, {message: { success: false, message: "Incorrect password." }});
                }
            });
        });
    }));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

exports.login_user_post = (req, res, next) => {

    console.log('try to login');

    passport.authenticate('local', {badRequestMessage: {success: false, message: "Please enter username and password."}}, 
    function (err, user, info)
    {
        if (err)
        {
            return res.status(401).json(err)
        }
        
        if (!user)
        {
            return res.status(401).json(info)
        }

        console.log(user)

        req.logIn(user, function (err)
        {
            if (err)
            {
                return next(err)
            }
            return res.send(user)
        });
    })(req, res, next)
};

const validateUserCreation =
    [
        validator.body('firstname').trim().isLength({ min: 1 }).withMessage("Must have a first name.").isAlpha()
        .withMessage('First name can only contain letters.'),

        validator.body('username').trim().isLength({ min: 5, max: 15 }).withMessage("Username must be between 5 and 15 characters.")
        .isAlphanumeric().withMessage("Username can only contain letters and numbers.")
            .custom((value, { req }) => {
                return new Promise((resolve, reject) => {
                    User.findOne({ username: req.body.username }, function (err, user) {
                        if (err) {
                            reject('MongoDB Atlas Error.')
                        }
                        if (Boolean(user)) {
                            reject('Username already in use.')
                        }
                        resolve(true)
                    });
                });
            }),

        validator.body('password', 'Password must be 8 or more characters.').isLength({ min: 8 }),

        validator.body('conf_password').custom(function (value, { req }) {
            if (value === req.body.password) {
                return true;
            }
            else {
                throw "Passwords do not match.";
            }
        }),

        validator.body('age').isIn(["11-14", "15-18", "19-24", "25-50", "51+"]).withMessage("Select an age."),

        validator.body('gender').isIn(["male", "female"]).withMessage("Select a gender."),

        validator.check(['username', 'firstname', 'password', 'conf_password', 'age', 'gender']).escape()
    ]

exports.create_user_post = [validateUserCreation, (req, res) => {
    if (validator.validationResult(req).isEmpty())
    {
        var plainTextPassword = req.body.password;

    bcrypt.hash(plainTextPassword, 10, (err, hash) => {
        var gender = req.body.gender
        var age = req.body.age
        var nutReqs = []

        if (gender === "male")
        {
            if (age === "11-14")
            {
                nutReqs = males11to14
            }
            else if (age === "15-18")
            {
                nutReqs = males15to18
            }
            else if (age === "19-24")
            {
                nutReqs = males19to24
            }
            else if (age === "25-50")
            {
                nutReqs = males25to50
            }
            else
            {
                nutReqs = malesOver51
            }
        }
        else
        {
            if (age === "11-14")
            {
                nutReqs = females11to14
            }
            else if (age === "15-18")
            {
                nutReqs = females15to18
            }
            else if (age === "19-24")
            {
                nutReqs = females19to24
            }
            else if (age === "25-50")
            {
                nutReqs = females25to50
            }
            else
            {
                nutReqs = femalesOver51
            }
        }

        var user = new User({
            username: req.body.username,
            password: hash,
            firstname: req.body.firstname,
            entries: [],
            requirements: nutReqs,
            age: age,
            gender: gender
        });
        user.save()
        .catch(err => {
            console.log('Error ' + err);
        }

        );
        console.log('user created')
        res.json({success: true});
    });
    }
    else
    {
        console.log("couldn't create user")
        res.send({message: validator.validationResult(req).errors[0].msg})
    }
    
}]