import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../../components/context/AuthContext'


import { StockDashboard } from "./StockDashboard";
import { FishHistoryDashboard } from './FishHistory';


class Stocks extends Component {
    static contextType = AuthContext
    state = {
        isUser: true,
    }

    componentDidMount() {
        const Auth = this.context
        const user = Auth.getUser()
        const isUser = user.data.rol[0] === 'USER' || 'ADMIN'
        this.setState({ isUser })
    }

    render() {
        if (!this.state.isUser) {
            return <Navigate to='/' />
        } else {
            return (
                <div>
                <StockDashboard />
                <FishHistoryDashboard/>
                </div>
            )
        }
    }
}

export default Stocks