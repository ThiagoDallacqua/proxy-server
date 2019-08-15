const jwt = require('jsonwebtoken');
let cache = {}

module.exports = app => {
  app.post('/register', (req, res) => { //sign up route
    console.log(req.body)
    const decoded = jwt.verify(req.body.token, 'ilovejavascript')
    console.log(decoded)
    cache.token = req.body.token
    res.json({
      success: true,
      token: decoded
    })
  })

  app.get('/allow', (req, res) => { //login route
    const token = cache.token

    if (!token) res.status(500).send('no token was found')
    try {
      const decoded = jwt.verify(cache.token, 'ilovejavascript')
      console.log(decoded)
      res.json({
        success: true,
        token: decoded
      })
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  });
}
