import { useState, useEffect, createContext, useRef } from 'react';
import * as d3 from 'd3';
import DOMPurify from 'dompurify';


// Environment Variables
const { VITE_API_URL } = import.meta.env;

// Authentication & Authorization
const AuthContext = createContext({})
const useAuth = () => {
    const [isAuthenticated, setAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const url = `${VITE_API_URL}/api/auth/refresh`
    const options = {
        method: "GET",
        mode: "cors",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
        }
    }
    useEffect(() => {
        setIsLoading(true)
        const getData = () => {
            fetch(url, options)
                .then(resp => resp.json())
                .then(data => {
                    if (!data) throw new Error('400 Error')
                    else {
                        setAuth(true)
                        setUser(DOMPurify.sanitize(data))
                        setIsLoading(false)
                    }
                })
                .catch(err => {
                    console.log(`AUTH ERROR: ${err}`)
                    setAuth(false)
                    setUser(null)
                    setIsLoading(false)
                })
        }
        getData()
        // setAuth(true)
        // setUser(null)
        // setIsLoading(false)
    }, [])

    return { isAuthenticated, setAuth, isLoading, setIsLoading, user, setUser }
}

// D3 - Data Visualization
const useD3 = (renderChartFn, dependencies) => {
    const ref = useRef();
    useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => { };
    }, dependencies);

    return ref;

}


export { useAuth, AuthContext, useD3 }
