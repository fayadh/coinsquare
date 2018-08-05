import React, { Component } from 'react'
import axios from 'axios';
import { connect, dispatch } from 'react-redux'
import { updateWalletHistory, updateWalletInfo, updateNetworkInfo } from '../redux/actions'
import io from 'socket.io-client'

class Wallet extends Component {
    constructor(props) {
        super(props)

        this.getWalletInfo = this.getWalletInfo.bind(this)
        this.getNetworkInfo = this.getNetworkInfo.bind(this)
        this.connectSocket = this.connectSocket.bind(this)
        this.sendMoney = this.sendMoney.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    sendMoney() {

    }

    connectSocket() {
        const socket = io('x:hunter2@178.128.226.239:18332')

        socket.on('connect', (r) => {
            console.log('Connected to socket.')

            socket.emit('auth', 'hunter2', (res) => {
                console.log('Authorizing.. ')
    
                socket.emit('wallet join', 'primary', '8e265457e62f7cce9260f14024f356ac0a7bb4f324443070bd2843e680f2f408', (r) => {
                    console.log('Wallet joined.')
                })
            })  
            
        }); 

        socket.on('wallet tx', res => {
            console.log('wallet tx', res)
        })
        
        // socket.on('error', (err) => {
        //     console.log('error', err)
        // })
    }

    componentWillMount() {
        this.connectSocket()

        this.getWalletInfo()
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

    onSubmit(e) {        
        // validateAddress
        e.preventDefault()

        const sendAddress = '2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF'
        const value = 1

        axios.post(`http://localhost:3080/wallet/send?value=${value}&address=${sendAddress}`).then((res) => {
            return res.data
        }).catch(e => console.log('error getWalletHistory', e))
    }

  render() {
    return (
        <div>
            <div>
                <h2>Wallet</h2>
                {
                    this.props.wallet? (
<                       div>
                            <div>Name: {this.props.wallet.account.name}</div>
                            <div>Balance: {this.props.wallet.state.coin}</div>
                            <div>Receive Address: {this.props.wallet.account.receiveAddress}</div>
                        </div>
                    ): (
                        <div>
                            Getting Wallet Info..
                        </div>
                    )
                }
            </div>
            <div>
                <h2>Network</h2>
                <div>
                    <div>Block Height</div>
                    <div>Difficulty</div>
                    <div>Network Type</div>
                </div>
            </div>

            {/* <div>
                <h2>History</h2>
                <div>
                    <div></div>
                </div>
            </div>

            <div>
                <h2>Accounts</h2>
                <div>
                    <div></div>
                </div>
            </div> */}

            <div>
                <h2>Send Funds</h2>
                <form>
                    <div>
                        <input type="text" placeholder="Receive Address"/>
                        <input type="number" placeholder="Number of Coins"/>
                        <button onClick={this.onSubmit}>Send!</button>
                    </div>
                </form>
            </div>

            <pre>
                {JSON.stringify(this.props, null, 2)}
            </pre>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        updateWalletHistory: history => dispatch(updateWalletHistory(history)),
        updateWalletInfo: info => dispatch(updateWalletInfo(info)),
        updateNetworkInfo: info => dispatch(updateNetworkInfo(info))
    }
}

const mapStateToProps = state => {
    return {
        history: state.history,
        wallet: state.wallet,
        network: state.network
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Wallet)