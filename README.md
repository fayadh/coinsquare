### Coinsquare Assignment

The project includes a client side react-redux application, and a server app.

The client app has one main Wallet component, which is made up of 4 other sub components:

* `NetworkInformation`: lists requested network information.
* `WalletInformation`: lists requested wallet information.
* `TransactionHistory`: lists the hash history of the latest 5 transactions.
* `TransactionForm`: sends BTC to a given address.

To run the application: run the server, install the libraries, and start the application.

1. `yarn install`
2. `node server.js`
3. `yarn start`

#NOTE: I'm running the applications using Node v8.

The server will be listening on port 3080 by default. You can change the PORT variable in config.json to change the port in use.

I've included some testing via jest, to check that we can connect to the network via the given config.
To run the tests, simply type:

`yarn test`

Feel free to email me at fayadh.almosawi@gmail.com to let me know if you have any questions or concerns!