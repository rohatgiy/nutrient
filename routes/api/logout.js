const router = require('express').Router();

router.post("/", (req, res) => {
    req.logOut();
    res.end();
})

module.exports = router