const express = require ('express')
const routerAPI = express.Router()

routerAPI.use (express.urlencoded())
routerAPI.use (express.json())

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3'
  }
})

/*
routerAPI.get('/produtos', function (req, res) {
  res.json(lista_produtos)
})

const lista_produtos = {
  produtos: [
      { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
      { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
      { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
      { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
      { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
  ]
}
*/

// Cria um manipulador da rota padrão para INSERIR produtos
routerAPI.post('/produtos', function (req, res) {
  req.body.id = lista_produtos.produtos.length + 1;
  lista_produtos.produtos.push (req.body);
  res.json (`{ message: "Produto inserido com sucesso" }`)
})

// Cria um manipulador da rota padrão para CONSULTAR produtos
routerAPI.get('/produtos', function (req, res) {
  knex.select('*').from('produtos')
  .then (produtos => res.json(produtos))
  .catch (err => res.json ({ message: `Erro ao recuperar produtos: ${err.message}` }))
})
  

// Cria um manipulador da rota padrão 
routerAPI.delete('/produtos/:id', function (req, res) {
  let id = req.params.id
  knex.delete('produtos').del().where(id)
  .then (produtos => {
    let id = produtos[0].id
    res.json({ message: `Produto excluido com sucesso.`, id  })
  })
  .catch (err => res.json ({ message: `Erro ao excluir produto: ${err.message}` }))
})

module.exports = routerAPI