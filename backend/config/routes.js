const express = require('express')

module.exports = function(server) {

  // API Routes
  const router = express.Router()
  server.use('/api', router)

  // rotas da API
  const produtoService = require('../api/produto/produtoService')
  produtoService.register(router, '/produto')

  const listaService = require('../api/lista/listaService')
  listaService.register(router, '/lista')

}
