import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {AuthContext} from "./AuthContext"

class Login extends Component
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            username: "",
            password: "",
            loading: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount()
    {
        
    }

    handleChange(e)
    {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e)
    {
        e.preventDefault();
        const {setIsAuthenticated} = this.context
        
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
                setIsAuthenticated(true)
                this.props.history.push("/today")
            } 
    })
        
    }

    render()
    {
        const {setIsAuthenticated} = this.context
        var isAuthenticated = false
        fetch("/api/user/",
        {
            method: "POST",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if (Object.keys(data).length === 0 && data.constructor === Object)
            {
                isAuthenticated = false
            }
            else
            {
                isAuthenticated = true
            }

            setIsAuthenticated(isAuthenticated)

            if (isAuthenticated)
            {
                this.props.history.push("/today")
            }
            this.setState({loading: false})
        }) 

        return !this.state.loading ? (
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
        ) : (
            <div className="offset-md-2 col-md-4">
                <br />
                <h5>Loading...</h5>
            </div>
        )
    }
}

Login.contextType = AuthContext
export default withRouter(Login)