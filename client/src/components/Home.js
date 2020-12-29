import React, {Component} from "react"
import { LoginContext } from "./LoginContext";
import {withRouter} from "react-router-dom"
import mockup from "../mockup.png"


class Home extends Component
{
    constructor(props)
    {
        super();
        this.state = {}
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
            this.setState({})
            this.props.history.push("/")
        }
        else
        {
            this.props.history.push("/today")
        }
    }

    render()
    {
        return (
            <div className="row align-items-center">
                <div className="col-md-6" style={{padding: "10vh 0 0 10vw"}}>
                    <h1 style={{fontSize: "50px", fontWeight: "800"}}>Keep track of what matters.</h1>
                    <p style={{fontSize: "20px"}}>This is <u>nütrient</u>: your very own nutrient tracker. 
                    Use it to keep track of your nutritional requirements by monitoring your micro- and macro- nutrient 
                    consumption each and every day.</p>
                    <br/>
                    <p style={{fontSize: "20px"}}>Get started now.</p>
                    <br />
                    <div className="row">
                        <button style={{margin: "5px"}} className="btn btn-primary" onClick={() => {this.props.history.push("/register")}}>Sign up</button>
                        <button style={{margin: "5px"}} className="btn btn-secondary" onClick={() => {this.props.history.push("/login")}}>Log in</button>
                    </div>
                </div>
               
                <div className="col-md-6" style={{textAlign: "right", paddingLeft: "5vw", paddingRight: "10vw"}}>
                    <img src={mockup} alt="mockup" style={{padding: "5vh 0 5vh 0", marginRight: "auto", marginLeft: "auto", width: "100%"}}/>
                </div>
                
            </div>
        )
    }
}

Home.contextType = LoginContext
export default withRouter(Home);