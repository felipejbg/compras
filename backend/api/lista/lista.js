const restful = require('node-restful')
const mongoose = restful.mongoose

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    tipo: { type: String, required: [true, 'Informe o tipo de produto.'],
        enum: ['Alimento', 'Casa', 'Ferramenta', 'Limpeza'] }
})

const listaComprasSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    data: { type: String, required: true },
    produto: [ produtoSchema ]
})

module.exports = restful.model('Lista', listaComprasSchema)
