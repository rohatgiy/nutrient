import React, {Component} from "react"
import { withRouter } from "react-router-dom"
import {LoginContext} from "./LoginContext"

class Account extends Component
{
    constructor(props)
    {
        super(props)
       

        this.state = {}
        fetch("/api/user", {
            method: "POST",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => this.setState(data))
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }

    componentDidMount()
    {
        const {loggedIn} = this.context

        if (!loggedIn)
        {
            this.props.history.push("/")
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const data = this.state
        fetch("/api/edit/", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        })
        this.setState({smallClass: "form-text text-success", message:"Updated!"})
    } 
    
    handleChange(e)
    {
        this.setState({ [e.target.name]: e.target.value })
    }

    render ()
    {
        
        return (
            <div>
                <br/>
               <div className="col-md-4 offset-md-4">
                   <h5>Edit your info:</h5>
                </div>
                <div>
                <form>
                   <div>
                    <div className="form-group col-md-4 offset-md-4">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" value={this.state.firstname} disabled className="form-control" id="firstname" />
                    </div>
                    <div className="form-group col-md-4 offset-md-4">
                        <label htmlFor="username">Username</label>
                        <input type="text" value={this.state.username} disabled className="form-control" id="username" />
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
                        <small className={this.state.smallClass}>{this.state.message}</small>
                    </div>
                    </div>
                    <div className="offset-md-4 col-md-4">
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Update</button>
                    </div>
                </form>
                </div>
                
            </div>
        )
    }
}

Account.contextType = LoginContext
export default withRouter(Account)