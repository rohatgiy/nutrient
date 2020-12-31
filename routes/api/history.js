const Entry = require('../../models/entry');
const router = require('express').Router();
// need to make sure entries get added to users array



router.post('/', (req, res, next) => {
    if (req.user)
    {
        var date = new Date(req.body.date);

        var history = [];
        for (i = req.user.entries.length-1 ; i >= 0; --i)
        {
            if (!(new Date(req.user.entries[i].date).getFullYear() == date.getFullYear() 
            && new Date(req.user.entries[i].date).getMonth() == date.getMonth() 
            && new Date(req.user.entries[i].date).getDate() == date.getDate()))
            {
                history.push(req.user.entries[i]);
            }
        }
        res.send({entries: history, reqs: req.user.requirements[0], name: req.user.firstname});
    }
    else
    {
        res.send({});
    }
});

module.exports = router;