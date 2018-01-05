import React, {Component} from 'react'

export default class RecipeBox extends Component {
  render() {
    return (
      <div>
        <h4>Name: {this.props.item.name}</h4>

        <p>Recipe: {this.props.item.recipe}</p>
      </div> 
    )
  }
}