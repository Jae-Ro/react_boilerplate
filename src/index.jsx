import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext, useAuth } from './common/utils';
import { Login, Signup } from './components';
import './index.scss';
import { createTheme, ThemeProvider } from '@material-ui/core';

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#61dafb",
            contrastText: "white"
        },
        secondary: {
            main: "#f50057"
        }
    }
});

const App = () => {
    const { isAuthenticated, setAuth, isLoading, setIsLoading, user, setUser } = useAuth();
    const providerValue = useMemo(() => (
        { isAuthenticated, setAuth, isLoading, setIsLoading, user, setUser }),
        [isAuthenticated, setAuth, isLoading, setIsLoading, user, setUser]
    )
    return (
        <ThemeProvider theme={customTheme}>
            <Router>
                <AuthContext.Provider value={providerValue}>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="*">
                            <Redirect to="/login" />
                        </Route>
                    </Switch>
                </AuthContext.Provider>
            </Router>
        </ThemeProvider >
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
