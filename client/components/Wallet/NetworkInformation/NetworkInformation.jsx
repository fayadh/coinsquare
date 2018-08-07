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
                                    <td>Type</td>
                                    <td>{this.props.network.network}</td>
                                </tr>
                                <tr>
                                    <td>Block Height</td>
                                    <td>{this.props.network.chain.height}</td>
                                </tr>
                                <tr>
                                    <td>Difficulty</td>
                                    <td>{this.props.difficulty}</td>
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
        network: state.network,
        difficulty: state.difficulty
    }
}


export default connect(mapStateToProps, null)(NetworkInformation)
