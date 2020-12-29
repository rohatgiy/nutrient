import React, {Component} from 'react'
import { LoginContext } from "./components/LoginContext";

import './App.css'

import Navbar from "./components/Navbar"


class App extends Component
{
  toggleLogin = () =>
  {
    localStorage.setItem("loggedStatus", true)
    this.setState({loggedIn: true})
  }

  toggleLogout = () => 
  {
    fetch('/api/logout/',
    {
      method: "POST",
      credentials: "include"
    })
    this.setState({loggedIn: false})
    localStorage.setItem("loggedStatus", false)
  }

  constructor()
  {
    super()
    let temp = null;
    if (localStorage.getItem("loggedStatus") === "false")
    {
      temp = false
    }
    else if (localStorage.getItem("loggedStatus") === "true")
    {
      temp = true
    }
    this.state = {
      loggedIn: temp,
      toggleLogin: this.toggleLogin,
      toggleLogout: this.toggleLogout
    }
  }

  componentDidUpdate(prevProps, prevState)
  {
    if (this.state.loggedIn !== prevState.loggedIn)
    {
      localStorage.setItem("loggedStatus", this.state.loggedIn)
    } 
  }

  render ()
  {
    return (
    <LoginContext.Provider value={this.state}>
    <div>
      <Navbar />
    </div>
    </LoginContext.Provider >
    )
  }
}

export default App;
