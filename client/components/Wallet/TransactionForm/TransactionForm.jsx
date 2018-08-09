import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './TransactionForm.css'

class TransactionForm extends Component {
    constructor(props) {
        super(props)

        //using local state here because this doesn't effect the global application.
        this.state = {
            sendValue: 0,
            receiveAddress: '2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF', //found at https://testnet.manu.backend.hamburg/faucet
            error: {
                isError: false,
                message: null
            }
        }

        this.setError   = this.setError.bind(this)
        this.clearError = this.clearError.bind(this)
        this.errorHTML  = this.errorHTML.bind(this)
        this.onSubmit   = this.onSubmit.bind(this)
    }

    setError(message) {
        this.setState({
            error: {
                isError: true,
                message
            }
        })
    }

    clearError() {
        this.setState({
            error: {
                isError: false,
                message: null
            }
        })
    }

    onSubmit(e) {        
        e.preventDefault()

        //Remove the previous error message, in case it exist.
        this.clearError()

        //Verify that the user has enough funds in their account make the transaction.
        const currentBalance = this.props.wallet.state.unconfirmed
        if(this.state.sendValue > currentBalance) {
            this.setError(`You do not have enough funds in your account to make this transaction. You only have an expected balance of ${currentBalance}.`)
            return
        }

        if(this.state.sendValue < 0.00001) {
            this.setError(`You must try to send more than 0.00001 BTC.`)
            return
        }

        //bcoin javascript libarary expects the value in satoshis.
        const toSatoshis = (btc) => btc * 100000000

        //Verify address
        axios.get(`http://localhost:3080/network/validate_address?address=${this.state.receiveAddress}`)
        .then((res) => {
            if(!res.data.isvalid) {
                const message = 'This address is not valid.'
                this.setError(message)
                throw new Error(message)
            }

            //Transact
            return axios.post(`http://localhost:3080/wallet/send?value=${toSatoshis(this.state.sendValue)}&address=${this.state.receiveAddress}`)
        })
        .then((transaction_info) => {
            //No need to reset state.
            window.alert(`Success! TX HASH: ${transaction_info.data}`)
        })
        .catch(e => {
            console.log('error onSubmit', e.statusMessage)
            this.setError(e.toString())
        })
    }

    errorHTML() {
        return (
            <div className='error'>
                {this.state.error.message}
            </div>
        )
    }

    render() {
        return (
            <div className='box'>
                <div className='subtitle'>Send Funds</div>

                <form className='py-2'>
                    <div>
                        <div>
                            <label htmlFor='form-receive-address' className='inputTitle'>Receive address</label>
                            <input id='form-receive-address' type="text" value={this.state.receiveAddress} placeholder="Receive Address" onChange={e => this.setState({ receiveAddress: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor='form-number-of-coins' className='inputTitle'>Number of BTC</label>
                            <input id='form-number-of-coins' type="number" placeholder="Number of Coins" value={this.state.value} onChange={e => this.setState({ sendValue: e.target.value })} />
                        </div>
                        <button onClick={this.onSubmit}>Send</button>
                    </div>

                    {this.state.error.isError? this.errorHTML(): null}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        wallet: state.wallet
    }
}


export default connect(mapStateToProps, null)(TransactionForm)
