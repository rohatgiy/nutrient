import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {AuthContext} from "./AuthContext"

class Register extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            age: "11-14",
            gender: "male",
            loading: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e)
    {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e)
    {
        e.preventDefault()
        fetch("/api/register",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success)
            {
                this.props.history.push("/login")
            }
            else
            {
                this.setState({smallClass:"form-text text-danger", msg: data.message})
            }
        })

    }

    render ()
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
                   <h5 >Register:</h5>
                   <small>Already have an account? <a href="/login">Login</a> here.</small>
                </div>
                <br />
               <form>
                   <div>
                    <div className="form-group col-md-4 offset-md-4">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" className="form-control" id="firstname" name="firstname" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-md-4 offset-md-4">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-md-4 offset-md-4">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-md-4 offset-md-4">
                        <label htmlFor="confpassword">Confirm Password</label>
                        <input type="password" className="form-control" id="confpassword" name="conf_password" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-md-4 offset-md-4">
                        <label htmlFor="age">Age</label>
                        <select className="custom-select" id="age" name="age" value={this.state.age} onChange={this.handleChange}>
                            <option value="11-14">11-14</option>
                            <option value="15-18">15-18</option>
                            <option value="19-24">19-24</option>
                            <option value="25-50">25-50</option>
                            <option value="51+">51+</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4 offset-md-4">
                        <label htmlFor="gender">Gender</label>
                        <select className="custom-select" id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <small className={this.state.smallClass}>{this.state.msg}</small>
                    </div>
                    </div>
                    <div className="offset-md-4 col-md-4">
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
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

Register.contextType = AuthContext
export default withRouter(Register)