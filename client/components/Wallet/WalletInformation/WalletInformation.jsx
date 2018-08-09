import React, { Component } from 'react'
import { connect } from 'react-redux'
import './WalletInformation.css'

class WalletInformation extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='box'>
                <h5 className='title'>Wallet Information</h5>

                {
                    this.props.wallet ? (
                        <div>
                            <div className='subtitle mt-4 mb-2'>Details</div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>{this.props.wallet.account.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Receive Address</td>
                                        <td>{this.props.wallet.account.receiveAddress}</td>
                                    </tr>
                                    <tr>
                                        <td>Change Address</td>
                                        <td>{this.props.wallet.account.changeAddress}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className='subtitle mt-4 mb-2'>Balance</div>

                            <table>
                                <tbody>
                                    <tr>
                                        <td>Expected Future Value</td>
                                        <td>{this.props.wallet.state.unconfirmed}</td>
                                    </tr>
                                    <tr>
                                        <td>Confirmed</td>
                                        <td>{this.props.wallet.state.confirmed}</td>
                                    </tr>
                                    <tr>
                                        <td>Unconfirmed</td>
                                        <td>{this.props.wallet.state.unconfirmed - this.props.wallet.state.confirmed}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                            <div>
                                Getting Wallet Info..
                    </div>
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        wallet: state.wallet
    }
}


export default connect(mapStateToProps, null)(WalletInformation)
