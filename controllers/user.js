var express = require('express')
var passport = require('passport')
const model = require('../models/user')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')

module.exports = {
  login: function (req, res) {
    passport.authenticate('test-login', function (err, user, info) {
      if (err) {return res.json({err: err})}
      if (!user) {return res.json({usernotfound: 'not found'}) }
      if (user) {
        var token = jwt.sign({ username: req.body.username }, 'irsanganteng')
        res.json({token: token})
      }
    })(req, res)
  },
  register: function (req, res) {
    let User = {
      username: req.body.registerusername,
      password: passwordHash.generate(req.body.registerpassword)
    }

    model.create(User).then(function (data) {
      res.json({register: data})
    }).catch(function (err) {
      res.json({err: err})
    })
  }

}
