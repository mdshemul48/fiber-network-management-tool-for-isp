const router = require('express').Router();

router.get('/', (req, res) => {
  return res.send('this is the connection route');
});

module.exports = router;
