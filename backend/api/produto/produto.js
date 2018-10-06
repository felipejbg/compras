const restful = require('node-restful')
const mongoose = restful.mongoose

const produtoSchema = new mongoose.Schema({
    idlista: { type: String, required: true },
    nome: { type: String, required: true },
    tipo: { type: String, required: [true, 'Informe o tipo de produto.'],
        enum: ['Alimento', 'Casa', 'Ferramenta', 'Limpeza'] }
})

module.exports = restful.model('Produto', produtoSchema)
