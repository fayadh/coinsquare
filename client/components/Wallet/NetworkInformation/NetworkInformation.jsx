import React, { Component } from 'react'
import { connect } from 'react-redux'
import './NetworkInformation.css'

class NetworkInformation extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='box'>
                <h5 className='title'>Network</h5>
                {
                    this.props.network ? (
                        <table>
                            <tbody>
                                <tr>
                                    <td>Testnet</td>
                                    <td>{this.props.network.testnet.toString()}</td>
                                </tr>
                                <tr>
                                    <td>Block Height</td>
                                    <td>{this.props.network.blocks}</td>
                                </tr>
                                <tr>
                                    <td>Difficulty</td>
                                    <td>{this.props.network.difficulty}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                            <div>
                                Getting Network Info..
                            </div>
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        network: state.network
    }
}


export default connect(mapStateToProps, null)(NetworkInformation)
