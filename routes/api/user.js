const router = require('express').Router()

router.post('/', (req, res, next) => {
    if (req.user)
    {
        res.send(req.user)
    }
    else
    {
        res.send({})
    }
})

module.exports = router