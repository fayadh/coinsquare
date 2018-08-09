Coinsquare Assignment

The project has one main Wallet component, which is made up of 4 other sub components:

NetworkInformation: lists requested network information.
WalletInformation: lists requested wallet information.
TransactionHistory: lists the hash history of the latest 5 transactions.
TransactionForm: sends BTC to a given address.


To run the application: run the server, install the libraries, and start the application.

1) node server.js
2) yarn install
3) yarn start


The server will be listening on port 3080 by default. You can change the PORT variable in server.js to change the port.

I've included some testing via jest, to check that we can connect to the network via the given config.
To run the tests, simply type:

yarn test