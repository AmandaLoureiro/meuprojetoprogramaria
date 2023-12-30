const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: 'Simara Conceição',
        imagem: 'https://github.com/simaraconceicao.png',
        minibio: 'Desenvolvedora e Instrutora'
    },
    {
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/3jcxbqP',
        minibio: 'Fundadora da PrograMaria'
    },
    {
        nome:'Mina da Hora',
        iamgem:'https://bit.ly/3fkpFaz',
        minibio:'Hacker antirracista'
    }
]
   

function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta", porta)
}
app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)