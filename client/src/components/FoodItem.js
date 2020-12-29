import React, {Component} from "react"

// rework this to work with li item

class FoodItem extends Component
{
    constructor(props)
    {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(e)
    {
        const del_index = parseInt(e.target.id)
        fetch("/api/delete",
        {
            method: "POST",
            credentials: "include",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    delete_index: del_index
                }
            )
        })
        .then(() => {this.props.rerenderParentCallback();})
        
    }

    render()
    {
        return (
        <li className={this.props.delete ? "foodItem" : null} key={this.props.index} id={this.props.index} onClick={this.handleDelete}>{this.props.name}</li>
        )
    }
}

export default FoodItem