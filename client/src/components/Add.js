import React, {Component} from "react"
import Search from "./Search"
import { foodData } from "../foods_data"
import {withRouter} from "react-router-dom"
import {AuthContext} from "./AuthContext"

class Add extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            name: ""
        }

        fetch("/api/user", {
            method: "POST",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => this.setState(data))
    }

    componentDidMount()
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

            if (!isAuthenticated)
            {
                this.props.history.push("/")
            }
        }) 
    }

    render()
    {
        return(
            <div>
                <br/>
               <div className="form-group col-md-4 offset-md-4">
                   <h2>Add a food:</h2>
                </div>
                <Search data={foodData}/>
                
            </div>
        )
    }
}

Add.contextType = AuthContext
export default withRouter(Add)