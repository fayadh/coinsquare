import axios from 'axios';

export const getNetworkInfo = () => {
    return axios.get('http://localhost:3080/network/info').then((res) => {
        return res.data
    }).catch(e => console.log('error getNetworkInfo', e))
}

export const getWalletInfo = () => {
    return axios.get('http://localhost:3080/wallet/info').then((res) => {
        return res.data
    }).catch(e => console.log('error getWalletInfo', e))
}

export const getWalletHistory = () => {
    return axios.get('http://localhost:3080/wallet/history').then((res) => {
        return res.data
    }).catch(e => console.log('error getWalletHistory', e))
}

export const getNetworkDifficulty = () => {
    return axios.get('http://localhost:3080/network/difficulty').then((res) => {
        return res.data
    }).catch(e => console.log('error getNetworkDifficulty', e))
}