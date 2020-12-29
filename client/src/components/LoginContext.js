import React from "react"

const LoginContext = React.createContext({
    loggedIn: false,
    toggleLogin: () => {},
    toggleLogout: () => {}
});

export { LoginContext }