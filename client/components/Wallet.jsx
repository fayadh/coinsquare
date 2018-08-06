import React, { Component } from 'react'
import axios from 'axios';
import { connect, dispatch } from 'react-redux'
import { updateWalletHistory, updateWalletInfo, updateNetworkInfo, updateDifficulty } from '../redux/actions'
import io from 'socket.io-client'
import _ from 'lodash'
import '../styles/Wallet.css'

class Wallet extends Component {
    constructor(props) {
        super(props)

        this.getWalletInfo = this.getWalletInfo.bind(this)
        this.getNetworkInfo = this.getNetworkInfo.bind(this)
        this.connectSocket = this.connectSocket.bind(this)
        this.getDifficulty = this.getDifficulty.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            sendValue: 0,
            receiveAddress: '2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF', //found at https://testnet.manu.backend.hamburg/faucet
            error: {
                isError: false,
                errorMessage: null
            }
        }
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

        socket.on('wallet tx', res => {
            console.log('wallet tx', res)
            this.getWalletHistory()
            .then((history) => {
                this.props.updateWalletHistory(history)
                return this.getWalletInfo()
            })
            .then((wallet_info) => {
                this.props.updateWalletInfo(wallet_info)
            })
            .catch(e => console.log('Error updating wallet.', e))
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
            return this.getDifficulty()
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

    getDifficulty() {
        return axios.get('http://localhost:3080/network/difficulty').then((res) => {
            return res.data
        }).catch(e => console.log('error getDifficulty', e))
    }

    getLatestHashHistory() {
        console.log('history', this.props.history)
        return (
            <div>
                {
                    this.props.history.map((v, i) => {
                        // Limit hash history to latest 5 hashes.
                        if(i + 1 <= 5) {
                            const item = this.props.history[this.props.history.length - i - 1] 
                            return (
                                <div className='hash' key={v.hash}>
                                    <div>{item.hash}</div>
                                    <div className='transactionDate'>{item.date}</div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }

    onSubmit(e) {        
        e.preventDefault()

        //remove all error messages
        this.setState({
            error: {
                isError: false,
                errorMessage: null
            }
        })

        //Verify that the user has enough funds in their account make the transaction.
        const currentBalance = this.props.wallet.state.coin
        if(this.state.sendValue > currentBalance) {
            this.setState({
                error: {
                    isError: true,
                    errorMessage: `You do not have enough funds in your account to make this transaction. You only have a balance of ${currentBalance}.`
                }
            })
        }

        //Verify address
        axios.get(`http://localhost:3080/network/validate_address?address=${this.state.receiveAddress}`)
        .then((res) => {
            if(!res.data.isvalid) {
                throw new Error('Address is not valid.')
            }

            return axios.post(`http://localhost:3080/wallet/send?value=${this.state.sendValue}&address=${this.state.receiveAddress}`)
        })
        .catch(e => {
            console.log('error onSubmit', e)
        })
    }

  render() {
    return (
        <div className='walletContainer'>
            <div className='row'>
                <div className='col-sm-6'> 
                    <div className='box'>
                        <h5 className='title'>Network</h5>
                        {
                            this.props.network? (
                                <div>
                                    <div>Type: {this.props.network.network}</div>
                                    <div>Block Height: {this.props.network.chain.height}</div>
                                    <div>Difficulty: {this.props.difficulty}</div>
                                </div>
                            ): (
                                <div>
                                    Getting Network Info..
                                </div>
                            )
                        }
                    </div>

                    <div className='box'>
                        <h5 className='title'>Wallet</h5>
                        {
                            this.props.wallet? (
                                <div>
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
                </div>

                <div className='col-sm-6'>
                    <div className='box'>
                        <h5 className='title'>Transactions</h5>

                        <div className='transactionHashHistory py-4'>
                            <div className='subtitle'>Transaction Hash History</div>
                            {
                                this.props.history? (
                                    <div>
                                        {   
                                            this.getLatestHashHistory()
                                        }
                                    </div>
                                ): (
                                    <div>
                                        Getting Transaction Hash History..
                                    </div>
                                )
                            }
                        </div>
                        
                        <div className='my-2'>
                            <div className='subtitle'>Send Funds</div>

                            <form className='py-2'>
                                <div>
                                    <div>
                                        <div className='inputTitle'>Receive address</div>
                                        <input type="text" value={this.state.receiveAddress} placeholder="Receive Address" onChange={e => this.setState({receiveAddress})}/>
                                    </div>
                                    <div>
                                        <div className='inputTitle'>Number of coins</div>
                                        <input type="number" placeholder="Number of Coins"/>
                                    </div>
                                    <button onClick={this.onSubmit}>Send</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
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
        updateNetworkInfo: info => dispatch(updateNetworkInfo(info)),
        updateDifficulty: difficulty => dispatch(updateDifficulty(difficulty))
    }
}

const mapStateToProps = state => {
    return {
        history: state.history,
        wallet: state.wallet,
        network: state.network,
        difficulty: state.difficulty
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Wallet)
