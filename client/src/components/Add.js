import React, {Component} from "react"
import Search from "./Search"
import { foodData } from "../foods_data"
import {withRouter} from "react-router-dom"
import {LoginContext} from "./LoginContext"

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
        const {loggedIn} = this.context

        if (!loggedIn)
        {
            this.props.history.push("/")
        }
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

Add.contextType = LoginContext
export default withRouter(Add)