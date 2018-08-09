const { NodeClient, WalletClient } = require('bclient');
const { Network } = require('bcoin');

const network = Network.get('testnet');

const config = require('./config.json')
const PORT = 18332
const walletID = 'primary'
const account = 'default'

const networkClientOptions = {
  network: network.type,
  port: PORT,
  url: `${config.user}:${config.pass}@${config.url}`
}

const walletOptions = {
    network: network.type,
    port: PORT, //in this case, the walletPort is the same as the rpcPort
    url: `${config.user}:${config.pass}@${config.url}`
}

const networkClient = new NodeClient(networkClientOptions);
const walletClient = new WalletClient(walletOptions);
const wallet = walletClient.wallet(walletID);

module.exports = {
    networkClient,
    walletClient,
    walletID,
    wallet,
    account
}