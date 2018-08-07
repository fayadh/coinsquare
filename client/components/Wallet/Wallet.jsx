import React, { Component } from 'react'
import axios from 'axios';
import { connect, dispatch } from 'react-redux'
import { updateWalletHistory, updateWalletInfo, updateNetworkInfo, updateDifficulty } from '../../redux/actions'
import io from 'socket.io-client'

import './Wallet.css'

import NetworkInformation from './NetworkInformation/NetworkInformation.jsx'
import WalletInformation from './WalletInformation/WalletInformation.jsx'
import TransactionHistory from './TransactionHistory/TransactionHistory.jsx'
import TransactionForm from './TransactionForm/TransactionForm.jsx'

class Wallet extends Component {
    constructor(props) {
        super(props)

        this.connectSocket = this.connectSocket.bind(this)
        this.getWalletInfo = this.getWalletInfo.bind(this)
        this.getNetworkInfo = this.getNetworkInfo.bind(this)
        this.getNetworkDifficulty = this.getNetworkDifficulty.bind(this)
    }

    connectSocket(id, token) {
        const socket = io('x:hunter2@178.128.226.239:18332')

        socket.on('connect', (r) => {
            console.log('Connected to socket.')

            socket.emit('auth', 'hunter2', (res) => {
                console.log('Authorizing.. ')
    
                socket.emit('wallet join', id, token, (r) => {
                    console.log('Wallet joined.')
                })
            })
        });

        const updateWallet = () => {
            console.log('Updating wallet..')
            return this.getWalletHistory()
            .then((history) => {
                this.props.updateWalletHistory(history)
                return this.getWalletInfo()
            })
            .then((wallet_info) => {
                this.props.updateWalletInfo(wallet_info)
            })
            .catch(e => console.log('Error updating wallet.', e))
        }

        socket.on('wallet tx', res => {
            console.log('wallet tx', res)
            updateWallet()
        })

        socket.on('wallet balance', res => {
            console.log('wallet balance', res)
            updateWallet()
        })
    }

    componentDidMount() {
        this.getWalletInfo()
        .then((wallet_info) => {
            this.connectSocket(wallet_info.id, wallet_info.token)
            return wallet_info
        })
        .then((wallet_info) => {
            this.props.updateWalletInfo(wallet_info)
            return this.getNetworkInfo()
        })
        .then((network_info) => {
            this.props.updateNetworkInfo(network_info)
            return this.getWalletHistory()
        })
        .then((history) => {
            this.props.updateWalletHistory(history)
            return this.getNetworkDifficulty()
        })
        .then((difficulty) => {
            this.props.updateDifficulty(difficulty) 
        })
    }

    getNetworkInfo() {
        return axios.get('http://localhost:3080/network/info').then((res) => {
            return res.data
        }).catch(e => console.log('error getNetworkInfo', e))
    }

    getWalletInfo() {
        return axios.get('http://localhost:3080/wallet/info').then((res) => {
            return res.data
        }).catch(e => console.log('error getWalletInfo', e))
    }

    getWalletHistory() {
        return axios.get('http://localhost:3080/wallet/history').then((res) => {
            return res.data
        }).catch(e => console.log('error getWalletHistory', e))
    }

    getNetworkDifficulty() {
        return axios.get('http://localhost:3080/network/difficulty').then((res) => {
            return res.data
        }).catch(e => console.log('error getNetworkDifficulty', e))
    }


  render() {
    return (
        <div className='walletContainer'>
            <div className='row'>
                <div className='col-sm-6'> 
                    <NetworkInformation/>
                    <WalletInformation/>
                </div>

                <div className='col-sm-6'>
                    <TransactionHistory/>
                    <TransactionForm/>
                </div>
            </div>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        updateWalletHistory: history => dispatch(updateWalletHistory(history)),
        updateWalletInfo: info => dispatch(updateWalletInfo(info)),
        updateNetworkInfo: info => dispatch(updateNetworkInfo(info)),
        updateDifficulty: difficulty => dispatch(updateDifficulty(difficulty))
    }
}


export default connect(null, mapDispatchToProps)(Wallet)
