const model = require('../models/data')

module.exports = {
  create: function (req, res) {
    let data = {
      letter: req.body.letter,
      frequency: req.body.frequency,
      is_deleted: 0
    }
    model.create(data).then(function (data) {
      res.json({success: data})
    }).catch(function (err) {
      res.json({err: err})
    })
  },
  read: function (req, res) {
    model.find({is_deleted: 0})
      .then(function (data) {
        res.json({read: data})
      }).catch(function (err) {
      res.json({err: err})
    })
  },
  delete: function (req, res) {
    let id = {
      '_id': req.body.objid
    }
    model.findOne(id)
      .then(function (data) {
        data.is_deleted = 1
        data.save(function (err) {
          if (err) {
            res.json({errorsave: err})
          }
        })
        res.json({delete: true})
      }).catch(function (err) {
      res.json({notfound: err})
    })
  },
  beforeUpdate: function (req, res) {
    let id = {
      '_id': req.params.id
    }
    model.findOne(id)
      .then(function (data) {
        res.json({update: data})
      }).catch(function (err) {
      res.json({notfound: err})
    })
  },
  update: function (req, res) {
    let id = {
      '_id': req.body.objid
    }
    let update = {
      'letter': req.body.editingletter,
      'frequency': req.body.editingfrequency
    }
    model.findOne(id).update(update).exec(function (err, data) {
      if (err) {
        res.json({err: err})
      }
      if (data) {
        res.json({update: data,
        id: req.body.objid})
      }
    })
  },
  search: function (req, res) {
    let data = {
      letter: req.body.searchletter,
      frequency: req.body.searchfrequency
    }

    if (data.letter && data.frequency) {
      model.find(data).then(function (data) {
        if (data) {
          res.json({success: data})
        }
      }).catch(function (err) {
        res.json({err: err})
      })
    }
    if (!data.letter) {
      model.find({'frequency': data.frequency}).then(function (data) {
        if (data) {
          res.json({success: data})
        }
      }).catch(function (err) {
        res.json({err: err})
      })
    }
    if (!data.frequency) {
      model.find({'letter': data.letter}).then(function (data) {
        if (data) {
          res.json({success: data})
        }
      }).catch(function (err) {
        res.json({err: err})
      })
    }
  }

}
