import React, {createContext, useState, useEffect} from "react"

export const AuthContext = createContext()

export default ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        fetch("/api/user/",
        {
            method: "POST",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if (Object.keys(data).length === 0 && data.constructor === Object)
            {
                setIsAuthenticated(false)
            }
            else
            {
                setIsAuthenticated(true)
            }
        })
    }, [])

    return (
        <div>
            <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>
        </div>
    )
}