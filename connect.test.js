const connect = require('./connect');

describe('Network and Wallet configs are correct.', () => {
    test('Network connects via the given config.', () => {
        expect.assertions(1);
        return connect.networkClient.getInfo().then((info) => {
            expect(info).toHaveProperty('network');
        })
    });

    test('Wallet connects via the given config.', () => {
        expect.assertions(1);
        return connect.wallet.getInfo().then((info) => {
            expect(info).toHaveProperty('network');
        })
    });
})