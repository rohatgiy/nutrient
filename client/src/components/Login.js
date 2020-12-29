import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import { LoginContext } from "./LoginContext"

class Login extends Component
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount()
    {
        const {loggedIn} = this.context

        if (loggedIn)
        {
            this.props.history.push("/")
        }
    }

    handleChange(e)
    {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e)
    {
        e.preventDefault();
        const {toggleLogin} = this.context
        
        const data = this.state;
        const opts = {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch("/api/login/", opts)
        .then(response => response.json())
        .then(data => {
            if (!data.username && data.message.success === false)
            {
                this.setState({errorMessage: data.message.message})
            }
            else
            {
                toggleLogin()
                this.props.history.push("/today")
            } 
    })
        
    }

    render()
    {
        return(
            <div id="content">
               <br/>
               <div className="col-md-4 offset-md-4">
                   <h5>Login:</h5>
                   <small>Don't have an account? <a href="/register">Register</a> here.</small>
                </div>
                <br />
               <form>
                   <div>
                    <div className="form-group col-md-4 offset-md-4">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-md-4 offset-md-4">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={this.handleChange}/>
                        <small className="form-text text-danger">{this.state.errorMessage}</small>
                    </div>
                    </div>
                    <div className="offset-md-4 col-md-4">
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Log In</button>
                        
                    </div>
                </form>
            </div>
        )
    }
}

Login.contextType = LoginContext
export default withRouter(Login)