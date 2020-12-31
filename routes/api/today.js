const router = require('express').Router();



router.post('/',  (req, res, next) => {
    if (req.user)
    {
        var date = req.body.date;

        var body = {entry: {food_names: [], food_codes: [], conversion_factors: [], nutrients: [], date: ""}, 
        reqs: req.user.requirements[0], name: req.user.firstname}
        for (i = req.user.entries.length-1 ; i >= 0; --i)
        {
           
            if (req.user.entries[i].date === date)
            {
                
                body = {entry: req.user.entries[i], reqs: req.user.requirements[0], name:req.user.firstname};
            }
        }
        res.send(body)
    }
    else
    {
        res.send({});
    }
});

module.exports = router;