const express = require('express')
const app = express()
const PORT = 3080
const cors = require('cors')
const { wallet, networkClient } = require('./connect')

app.use(cors())
app.use(express.static('dist'))

app.get('/network/info', (req, res) => {
    networkClient.getInfo().then((info) => {
        res.json(info)
    })
    .catch(e => {
        res.send(e).status(400)
    })
})

app.get('/network/validate_address', (req, res) => {
    const query = req.query

    networkClient.execute('validateaddress', [query.address]).then((result) => {
        res.json(result)
    })
    .catch(e => {
        res.send(e).status(400)
    })
})

app.get('/network/difficulty', (req, res) => {
    networkClient.execute('getinfo').then((info) => {
        res.json(info.difficulty)
    })
    .catch(e => {
        res.send(e).status(400)
    })
})

app.get('/wallet/info', (req, res) => {
    wallet.getInfo().then((info) => {
        res.json(info)
    })
    .catch(e => {
        res.send(e).status(400)
    })
})

app.get('/wallet/pending', (req, res) => {
    wallet.getPending().then((info) => {
        res.json(info)
    })
    .catch(e => {
        res.send(e).status(400)
    })
})

app.get('/wallet/balance', (req, res) => {
    wallet.getBalance().then((info) => {
        console.log('info')
        res.json(info)
    })
    .catch(e => {
        res.send(e).status(400)
    })
})

app.get('/wallet/history', (req, res) => {
    wallet.getHistory().then((info) => {
        res.json(info)
    })
    .catch(e => {
        res.send(e).status(400)
    })
})

app.post('/wallet/send', (req, res) => {
    const query = req.query
    //TODO: add guards
    
    wallet.send({
        outputs: [
            {
                value: 1000,
                address: '2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF'
            }
        ]
    }).then((info) => {
        console.log('Info', info)
        res.json({
            msg: 'here i am',
            data: info
        })
    })
    .catch(e => {
        console.log('e', e)
        res.json(e)
    })
})

app.listen(PORT, (err) => {
    if(err) {
        console.log('Server not running, something went wrong.')
    } else {
        console.log('All is well. Server running.')
    }
})
