
class Produto {
    _id: string
    nome: string
    tipo: string
}

class Lista {
    _id: string
    nome: string
    data: string
    produto: Produto[]
}

export { Lista, Produto }
