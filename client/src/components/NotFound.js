import React, {Component} from "react"
import {withRouter} from "react-router-dom"

class NotFound extends Component
{
    render()
    {
        return(
            <div className="offset-md-4 col-md-4">
                <br />
                <h5>Page not found.</h5>
                <br />
                <button className="btn btn-primary" onClick={() => {this.props.history.push("/")}}>Return home?</button>
            </div>
        )
    }
}

export default withRouter(NotFound)