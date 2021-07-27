import React, { useContext } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { AuthContext } from './common/utils'
import { Loading } from './components'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext)

    return (
        <Route {...rest} render={
            () => {
                if (isAuthenticated) {
                    return <Component {...rest} />
                } else {
                    if (isLoading) {
                        return (
                            <Loading >
                                <Redirect to='/login' />
                            </Loading>
                        )
                    } else {
                        return <Redirect to='/login' />
                    }
                }
            }
        } />
    )

}


export { PrivateRoute }