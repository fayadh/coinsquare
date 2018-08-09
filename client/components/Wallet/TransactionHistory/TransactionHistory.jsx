import React, { Component } from 'react'
import { connect } from 'react-redux'
import './TransactionHistory.css'
import _ from 'lodash'

class TransactionHistory extends Component {
    constructor(props) {
        super(props)
        this.getLatestHashHistory = this.getLatestHashHistory.bind(this)
    }

    getLatestHashHistory() {
        return (
            <div>
                {
                    this.props.history.map((v, i) => {
                        // Limit hash history to latest 5 hashes.
                        if (i + 1 <= 5) {
                            const transaction = this.props.history[this.props.history.length - i - 1]
                            return (
                                <div className='hash' key={v.txid}>
                                    <div>
                                        <span className='transactionCategory'>{_.startCase(transaction.category)}: </span>
                                        <span className='transactionAmount'>{transaction.amount} BTC</span>
                                    </div>
                                    <div>{transaction.txid}</div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }

    render() {
        return (
            <div className='box'>
                <h5 className='title'>Transactions</h5>
                <div className='transactionHashHistory py-4'>
                    <div className='subtitle'>Transaction Hash History</div>
                    {
                        this.props.history ? (
                            <div>
                                {
                                    this.getLatestHashHistory()
                                }
                            </div>
                        ) : (
                            <div>
                                Getting Transaction Hash History..
                            </div>
                            )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        history: state.history
    }
}


export default connect(mapStateToProps, null)(TransactionHistory)
