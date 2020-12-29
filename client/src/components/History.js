import React, {Component} from "react"
import {LoginContext} from "./LoginContext"
import {withRouter} from "react-router-dom"
import Entry from "./Entry"

var empty = true;

class History extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            datas: [],
            empties: [],
            name: ""
        }
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this)
        this.historyFetch()
    }

    rerenderParentCallback()
    {
        this.historyFetch()
    }

    historyFetch()
    {
        fetch("/api/history",
        {
            method: "POST",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            let datas = []
            let empties = []

            if (Object.keys(data).length === 0 && data.constructor === Object)
            {
                return
            }
            
            if (data.entries.length === 0)
            {
                return this.setState(data, () =>
                {
                    return this.setState({
                        datas: datas,
                        empties: empties,
                        loading: false
                    })
                })
            }

            data.entries.map((entry, index) => 
            {
                const nuts = [];
                for (let i = 0; i < entry.nutrients.length; ++i)
                {
                    let den = 1;
                    let name;
                    let temp = "";

                    for (name in data.reqs)
                    {
                        if (name === entry.nutrients[i].nutrient)
                        {  
                            temp = name
                        }
                    }

                    den = data.reqs[temp]
                    let frac = (entry.nutrients[i].amount/den)

                    if (frac >= 1)
                    {
                        nuts.push(
                            [{
                                fill: '#5cb85c',
                                dec: frac,
                                name: entry.nutrients[i].nutrient,
                                num: entry.nutrients[i].amount.toFixed(3),
                                den: den,
                                unit: entry.nutrients[i].unit
                            }]
                        )
                    }
                    else 
                    {
                        nuts.push(
                            [{
                                fill: '#d9534f',
                                dec: frac,
                                name: entry.nutrients[i].nutrient,
                                num: entry.nutrients[i].amount.toFixed(3),
                                den: den,
                                unit: entry.nutrients[i].unit
                            }]
                        )
                    }
                }

                return this.setState(data, () => 
                {
                    empty = entry.food_names.length === 0
                    datas.push(nuts)
                    empties.push(empty)

                    return this.setState({
                        datas: datas, 
                        loading: !(index === data.entries.length-1), 
                        empties: empties
                    })
                })
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

    render()
    {
        let allEmpty = true;
        for (let i = 0; i < this.state.empties.length; ++i)
        {
            if (!this.state.empties[i])
            {
                allEmpty = false
                break
            }
        }
        return !this.state.loading ? (
            <div>
                <br/>
                <h2 className="offset-md-2 col-md-4">Hey {this.state.name}!</h2>
                <h2 className="offset-md-2 col-md-4">Here's your history:</h2>
                <br />
                {!allEmpty ? 
                    (this.state.entries.map((entry, index) => {
                        return (<Entry
                            date={entry.date}
                            food_names={entry.food_names}
                            data={this.state.datas[index]}
                            empty={this.state.empties[index]}
                            rerenderParentCallback={this.rerenderParentCallback}
                            delete={false}
                        />)
                    })) : (
                        <div className="offset-md-2 col-md-4">
                            <br />
                            <p>No history.</p>
                            <a href="/today">Click to see today's entry</a>  
                        </div>
                    )}
            </div>
        ) : (
            <div className="offset-md-2 col-md-4">
                <br />
                <h5>Loading...</h5>
            </div>
        )
    }
}

History.contextType = LoginContext
export default withRouter(History)