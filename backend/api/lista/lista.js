const restful = require('node-restful')
const mongoose = restful.mongoose

const listaComprasSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    data: { type: String, required: true },
})

module.exports = restful.model('Lista', listaComprasSchema)
