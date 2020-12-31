const router = require('express').Router();



router.post('/',  (req, res, next) => {
    if (req.user)
    {
        var date = new Date(req.body.date);

        var body = {entry: {food_names: [], food_codes: [], conversion_factors: [], nutrients: [], date: ""}, 
        reqs: req.user.requirements[0], name: req.user.firstname}
        for (i = req.user.entries.length-1 ; i >= 0; --i)
        {
            if (new Date(req.user.entries[i].date).getFullYear() == date.getFullYear() 
            && new Date(req.user.entries[i].date).getMonth() == date.getMonth() 
            && new Date(req.user.entries[i].date).getDate() == date.getDate())
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