const express = require("express") //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota
const cors = require('cors') //aqui estou trazendo o pacote cors que permite consumir essa api no front-end
//const { v4: uuidv4 } = require('uuid') //desconsiderar pois passamos usar o mongodb
const conectaBancoDeDados = require('./bancoDeDados')//aqui estou ligando ao arquivo banco de dados 
conectaBancoDeDados() //aqui esotu chamando a funcao que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //aqui estou iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 //aqui estou criando a porta

//aqui estou criando lista inicial de mulheres
//depois de configurado o mongodb a lista foi excluida
//const mulheres = [
    //{
        //id: '1',
        //nome: 'Simara Conceição',
        //imagem: 'https://github.com/simaraconceicao.png',
        //minibio: 'Desenvolvedora e Instrutora'
    //},
    //{
        //id: '2',
        //nome: 'Iana Chan',
        //imagem: 'https://bit.ly/3jcxbqP',
       // minibio: 'Fundadora da PrograMaria'
   // },
    //{
        //id: '3',
        //nome: 'Mina da Hora',
        //imagem: 'https://bit.ly/3fkpFaz',
        //minibio: 'Hacker antirracista'
    //}
//]


//GET
async function mostraMulheres(request, response) {
    try{
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    }catch (erro) {
        console.log(erro)

    }
    
}

//post de comentario
async function criaMulher(request, response) {
    const novaMulher = new Mulher ({
        //id: uuidv4(), //apaguei apos configurar mongodb, pois ele vai gerar o id automatico
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao

    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    }catch (erro) {
        console.log(erro)
    }
    //mulheres.push(novaMulher)//

    //response.json(mulheres)//
}

// patch
async function corrigeMulher(request, response) {

    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
       
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()    
        response.json(mulherAtualizadaNoBancoDeDados)

    } catch (erro) {
        console.log(erro)
    }
    

    //function encontraMulher(mulher) {
        //if (mulher.id === request.params.id)
            //return mulher
    //}

    //const mulherEncontrada = mulheres.find(encontraMulher)

    

    
}

// Delete

async function deletaMulher (request, response) {
try {
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({ message: 'Mulher deletada com sucesso !'})
}catch(erro) {
    console.log(erro)
}


    //function todasMenosEla(mulher) {
        //if(mulher.id !== request.params.id) {
            //return mulher

        //}
    //}
    //const mulheresQueFicam = mulheres.filter(todasMenosEla)

    //response.json(mulheresQueFicam)
}



app.use(router.get('/mulheres', mostraMulheres)) //Configurei rota GET / mulehres
app.use(router.post('/mulheres', criaMulher)) // configurei rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurei a rota patch / mulheres / :id
app.use(router.delete('/mulheres/:id', deletaMulher)) // configurei a rota delete / mulheres

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}


app.listen(porta, mostraPorta) //servidor ouvindo a porta
