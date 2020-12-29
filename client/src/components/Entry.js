import React, {Component} from "react"
import {
    RadialBarChart, RadialBar, PolarAngleAxis
} from 'recharts';
import ReactTooltip from "react-tooltip"
import FoodItem from "./FoodItem"

// props:
// * date
// * food_name array
// * data array of 1 long array json
// * empty boolean
// * rerenderParentcallback cb function
// * delete boolean (deleteable)

class Entry extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {}
    }

    render ()
    {
        return this.props.delete ? (
            !this.props.empty ? (
                <div className="card offset-md-2 col-md-8" style={{marginBottom: "10px", marginTop: "10px"}}>
                    <div className="card-body">
                        <h4 className="card-title">{this.props.date.toString().substring(0, 10)}</h4>
                        <div className="row">
                            <div className="col-4">
                                <div>
                                    <h5 className="text-muted" style={{marginBottom: 0}}>Foods:</h5>
                                    {this.props.delete ? 
                                    <small className="text-muted">Click an item below to delete.</small> : 
                                    <small className="text-muted">A list of foods you've eaten.</small>}
                                </div>
                                <br/>
                                {this.props.food_names.map((item, index) => <FoodItem name={item} index={index} delete={this.props.delete} rerenderParentCallback={this.props.rerenderParentCallback}/>)}
                            </div> 
                            <div className="col-8">
                            <div>
                                    <h5 className="text-muted" style={{marginBottom: 0}}>Nutrients:</h5>
                                    <small className="text-muted">Hover over each graph for more info.</small>
                                </div>
                                <div className="row">
                                {this.props.data.map((item) => 
                                {
                                    return (
                                    <div style={{textAlign: "center", margin: "5px", width: "100px"}}>
                                        
                                        <p data-tip={`${(item[0].dec*100).toFixed(2)}% of daily requirements; ${item[0].num} ${item[0].unit} / ${item[0].den} ${item[0].unit}`}>
                                            <RadialBarChart width={100} height={100} cx={50} cy={50} innerRadius={30} barSize={30} data={item}>
                                                <PolarAngleAxis type="number" domain={[0, 1]} angleAxisId={0} tick={false} />
                                                <RadialBar background dataKey="dec" angleAxisId={0} clockWise={true}/>
                                            </RadialBarChart>
                                        </p>
                                        <ReactTooltip />
                                        <p>{item[0].name}</p>
                                    </div>
                                    )
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        ) : (
            <div className="offset-md-2 col-md-4">
                <br />
                <p>You haven't eaten anything today!</p>   
                <a href="/add">Click to add foods</a>
            </div>
        )) : ( !this.props.empty ? (
            <div className="card offset-md-2 col-md-8" style={{marginBottom: "10px", marginTop: "10px"}}>
                <div className="card-body">
                    <h4 className="card-title">{this.props.date.toString().substring(0, 10)}</h4>
                    <div className="row">
                        <div className="col-4">
                            <div>
                                <h5 className="text-muted" style={{marginBottom: 0}}>Foods:</h5>
                                {this.props.delete ? 
                                <small className="text-muted">Click an item below to delete.</small> : 
                                <small className="text-muted">A list of foods you've eaten.</small>}
                            </div>
                            <br/>
                            {this.props.food_names.map((item, index) => <FoodItem name={item} index={index} delete={this.props.delete} rerenderParentCallback={this.props.rerenderParentCallback}/>)}
                        </div> 
                        <div className="col-8">
                        <div>
                                <h5 className="text-muted" style={{marginBottom: 0}}>Nutrients:</h5>
                                <small className="text-muted">Hover over each graph for more info.</small>
                            </div>
                            <div className="row">
                            {this.props.data.map((item) => 
                            {
                                return (
                                <div style={{textAlign: "center", margin: "5px", width: "100px"}}>
                                    
                                    <p data-tip={`${(item[0].dec*100).toFixed(2)}% of daily requirements; ${item[0].num} ${item[0].unit} / ${item[0].den} ${item[0].unit}`}>
                                        <RadialBarChart width={100} height={100} cx={50} cy={50} innerRadius={30} barSize={30} data={item}>
                                            <PolarAngleAxis type="number" domain={[0, 1]} angleAxisId={0} tick={false} />
                                            <RadialBar background dataKey="dec" angleAxisId={0} clockWise={true}/>
                                        </RadialBarChart>
                                    </p>
                                    <ReactTooltip />
                                    <p>{item[0].name}</p>
                                </div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    ): null)
    }
}

export default Entry