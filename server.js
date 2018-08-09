const express = require('express')
const app = express()
const PORT = 3080
const cors = require('cors')
const { 
    account,
    wallet, 
    walletID,
    walletClient, 
    networkClient 
} = require('./connect')

app.use(cors())
app.use(express.static('dist'))

app.get('/network/info', (req, res) => {
    networkClient.execute('getinfo').then((info) => {
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

app.get('/wallet/info', (req, res) => {
    wallet.getInfo()
    .then((walletInfo) => {
        res.json(walletInfo)
    })
    .catch(e => {
        res.send(e).status(400)
    })
})

app.get('/wallet/history', (req, res) => {
    walletClient.execute('listtransactions', [walletID]).then((info) => {
        res.json(info)
    })
    .catch(e => {
        res.send(e).status(400)
    })
})

app.post('/wallet/send', (req, res) => {
    const query = req.query
    const { address } = query
    const value = parseInt(query.value)

    if(!address) {
        res.status(400).send('Address must be included.')
        return
    }

    if(value <= 0) {
        res.status(400).send('Value must be greater than 0.')
        return
    }

    networkClient.execute('validateaddress', [query.address])
    .then((validation) => {
        if(!validation.isvalid) {
            throw new Error('Address is not valid.')
        }

        return walletClient.execute('sendtoaddress', [address, value])
    })
    .then((transaction_info) => {
        res.json(transaction_info)
    })
    .catch(e => {
        res.status(400).send(e)
    })
})

app.listen(PORT, (err) => {
    if(err) {
        console.log('Server not running, something went wrong.')
    } else {
        console.log('All is well. Server running.')
    }
})
