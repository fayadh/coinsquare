import React, { Component } from 'react'
import axios from 'axios';

export default class Wallet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wallet: null,
            history: null
        }

        this.connectToNode = this.connectToNode.bind(this)
        this.validateAddress = this.validateAddress.bind(this)
        this.getWalletInfo = this.getWalletInfo.bind(this)
    }

    componentWillMount() {
        this.getWalletInfo()
        .then((info) => {
            console.log('wallet', info)
            this.setState({
                wallet: info
            })

            this.getWalletHistory()
        })
        .then((history) => {
            console.log('history', history)
            this.setState({
                history: history
            })
        })
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

    connectToNode() {

    }

    validateAddress() {
        
    }

  render() {
    return (
        <div>
            <div>
                <div>Wallet</div>
                {
                    this.state.wallet? (
<                       div>
                            <div>Name: {this.state.wallet.account.name}</div>
                            <div>Balance: {this.state.wallet.state.coin}</div>
                            <div>Receive Address: {this.state.wallet.account.receiveAddress}</div>
                        </div>
                    ): (
                        <div>
                            Getting Wallet Info..
                        </div>
                    )
                }
            </div>
            <div>
                <div>Network</div>
                <div>
                    <div>Block Height</div>
                    <div>Difficulty</div>
                    <div>Network Type</div>
                </div>
            </div>
            <div>
                <div>Accounts</div>
                <div>
                    <div></div>
                </div>
            </div>
            <div>
                Send Funds:
                <form>
                    <div>
                        <input type="text" placeholder="Address" onClick={this.validateAddress}/>
                        <input type="text"/>
                    </div>
                </form>
            </div>

            <pre>
                {JSON.stringify(this.state, null, 2)}
            </pre>
        </div>
    )
  }
}

