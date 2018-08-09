import React, { Component } from 'react'
import { connect, dispatch } from 'react-redux'
import { updateWalletHistory, updateWalletInfo, updateNetworkInfo, updateDifficulty } from '../../redux/actions'
import io from 'socket.io-client'
import {
    getNetworkInfo,
    getWalletInfo,
    getWalletHistory,
    getNetworkDifficulty,
} from '../../helpers'

import './Wallet.css'

// Components
import NetworkInformation from './NetworkInformation/NetworkInformation.jsx'
import WalletInformation from './WalletInformation/WalletInformation.jsx'
import TransactionHistory from './TransactionHistory/TransactionHistory.jsx'
import TransactionForm from './TransactionForm/TransactionForm.jsx'

class Wallet extends Component {
    constructor(props) {
        super(props)

        this.connectSocket = this.connectSocket.bind(this)
        this.getWalletInfo = getWalletInfo
        this.getWalletHistory = getWalletHistory
        this.getNetworkInfo = getNetworkInfo
        this.getNetworkDifficulty = getNetworkDifficulty
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
            //Update transaction history, and wallet state information.

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
        //Connect via socket, gather all necessary wallet and network data for the child components, and update state accordingly.

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
        })
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
