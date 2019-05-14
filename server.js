const express = require('express');
const bodyParser = require('body-parser');

const SimpleChain = require('./simpleChain');

const app = express();
let port = 8000;

let myChain = new SimpleChain();

app.use(bodyParser.json());

app.get('/block/:height', async (req, res) => {
    try {
        let block = JSON.parse(await myChain.getBlock(req.params.height));

        if (!block) {
            res.status(404).end();
        } else {
            res.json(block);
        }
    } catch(err) {
        res.status(500).end();
    }
});

app.post('/block', async (req, res) => {
    try {        
        let body = req.body.body;

        if(!body){
            res.status(400).end();
        }
        else {
            let newBlock = await myChain.addBlock(body);
            res.json(newBlock);
        }
    }catch(err) {
        res.status(500).end();
    }
});

app.listen(port, () => {
    console.log('Server is up');
});

