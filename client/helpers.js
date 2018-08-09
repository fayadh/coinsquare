import axios from 'axios';
import config from '../config.json';

export const getNetworkInfo = () => {
    return axios.get(`http://localhost:${config.serverPort}/network/info`).then((res) => {
        return res.data
    }).catch(e => console.log('error getNetworkInfo', e))
}

export const getWalletInfo = () => {
    return axios.get(`http://localhost:${config.serverPort}/wallet/info`).then((res) => {
        return res.data
    }).catch(e => console.log('error getWalletInfo', e))
}

export const getWalletHistory = () => {
    return axios.get(`http://localhost:${config.serverPort}/wallet/history`).then((res) => {
        return res.data
    }).catch(e => console.log('error getWalletHistory', e))
}

export const getNetworkDifficulty = () => {
    return axios.get(`http://localhost:${config.serverPort}/network/difficulty`).then((res) => {
        return res.data
    }).catch(e => console.log('error getNetworkDifficulty', e))
}