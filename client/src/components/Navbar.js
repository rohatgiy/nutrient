import React, {Component} from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom"
//import {LoginContext} from "./LoginContext"
import {AuthContext} from "./AuthContext"
import History from "./History"
import Home from "./Home"
import Add from "./Add"
import Today from "./Today"
import Register from "./Register"
import Login from "./Login"
import Account from "./Account"
import logo from "../nutrient_tracker.png"
import NotFound from "./NotFound"

class Navbar extends Component
{
  constructor(props)
  {
    super(props)
    this.logoutHandler = this.logoutHandler.bind(this)
  }

    logoutHandler(e)
    {
      fetch('/api/logout/',
      {
        method: "POST",
        credentials: "include"
      })
      const {setIsAuthenticated} = this.context
      setIsAuthenticated(false)
    }

    render() {
      return (
        <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <AuthContext.Consumer>
              {
                context => 
                {
                    return context.isAuthenticated ? 
                    (<Link className="navbar-brand" to="/today">
                        <img src={logo} alt="logo" height="22px" style={{padding: 0, marginRight: "5px", verticalAlign: "text-top"}}/>
                        nütrient
                      </Link>):
                    (<Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo" height="22px" style={{padding: 0, marginRight: "5px", verticalAlign: "text-top"}}/>
                        nütrient
                    </Link>)
                }
              }
              
            </AuthContext.Consumer>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <AuthContext.Consumer>
                {
                  context => 
                  {
                    return context.isAuthenticated ? (
                      <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                          <Link className="nav-link" to="/add">Add</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/today">Today</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/history">History</Link>
                        </li>
                      </ul>
                    ) : (
                      <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="/login">Login</Link>
                      </li>
                      </ul>
                    )
                  }
                }
                </AuthContext.Consumer> 
                <AuthContext.Consumer>
                  {
                    context => {
                      return context.isAuthenticated ? (
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <Link className="nav-link" to="/edit">Account</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/" onClick={this.logoutHandler}>Logout</Link>
                        </li>
                      </ul>
                      ) : null
                    }
                  }
                </AuthContext.Consumer>
            </div>
        </nav>

        <Switch>
          <Route exact path="/history" component={History}/>
          <Route exact path="/edit" component={Account}/>
          <Route exact path="/add" component={Add}/>
          <Route exact path="/today" component={Today}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/" component={Home}/>
          <Route path="/" component={NotFound}/>
        </Switch>
        </Router>
    )
                }
} 

Navbar.contextType = AuthContext
export default Navbar