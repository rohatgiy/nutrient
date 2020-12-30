const express = require('express');
const router = require('express').Router();
const fs = require('fs');
const API_KEY = process.env.API_KEY;
var Entry = require('../../models/entry');
router.use(express.json());

// energy (kcal) is calories
// retinol is vit a
// tocopherol is vit e
// search up fat limits

const tracked = [{name: 'Energy (kcal)', unit: "kCal"}, {name: 'Protein', unit:"g" }, {name: 'Retinol', unit:"µg"}, 
{name: 'Vitamin D', unit: "µg"}, {name: 'Tocopherol, alpha', unit: "mg"}, {name: 'Vitamin K', unit: "µg"}, 
{name: 'Vitamin C', unit: "mg"}, {name: 'Thiamin', unit: "mg"}, {name: 'Riboflavin', unit: "mg"}, 
{name: 'Niacin', unit: "mg"}, {name: 'Vitamin B-6', unit: "mg"}, {name: 'Folate, naturally occurring', unit: "µg"}, 
{name: 'Vitamin B-12', unit: "µg"}, {name: 'Calcium, Ca', unit: "mg"}, {name: 'Phosphorus, P', unit: "mg"}, 
{name: 'Magnesium, Mg', unit: "mg"}, {name: 'Iron, Fe', unit: "mg"}, {name: 'Zinc, Zn', unit: "mg"},
{name: 'Selenium, Se', unit: "µg"}, {name: 'Total Fat', unit: "g"}];

var getNutrients = function (req, res, next)
{
    fs.readFile('foods_formatted.json', 'utf8', (err, data) => {
        if (err)
        {
            return console.log(err)
        }
        obj = JSON.parse(data);

        if (req.body.food_code === null)
        {
            res.send({success: false, message: "Please choose a food and serving size."})
        }

        var check = Number(req.body.food_code);
        var serving = Number(req.body.serving_index);
        var found = false;
        for (i = 0; i < obj.length; ++i)
        {
            if (obj[i].food_code === check)
            {
                found = true;
                
                scaled_nutrients = [];
                for (j = 0; j < obj[i].nutrients.length; ++j)
                {
                    scaled_nutrients.push({"nutrient": obj[i].nutrients[j].nutrient_name,
                        "amount": obj[i].nutrients[j].nutrient_amount * obj[i].serving_sizes[serving].conversion_factor,
                        "unit": obj[i].nutrients[j].unit});
                }
                food_obj = {"food_name": obj[i].food_name,
                        "food_code": obj[i].food_code,
                        "conversion_factor": obj[i].serving_sizes[serving].conversion_factor,
                        "serving_size": obj[i].serving_sizes[serving].serving_description,
                        "nutrients": scaled_nutrients};
                res.locals.food_obj = food_obj;
                next();
            }
        }
        if (!found)
        {
            res.locals.food_obj = {
                "error": "food not found"
            }
            next();
        }
    })
}

router.post('/', getNutrients, (req, res, next) => {
    if (!req.user)
    {
        res.send({})
    }
    else
    {
        var nutrients = res.locals.food_obj.nutrients;
        var today_entries = req.user.entries;

        var date = new Date();

        var extra = []

        for (i = 0; i < tracked.length; ++i)
        {
            var found = false
            for (j =0; j < nutrients.length; ++j)
            {
                if (tracked[i].name === nutrients[j].nutrient)
                {
                    found = true
                }
                else if (j===nutrients.length-1 && !found)
                {
                    extra.push(tracked[i])
                }
            }
        }


        if (today_entries.length > 0 && today_entries[today_entries.length-1].date.getTime() === new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime())
        {
            today_entries[today_entries.length-1].food_codes.push(res.locals.food_obj.food_code);
            today_entries[today_entries.length-1].food_names.push(res.locals.food_obj.food_name+ ', '+ res.locals.food_obj.serving_size);
            today_entries[today_entries.length-1].conversion_factors.push(res.locals.food_obj.conversion_factor);

            for (i = 0; i < nutrients.length; ++i)
            {
                var found = false
                for (j = 0; j < req.user.entries[req.user.entries.length-1].nutrients.length; ++j)
                {
                    if (nutrients[i].nutrient === req.user.entries[req.user.entries.length-1].nutrients[j].nutrient)
                    {
                        found = true
                        
                        req.user.entries[req.user.entries.length-1].nutrients[j].amount += nutrients[i].amount;
                    }
                    else if (!found && j === req.user.entries[req.user.entries.length-1].nutrients.length-1)
                    {
                        req.user.entries[req.user.entries.length-1].nutrients.push(
                            {
                                nutrient: nutrients[i].nutrient,
                                amount: nutrients[i].amount,
                                unit: nutrients[i].unit
                            }
                        )
                    }
                }
            }

            for (i = 0; i < extra.length; ++i)
            {
                var found = false
                for (k=0; k < req.user.entries[req.user.entries.length-1].nutrients.length; ++k)
                {
                    if (extra[i].name === req.user.entries[req.user.entries.length-1].nutrients[k].nutrient)
                    {
                        found = true
                    }
                    else if (k === req.user.entries[req.user.entries.length-1].nutrients.length-1 && !found)
                    {
                        req.user.entries[req.user.entries.length-1].nutrients.push(
                            {
                                nutrient: extra[i].name,
                                amount: 0,
                                unit: extra[i].unit
                            }
                        )
                    }
                }
            }

            req.user.save();          
        }
        else
        {
            for (i = 0; i < extra.length; ++i)
            {
                var found = false
                for (j = 0; j < nutrients.length; ++j)
                {
                    if (extra[i].name === nutrients[j].nutrient)
                    {
                        found = true
                    }
                    else if (!found && j === nutrients.length-1)
                    {
                        nutrients.push(
                            {
                                nutrient: extra[i].name,
                                amount: 0,
                                unit: extra[i].unit
                            }
                        )
                    }
                }
            }
            var entry = new Entry(
                {
                    food_codes: [res.locals.food_obj.food_code],
                    conversion_factors: [res.locals.food_obj.conversion_factor],
                    food_names: [res.locals.food_obj.food_name+ ', '+ res.locals.food_obj.serving_size],
                    nutrients: nutrients,
                }
            );
            req.user.entries.push(entry);
            req.user.save();
        }
        res.send({name: req.user.firstname, success: true, message: "Added!"});
    }
});

module.exports = router;