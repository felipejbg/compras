const _ = require('lodash')
const Produto = require('./produto')
const url = require('url');

Produto.methods(['get', 'post', 'put', 'delete'])
Produto.updateOptions({new: true, runValidators: true})

Produto.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

Produto.route('get', (req,res) => {
    var q = url.parse(req.url, true).query;
    var id = q.id;
    Produto.find({ idlista: id }, (error,value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
        if(value === null) {
            res.status(404).json({errors: 'Produtos não encontrados!'})
        } else {
            res.json(value)
        }
        }
    })
})

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

module.exports = Produto
