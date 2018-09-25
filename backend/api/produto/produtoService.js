const Produto = require('./produto')

Produto.methods(['get', 'post', 'put', 'delete'])
Produto.updateOptions({new: true, runValidators: true})

//Carrega todos os produtos ordenados por nome
Produto.route('sort.get', (req,res) => {
    Produto.find().sort({nome:1}).find((error,value) => {
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

Produto.route('count', function (req, res, next) {
    Produto.count(function (error, value) {
        if (error) {
            res.status(500).json({errors: [error]})
        }else {
            res.json({value})
        }
    })
})

module.exports = Produto
