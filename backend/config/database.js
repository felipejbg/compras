const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost:27017/compras')

//Mensagens de erro requerida irão seguir esse padrão.
mongoose.Error.messages.general.required = "O atributo '{PATH} é obrigatório'"

//Padrão de mensagens de erro para valores enum.
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."
