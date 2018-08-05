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

app.get('/wallet/info', (req, res) => {
    wallet.getInfo().then((info) => {
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
    console.log('query', query)

    wallet.send({
        outputs: [
            {
                value: query.value,
                address: query.address
            }
        ]
    }).then((info) => {
        console.log('Info', info)
        res.json(info)
    })
    .catch(e => {
        console.log('e', e)
        res.send(e).status(400)
    })
})

app.listen(PORT, (err) => {
    if(err) {
        console.log('Server not running, something went wrong.')
    } else {
        console.log('All is well. Server running.')
    }
})
