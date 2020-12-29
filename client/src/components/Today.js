import React, {Component} from "react"
import {LoginContext} from "./LoginContext"
import {withRouter} from "react-router-dom"
import Entry from "./Entry"

var empty = true;

class Dashboard extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            entry:{
                food_names: [],
                date: new Date()
            },
            data: [],
            name: "",
            loading: true
        }
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this)
        this.dashboardFetch()
    }

    dashboardFetch()
    {
        fetch("/api/today/",
        {
            method: "POST",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            const nuts = [];

            if (Object.keys(data).length === 0 && data.constructor === Object)
            {
                return
            }

            for (let i = 0; i < data.entry.nutrients.length; ++i)
            {
                let den = 1;
                let name;
                let temp = "";

                for (name in data.reqs)
                {
                    if (name === data.entry.nutrients[i].nutrient)
                    {  
                        temp = name
                    }
                }

                den = data.reqs[temp]
                let frac = (data.entry.nutrients[i].amount/den)

                if (frac >= 1)
                {
                    nuts.push(
                        [{
                            fill: '#5cb85c',
                            dec: frac,
                            name: data.entry.nutrients[i].nutrient,
                            num: data.entry.nutrients[i].amount.toFixed(3),
                            den: den,
                            unit: data.entry.nutrients[i].unit
                        }]
                    )
                }
                else 
                {
                    nuts.push(
                        [{
                            fill: '#d9534f',
                            dec: frac,
                            name: data.entry.nutrients[i].nutrient,
                            num: data.entry.nutrients[i].amount.toFixed(3),
                            den: den,
                            unit: data.entry.nutrients[i].unit
                        }]
                    )
                }
            }
            return this.setState(data, () => 
            {
                empty = data.entry.food_names.length === 0

                return this.setState({data: nuts, loading: false})
            })
        })
    }

    componentDidMount()
    {
        const {loggedIn} = this.context

        if (!loggedIn)
        {
            this.props.history.push("/")
        }
    }

    rerenderParentCallback()
    {
        this.dashboardFetch()
    }

    render ()
    {
        return !this.state.loading ? (
            <div>
                <div className="offset-md-2 col-md-4">
                    <br />
                    <h2>Welcome {this.state.name}!</h2>   
                    <h2>Today, you ate:</h2>
                </div>
                <br/>
                <Entry 
                    date={this.state.entry.date} 
                    food_names={this.state.entry.food_names} 
                    data={this.state.data}
                    empty={empty} 
                    rerenderParentCallback={this.rerenderParentCallback}
                    delete={true}
                />
            </div>
        
        ) : (
            <div className="offset-md-2 col-md-4">
                <br />
                <h5>Loading...</h5>
            </div>
        )
    }
}

Dashboard.contextType = LoginContext
export default withRouter(Dashboard)