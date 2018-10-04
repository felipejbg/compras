
class Lista {
    constructor(
        public _id: string,
        public nome: string,
        public data: string,
        public produto: Produto[] = []
    ) {}
}

class Produto {
    constructor(
        public nome: string,
        public tipo: string
    ) {}
}

export { Lista, Produto }
