const router = require('express').Router();

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

router.post('/', (req, res, next) => {
     /*
        1. send the updated info to the db
    */
    if (req.user)
    {
        newAge = req.body.age;
        newGender = req.body.gender;
        nutReqs = [];

        if (newGender === "male")
        {
            if (newAge === "11-14")
            {
                nutReqs = males11to14
            }
            else if (newAge === "15-18")
            {
                nutReqs = males15to18
            }
            else if (newAge === "19-24")
            {
                nutReqs = males19to24
            }
            else if (newAge === "25-50")
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
            if (newAge === "11-14")
            {
                nutReqs = females11to14
            }
            else if (newAge === "15-18")
            {
                nutReqs = females15to18
            }
            else if (newAge === "19-24")
            {
                nutReqs = females19to24
            }
            else if (newAge === "25-50")
            {
                nutReqs = females25to50
            }
            else
            {
                nutReqs = femalesOver51
            }
        }

        req.user.age=newAge
        req.user.gender=newGender
        req.user.requirements=nutReqs
        req.user.save();
        res.json(req.user);
    }
    else
    {
        res.send({})
    }
});

module.exports = router;