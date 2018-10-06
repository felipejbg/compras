const _ = require('lodash')
const Lista = require('./lista')

Lista.methods(['get', 'post', 'put', 'delete'])
Lista.updateOptions({new: true, runValidators: true})

Lista.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

//Carrega todas as listas ordenadas por data em ordem decrescente
Lista.route('sort.get', (req,res) => {
    Lista.find().sort({data:-1}).find((error,value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
        if(value === null) {
            res.status(404).json({errors: 'Listas não encontrados!'})
        } else {
            res.json(value)
        }
        }
    })
})

Lista.route('count', function(req, res, next) {
  Lista.count(function(error, value) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
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

module.exports = Lista
