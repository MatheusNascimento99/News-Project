const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const usuarioModel = require('./src/modules/usuario/usuario.model');



app.get('/usuarios', async (req, res) => {
    const usuarios = await usuarioModel.find({}); 
        return res.status(200).json([usuarios]);
    

});

app.post('/usuarios', async (req, res) => {
    if (!req.body.email) {
        return res.status(400).json({ mensage: 'O campo email é obrigatório!' });
    } if (!req.body.senha) {
        return res.status(400).json({ mensage: 'O campo senha é obrigatório!' });
    }


    // TODO VERIFICAR SE USUÁRIO JÁ EXISTE NA BASE
    const usuarioExistente = await usuarioModel.find({email: req.body.email});

    if (usuarioExistente.length){
        return res.status(400).json({mensage:'Usuário já existe!'});
    }

    const senhaCripto = bcrypt.hashSync(req.body.senha, 10);

    const usuario = await usuarioModel.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: senhaCripto
    });
    return res.status(201).json([usuario]);
});

app.get('/noticias', (req, res) => {
    return res.status(200).json([]);
});

app.post('/noticias', (req, res) => {
    return res.status(201).json([]);
});

app.listen(8080, () => {
    console.log('Servidor operacional na porta 8080 !');
});

