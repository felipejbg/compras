const ProdutoLista = require('./produtoLista')

ProdutoLista.methods(['get', 'post', 'put', 'delete'])
ProdutoLista.updateOptions({new: true, runValidators: true})

ProdutoLista.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

//Carrega ordenado pelo id da lista para facilitar.
ProdutoLista.route('sort.get', (req,res) => {
    ProdutoLista.find().sort({id_lista:1}).find((error,value) => {
        if(error) {
        res.status(500).json({errors: [error]})
        } else {
        if(value === null) {
            res.status(404).json({errors: 'Itens não encontrados!'})
        } else {
            res.json(value)
        }
        }
    })
})

ProdutoLista.route('count', function (req, res, next) {
    ProdutoLista.count(function (error, value) {
        if (error) {
            res.status(500).json({errors: [error]})
        }else {
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

module.exports = ProdutoLista
