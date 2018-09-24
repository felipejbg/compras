const Produto = require('./produto')

Produto.methods(['get', 'post', 'put', 'delete'])
Produto.updateOptions({new: true, runValidators: true})

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
