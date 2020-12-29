import React from 'react'
import Autocomplete from 'react-autocomplete'
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';


export default class Search extends React.Component {
  constructor (props) {
    super()
    this.cellHeightCache = new CellMeasurerCache({
      defaultHeight: 42,
      fixedWidth: true
    })
    this.state = {
      searchingFor: '',
      data: props.data,
      serving_sizes: [],
      food_code: null,
      serving_index: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onServingSelect = this.onServingSelect.bind(this)
  }

  handleSubmit(e)
  {
    e.preventDefault()
    
    fetch("/api/add/",
    {
      method: "POST",
      headers:
        {
          "Content-Type": "application/json"
        },
      credentials: "include",
      body: JSON.stringify({
        food_code: this.state.food_code,
        serving_index: this.state.serving_index
      })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success)
      {
        this.setState({smallClass: "form-text text-danger", message: data.message})
      }
      else
      {
        this.setState(
        {
          smallClass: "form-text text-success", 
          message: "Added!",
          searchingFor: "",
          serving_sizes: [],
          food_code: null,
          serving_index: null
        })
      }
    })

    
  }

  onFoodSelect = (value, selection) => {
    this.setState({searchingFor: selection.food_name, serving_sizes: selection.serving_sizes, food_code: selection.food_code})
  }

  renderItem = (item) => {
    return <div className='searchItem'>{item.food_name}</div>
  }

  onServingSelect(e)
  {
    let serving_index = parseInt(e.target.value)
    this.setState({serving_index: serving_index})
  }

  renderMenu = (items, _, autocompleteStyle) => {
    this.cellHeightCache.clearAll()
    const rowRenderer = ({key, index, parent, style}) => {
      const Item = items[index]
      const onMouseDown = e => {
        if(e.button === 0) {
          Item.props.onClick(e)
        }
      }
      return (
        <CellMeasurer
          cache={this.cellHeightCache}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {React.cloneElement(Item, {
            style: style, 
            key: key, 
            onMouseEnter: null, 
            onMouseDown: onMouseDown
          })}
        </CellMeasurer>
      )
    }
    return (
      <List
        rowHeight={this.cellHeightCache.rowHeight}
        height={207}
        rowCount={items.length}
        rowRenderer={rowRenderer}
        width={autocompleteStyle.minWidth || 0}
        style={{
          height: 'auto',
          maxHeight: '207px'
        }}
      />
    )
  }
  
  render () {
    const searchTerm = this.state.searchingFor;
    let data = searchTerm 
      ? this.state.data.filter(item => 
          item.food_name.toLowerCase().startsWith(searchTerm.toLowerCase()))
        .concat(this.state.data.filter(item =>
          item.food_name.toLowerCase().includes(searchTerm.toLowerCase()) && !item.food_name.toLowerCase().startsWith(searchTerm.toLowerCase())
        ))
      : []
    return (
      <div>
        <form>
        <div className="form-group col-md-4 offset-md-4">
        <label>Food name</label><br />
        <Autocomplete
          items={data}
          value={this.state.searchingFor}
          
          renderItem={this.renderItem}
          renderMenu={this.renderMenu}
          inputProps={{className: "form-control"}}
          wrapperStyle={{style: {}}}
          
          
          getItemValue={ item => item.food_name }
          onChange={(e, value) => this.setState({searchingFor: value, serving_sizes: []})}
          onSelect={this.onFoodSelect}
        />
        </div>
        <div className="form-group col-md-4 offset-md-4">
          <label htmlFor="serving-size">Serving size</label>
          <select className="custom-select" id="serving-size" onChange={this.onServingSelect}>
              {this.state.serving_sizes.map((item, index) => <option value={index} key={index}>{item.serving_description}</option>)}
          </select>
          <small className={this.state.smallClass}>{this.state.message}</small>
        </div>
        <div className="offset-md-4 col-md-4">
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Add</button>
        </div>
        </form>
      </div>
    )
  }
}