const restful = require('node-restful')
const mongoose = restful.mongoose

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    tipo: { type: String, required: [true, 'Informe o tipo! Valores aceitos: Alimento, Casa, Ferramenta, Limpeza.'], 
        enum: ['Alimento', 'Casa', 'Ferramenta', 'Limpeza'] }
})

module.exports = restful.model('Produto', produtoSchema)
