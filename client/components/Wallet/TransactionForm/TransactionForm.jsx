import React, { Component } from 'react'
import { connect } from 'react-redux'
import './TransactionForm.css'

class TransactionForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sendValue: 0,
            receiveAddress: '2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF', //found at https://testnet.manu.backend.hamburg/faucet
            error: {
                isError: false,
                errorMessage: null
            }
        }
    }

    render() {
        return (
            <div className='my-2'>
                <div className='subtitle'>Send Funds</div>

                <form className='py-2'>
                    <div>
                        <div>
                            <label for='form-receive-address' className='inputTitle'>Receive address</label>
                            <input id='form-receive-address' type="text" value={this.state.receiveAddress} placeholder="Receive Address" onChange={e => this.setState({ receiveAddress: e.target.value })} />
                        </div>
                        <div>
                            <label for='form-number-of-coins' className='inputTitle'>Number of coins</label>
                            <input id='form-number-of-coins' type="number" placeholder="Number of Coins" onChange={e => this.setState({ sendValue: e.target.value })} />
                        </div>
                        <button onClick={this.onSubmit}>Send</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        history: state.history
    }
}


export default connect(mapStateToProps, null)(TransactionForm)
