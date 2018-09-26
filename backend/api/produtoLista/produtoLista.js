//Essa porcaria existe porque simplesmente não funciona o PUT com array na lista.
const restful = require('node-restful')
const mongoose = restful.mongoose

const produtoListaSchema = new mongoose.Schema({
    id_lista: { type: String, required: true },
    id_produto: { type: String, required: true }
})

module.exports = restful.model('produtoLista', produtoListaSchema)
